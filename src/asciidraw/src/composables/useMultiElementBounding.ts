import { computed } from 'vue'
import { useElementBounding, useArrayMap, type MaybeComputedElementRef, type MaybeRefOrGetter } from '@vueuse/core'


export function useMultiElementBounding(elements: MaybeRefOrGetter<MaybeComputedElementRef[]>) {
  const boundingRects = useArrayMap(elements, el => useElementBounding(el))

  const x = computed(() => Math.min(...boundingRects.value.map(rect => rect.x.value)));
  const y = computed(() => Math.min(...boundingRects.value.map(rect => rect.y.value)));
  const left = computed(() => Math.min(...boundingRects.value.map(rect => rect.left.value)));
  const top = computed(() => Math.min(...boundingRects.value.map(rect => rect.top.value)));
  const right = computed(() => Math.max(...boundingRects.value.map(rect => rect.right.value)));
  const bottom = computed(() => Math.max(...boundingRects.value.map(rect => rect.bottom.value)));
  const width = computed(() => right.value - left.value);
  const height = computed(() => bottom.value - top.value);

  return { left, top, right, bottom, x, y, width, height };
}
