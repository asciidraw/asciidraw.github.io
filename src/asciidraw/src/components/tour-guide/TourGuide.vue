<script setup lang="ts">
import {computed, ref, watch} from "vue";
import type {GuideStep} from "@/components/tour-guide/types.ts";
import {useMagicKeys, whenever} from "@vueuse/core";
import {PopoverAnchor, PopoverArrow, PopoverPortal, PopoverRoot} from "reka-ui";
import {PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
  LucideCircleArrowLeft,
  LucideCircleArrowRight,
  LucideCircleCheck,
  LucideCircleSlash
} from "lucide-vue-next";
import ElementExclusiveOverlay from "@/components/tour-guide/ElementExclusiveOverlay.vue";
import { logicAnd } from "@vueuse/math";

const { steps } = defineProps<{
  steps: GuideStep[]
}>();

function getElementBySelector(selector: string): HTMLElement | null {
  return document.querySelector(`[data-tour="${selector}"]`);
}

const { escape, arrowLeft, arrowRight } = useMagicKeys();

const currentStepIndex = ref<null | number>(null);
const guideIsRunning = computed(() => currentStepIndex.value !== null);
const currentStep = computed(() => currentStepIndex.value === null ? null : steps[currentStepIndex.value]);
const currentElement = computed(() => currentStep.value === null ? null : getElementBySelector(currentStep.value.selector));
const isFirst = computed(() => currentStepIndex.value !== null && findExistingIndexBefore(currentStepIndex.value) === null);
const isLast = computed(() => currentStepIndex.value !== null && findExistingIndexAfter(currentStepIndex.value) === null);

whenever(logicAnd(guideIsRunning, escape), () => resetTour());
whenever(logicAnd(guideIsRunning, arrowLeft), () => previousStep());
whenever(logicAnd(guideIsRunning, arrowRight), () => nextStep());

watch(currentElement, (newElement) => {
  if (newElement === null) return;
  setTimeout(() => newElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" }));
});

function findExistingIndexAfter(index: number): number | null {
  while (++index < steps.length) {
    const step = steps[index];
    const element = getElementBySelector(step.selector);
    if (element !== null) return index;
    console.error(`failed to get element of selector '${step.selector}'`)
  }
  return null;
}

function findExistingIndexBefore(index: number): number | null {
  while (--index >= 0) {
    const step = steps[index];
    const element = getElementBySelector(step.selector);
    if (element !== null) return index;
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
  <template v-if="currentElement && currentStep">
    <PopoverRoot open modal>
      <PopoverAnchor as-child :reference="currentElement" />
      <PopoverPortal>
        <ElementExclusiveOverlay :element="currentElement" />
        <PopoverContent :side="currentStep.side ?? 'bottom'" class="w-80">
          <PopoverArrow />
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
                <router-link v-for="see in currentStep.seeAlso" :to="see.ref" class="before:content-['•'] before:mr-1">
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
