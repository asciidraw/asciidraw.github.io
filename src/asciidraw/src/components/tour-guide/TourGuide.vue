<script setup lang="ts">
import {computed, ref, watch, watchEffect} from "vue";
import type {GuideStep} from "@/components/tour-guide/types.ts";
import {useMagicKeys, whenever} from "@vueuse/core";
import {DialogOverlay, DialogPortal, PopoverAnchor, PopoverArrow, PopoverPortal, PopoverRoot} from "radix-vue";
import {PopoverContent} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {
  LucideCircleArrowLeft,
  LucideCircleArrowRight,
  LucideCircleCheck,
  LucideCircleDot,
  LucideCircleSlash
} from "lucide-vue-next";

const { steps } = defineProps<{
  steps: GuideStep[]
}>();

const { escape, arrowLeft, arrowRight } = useMagicKeys();

whenever(escape, () => resetTour());
whenever(arrowLeft, () => previousStep());
whenever(arrowRight, () => nextStep());

function getElementBySelector(selector: string): HTMLElement | null {
  return document.querySelector(`[data-tour="${selector}"]`);
}

const currentStepIndex = ref<null | number>(null);
const currentStep = computed(() => currentStepIndex.value === null ? null : steps[currentStepIndex.value]);
const currentElement = computed(() => currentStep.value === null ? null : getElementBySelector(currentStep.value.selector))

watch(currentElement, (newElement, _, onCleanup) => {
  if (newElement === null) return;

  newElement.style.zIndex = `60`;
  newElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });

  onCleanup(() => {
    newElement.style.zIndex = ``;
  });
}, {  });

function startGuide() {
  currentStepIndex.value = 0;
}

function resetTour() {
  currentStepIndex.value = null;
}

function nextStep() {
  if (currentStepIndex.value === null) throw new Error("Guide is not running");
  while (currentStepIndex.value < steps.length && getElementBySelector(steps[currentStepIndex.value++].selector) === null) {
    console.error(`failed to get element of selector '${steps[currentStepIndex.value].selector}'`)
  }
  if (currentStepIndex.value >= steps.length) resetTour()
}

function previousStep() {
  if (currentStepIndex.value === null) throw new Error("Guide is not running");
  while (currentStepIndex.value >= 0 && getElementBySelector(steps[currentStepIndex.value--].selector) === null) {
    console.error(`failed to get element of selector '${steps[currentStepIndex.value].selector}'`)
  }
  if (currentStepIndex.value < 0) resetTour()
}

</script>

<template>
  <slot :currentStepIndex="currentStepIndex" :startGuide="startGuide" :nextStep="nextStep" :previousStep="previousStep" />
  <template v-if="currentElement">
    <PopoverRoot open modal>
      <PopoverAnchor as-child :element="currentElement" />
      <PopoverPortal>
        <div
          class="fixed inset-0 z-40 bg-black/80"
        />
        <PopoverContent side="bottom" class="w-80">
          <PopoverArrow />
          <div class="flex flex-col gap-2.5">
            <h4 class="text-lg">
              {{ currentStep!.title }}
            </h4>
            <p class="text-muted-foreground">
              {{ currentStep!.description }}
            </p>
            <div class="flex gap-x-1 [&>*]:flex-1 [&>*]:gap-x-0.5 [&>*]:whitespace-normal">
              <Button v-if="currentStepIndex === 0" variant="outline" @click="previousStep">
                <LucideCircleSlash />
                {{ $t('components.tour-guide.skip') }}
              </Button>
              <Button v-else variant="outline" @click="previousStep">
                <LucideCircleArrowLeft />
                {{ $t('components.tour-guide.previous') }}
              </Button>
              <Button v-if="currentStepIndex! < (steps.length-1)" variant="secondary" @click="nextStep">
                <LucideCircleArrowRight />
                {{ $t('components.tour-guide.next') }}
              </Button>
              <Button v-else variant="secondary" @click="resetTour">
                <LucideCircleCheck />
                {{ $t('components.tour-guide.finish') }}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </template>
</template>
