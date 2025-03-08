import { useActiveElement, useDebounceFn, useEventListener } from "@vueuse/core";
import { computed, type ComputedRef, type WatchSource } from "vue";
import { logicAnd, logicNot } from "@vueuse/math";

type Handler = (event: KeyboardEvent) => void
interface ShortcutConfig {
  /** handler which is called whenever the shortcut is triggered */
  handler: Handler
  /** whether to only enable a shortcut when a certain input is used */
  usingInput?: string | boolean
  /** additional conditions that have to be met in order to enable the shortcut */
  whenever?: WatchSource<boolean>[]
}

interface ShortcutsConfig {
  [key: string]: Handler | ShortcutConfig
}

interface ShortcutOptions {
  /** configures the delay when defining a chained-shortcut (e.g. `c-b`) */
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

const chainedShortcutRegex = /^[^-]+.*-.*[^-]+$/
const combinedShortcutRegex = /^[^_]+.*_.*[^_]+$/

/**
 * function used to define shortcuts.
 * Shortcut-Types
 * - Control-Key Based (e.g. `ctrl_a`, `shift_b`, `alt_g`)
 * - Chained (e.g. `c-b`)
 * @param config
 * @param options
 */
export function defineShortcuts(config: ShortcutsConfig, options: ShortcutOptions = {}) {
  const usingInput = useUsingInput();

  const chainedInputs: string[] = [];
  const clearChainedInputs = () => { chainedInputs.length = 0 };
  const debouncedClearChainedInputs = useDebounceFn(clearChainedInputs, options.chainDelay ?? 800);

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
        key: key.toLowerCase(),
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

    const alphabeticalKey = /^[a-z]$/i.test(event.key);

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
  const activeElement = useActiveElement();
  return computed(() => {
    const usingInput = (activeElement.value?.tagName === 'INPUT' || activeElement.value?.tagName === 'TEXTAREA' || activeElement.value?.contentEditable === 'true')

    if (usingInput)
      return (activeElement.value as HTMLInputElement)?.name || true

    return false
  });
}
