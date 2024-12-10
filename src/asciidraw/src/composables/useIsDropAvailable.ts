import {type Ref, ref} from "vue";
import {useEventListener} from "@vueuse/core";


export function useIsDropAvailable(): Ref<boolean> {
  const isAvailable = ref(false);

  useEventListener('dragenter', () => isAvailable.value = true);
  useEventListener('dragover', () => isAvailable.value = true);
  useEventListener('dragleave', () => isAvailable.value = false);
  useEventListener('drop', () => isAvailable.value = false);

  return isAvailable;
}
