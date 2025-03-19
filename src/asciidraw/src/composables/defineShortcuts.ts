import { useActiveElement, useDebounceFn, useEventListener } from "@vueuse/core";
import { computed, type ComputedRef, type WatchSource } from "vue";
import { logicAnd, logicNot } from "@vueuse/math";

type Handler = (event: KeyboardEvent) => void
interface ShortcutConfig {
  /** Function to be executed when the shortcut is triggered */
  handler: Handler
  /** - `false` (default): Shortcut only triggers when no input is focused
   * - `true`: Shortcut triggers even when any input is focused
   * - `string`: Shortcut only triggers when the specified input (by name) is focused*/
  usingInput?: string | boolean
  /** additional conditions that have to be met in order to enable the shortcut */
  whenever?: WatchSource<boolean>[]
}

interface ShortcutsConfig {
  [key: string]: Handler | ShortcutConfig
}

interface ShortcutOptions {
  /** The delay between key presses to consider the shortcut as chained. Default is `300` */
  chainDelay?: number
}

interface InternalShortcut {
  handler: Function
  condition: ComputedRef<boolean>
  chained: boolean
  key: string
  ctrlKey: boolean
  shiftKey: boolean
  altKey: boolean
}

const defaultChainDelay = 300/*ms*/;
const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/;
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/;

/**
 * Define keyboard shortcuts for the application.
 * Shortcut-Types
 * - Single key: `'a'`, `'b'`, `'1'`, `'?'`, etc.
 * - Key combinations: Use `_` to separate keys, e.g., `'meta_k'`, `'ctrl_shift_f'`
 * - Key sequences: Use `-` to define a sequence, e.g., `'g-d'`
 * @param config An object where keys are shortcut definitions and values are either handler functions or shortcut configuration objects
 * @param options Optional configuration for the shortcuts behavior
 */
export function defineShortcuts(config: ShortcutsConfig, options: ShortcutOptions = {}) {
  const usingInput = useUsingInput();

  const chainedInputs: string[] = [];
  const clearChainedInputs = () => { chainedInputs.length = 0 };
  const debouncedClearChainedInputs = useDebounceFn(clearChainedInputs, options.chainDelay ?? defaultChainDelay);

  const shortcuts = Object.entries(config).map(([key, config]) => {
    if (key.includes("-") && key !== "-" && !key.match(chainedShortcutRegex)?.length) {
      console.trace(`[Shortcut]: Invalid key: "${key}"`);
    }
    if (key.includes("_") && key !== "_" && !key.match(combinedShortcutRegex)?.length) {
      console.trace(`[Shortcut]: Invalid key: "${key}"`);
    }

    let shortcut: Partial<InternalShortcut>;

    const isChained = key.includes("-") && key !== "-";
    if (isChained) {
      shortcut = {
        key: key,  // String.toLowerCase() was removed to allow `Shift-Shift`. add again if needed
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
      };
    } else {
      const keySplit = key.toLowerCase().split("_");
      shortcut = {
        key: keySplit.filter(k => !["ctrl", "shift", "alt"].includes(k)).join("_"),
        ctrlKey: keySplit.includes("ctrl"),
        shiftKey: keySplit.includes("shift"),
        altKey: keySplit.includes("alt"),
      };
    }
    shortcut.chained = isChained;

    if (typeof config === 'function') {
      shortcut.handler = config;
      shortcut.condition = logicNot(usingInput);
    } else {
      shortcut.handler = config.handler;
      const conditions: ComputedRef<boolean>[] = [];
      if (!config.usingInput) {
        conditions.push(logicNot(usingInput));
      } else if (typeof config.usingInput === 'string') {
        conditions.push(computed(() => usingInput.value === config.usingInput));
      }
      shortcut.condition = logicAnd(...conditions, ...(config.whenever ?? []));
    }

    return shortcut as InternalShortcut;
  }).filter(Boolean);

  useEventListener('keydown', (event: KeyboardEvent) => {
    if (!event.key) return;

    let chainedKey;
    chainedInputs.push(event.key);
    if (chainedInputs.length >= 2) {
      chainedKey = chainedInputs.slice(-2).join("-");

      for (const shortcut of shortcuts.filter(s => s.chained)) {
        if (shortcut.key !== chainedKey) continue;

        if (shortcut.condition.value) {
          event.preventDefault();
          shortcut.handler(event);
        }
        clearChainedInputs();
        return;
      }
    }

    const alphabeticalKey = /^[a-z]$/i.test(event.key);

    for (const shortcut of shortcuts.filter(s => !s.chained)) {
      if (event.key.toLowerCase() !== shortcut.key) continue;
      if (event.ctrlKey !== shortcut.ctrlKey) continue;
      if (alphabeticalKey && event.shiftKey !== shortcut.shiftKey) continue;
      if (event.altKey !== shortcut.altKey) continue;

      if (shortcut.condition.value) {
        event.preventDefault();
        shortcut.handler(event);
      }
      clearChainedInputs();
      return;
    }

    debouncedClearChainedInputs();
  });
}

function useUsingInput() {
  const activeElement = useActiveElement({ triggerOnRemoval: true });
  return computed(() => {
    const usingInput = (activeElement.value?.tagName === 'INPUT' || activeElement.value?.tagName === 'TEXTAREA' || activeElement.value?.contentEditable === 'true')

    if (usingInput)
      return (activeElement.value as HTMLInputElement)?.name || true

    return false
  });
}
