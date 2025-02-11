<script setup lang="ts">
import { computed, ref, watch } from "vue";
import type {GuideStep} from "@/components/tour-guide/types.ts";
import {useMagicKeys, whenever} from "@vueuse/core";
import {PopoverAnchor, PopoverPortal, PopoverRoot} from "radix-vue";
import {PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
  LucideCircleArrowLeft,
  LucideCircleArrowRight,
  LucideCircleCheck,
  LucideCircleSlash
} from "lucide-vue-next";
import { useMultiElementBounding } from "@/composables/useMultiElementBounding.ts";

const { steps } = defineProps<{
  steps: GuideStep[]
}>();

const { escape, arrowLeft, arrowRight } = useMagicKeys();

whenever(escape, () => resetTour());
whenever(arrowLeft, () => previousStep());
whenever(arrowRight, () => nextStep());

function getElementsBySelector(selector: string | string[]): HTMLElement[] {
  function getBySelector(selector: string): HTMLElement | null {
    return document.querySelector(`[data-tour="${selector}"]`);
  }
  return (Array.isArray(selector) ? selector.map(s => getBySelector(s)) : [getBySelector(selector)])
    .filter(el => el !== null);
}

const currentStepIndex = ref<null | number>(null);
const currentStep = computed(() => currentStepIndex.value === null ? null : steps[currentStepIndex.value]);
const currentElements = computed(() => currentStep.value === null ? [] : getElementsBySelector(currentStep.value.selector));
const isFirst = computed(() => currentStepIndex.value !== null && findExistingIndexBefore(currentStepIndex.value) === null);
const isLast = computed(() => currentStepIndex.value !== null && findExistingIndexAfter(currentStepIndex.value) === null);

const { top, right, bottom, left, x, y, width, height } = useMultiElementBounding(currentElements);

// const measureAble: Pick<HTMLElement, "getBoundingClientRect"> = {
//   getBoundingClientRect() {
//     console.log("called getBoundingClientRect");
//     return {
//       top: top.value, right: right.value, bottom: bottom.value, left: left.value,
//       x: x.value, y: y.value, width: width.value, height: height.value,
//       toJSON() { return JSON.stringify(this) }
//     };
//   }
// };

watch(currentElements, (newElements) => {
  if (!newElements?.length) return;
  setTimeout(() => newElements[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }));
});

function findExistingIndexAfter(index: number): number | null {
  while (++index < steps.length) {
    const step = steps[index];
    const elements = getElementsBySelector(step.selector);
    if (elements.length > 0) return index;
    console.error(`failed to get element of selector '${step.selector}'`)
  }
  return null;
}

function findExistingIndexBefore(index: number): number | null {
  while (--index >= 0) {
    const step = steps[index];
    const element = getElementsBySelector(step.selector);
    if (element.length > 0) return index;
    console.error(`failed to get element of selector '${step.selector}'`)
  }
  return null;
}

function startGuide() {
  currentStepIndex.value = findExistingIndexAfter(-1);
}

function resetTour() {
  currentStepIndex.value = null;
}

function nextStep() {
  if (currentStepIndex.value === null) throw new Error("Guide is not running");
  currentStepIndex.value = findExistingIndexAfter(currentStepIndex.value);
}

function previousStep() {
  if (currentStepIndex.value === null) throw new Error("Guide is not running");
  currentStepIndex.value = findExistingIndexBefore(currentStepIndex.value);
}
</script>

<template>
  <slot :currentStepIndex="currentStepIndex" :startGuide="startGuide" :nextStep="nextStep" :previousStep="previousStep" />
  <template v-if="currentStep">
    <PopoverRoot open modal>
      <Teleport to="body">
        <PopoverAnchor as-child>
          <div class="fixed pointer-events-none invisible" :style="{ left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` }" />
        </PopoverAnchor>
      </Teleport>
      <PopoverPortal>
        <!-- overlay -->
        <div class="fixed z-40 bg-black/80" :style="{ left: `0`, right: `0`, top: `0`, height: `${top}px` }" />
        <div class="fixed z-40 bg-black/80" :style="{ left: `0`, top: `${top}px`, height: `${bottom-top}px`, width: `${left}px` }" />
        <div class="fixed z-40 bg-black/80" :style="{ left: `${right}px`, top: `${top}px`, height: `${bottom-top}px`, right: `0` }" />
        <div class="fixed z-40 bg-black/80" :style="{ left: `0`, top: `${bottom}px`, bottom: `0`, right: `0` }" />
        <!-- end overlay -->
        <PopoverContent :side="currentStep.side ?? 'bottom'" class="w-80">
          <div class="flex flex-col gap-2.5">
            <h4 class="text-lg leading-none tracking-wide">
              {{ currentStep.title }}
            </h4>
            <p class="text-muted-foreground">
              {{ currentStep.description }}
            </p>
            <div class="flex gap-x-1 [&>*]:flex-1 [&>*]:gap-x-0.5 [&>*]:whitespace-normal">
              <Button v-if="isFirst" variant="outline" @click="previousStep">
                <LucideCircleSlash />
                {{ $t('components.tour-guide.skip') }}
              </Button>
              <Button v-else variant="outline" @click="previousStep">
                <LucideCircleArrowLeft />
                {{ $t('components.tour-guide.previous') }}
              </Button>
              <Button v-if="!isLast" variant="secondary" @click="nextStep">
                <LucideCircleArrowRight />
                {{ $t('components.tour-guide.next') }}
              </Button>
              <Button v-else variant="secondary" @click="resetTour">
                <LucideCircleCheck />
                {{ $t('components.tour-guide.finish') }}
              </Button>
            </div>
            <div v-if="currentStep.seeAlso">
              <h5 class="text-muted-foreground leading-none">{{ $t('components.tour-guide.see-also') }}</h5>
              <div class="flex flex-col gap-y-0.25 items-start">
                <router-link v-for="see in currentStep.seeAlso" :key="`${see.ref}`" :to="see.ref" class="before:content-['•'] before:mr-1">
                  <Button variant="link" size="auto">
                    {{ see.label }}
                  </Button>
                </router-link>
              </div>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </template>
</template>
