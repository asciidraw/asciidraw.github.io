<script setup lang="ts">
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger
} from "@/components/ui/stepper";
import {LucideCircleDot} from "lucide-vue-next";

const steps = [
  {
    title: "Mission Statement",
    description: "We want to offer a good web-based editor to create ASCII diagrams for your README or terminal.",
  },
  {
    title: "Organisation",
    description: "The GitHub Organisation for this project was created in october 2024. We could have used a personal repository in one of our accounts, but because of the organisation we can offer the clean url of https://asciidraw.github.io",
  },
  {
    title: "Team",
    description: "Just two guys. Nothing special.",
  },
]
</script>

<template>
  <DefaultLayout>
    <Stepper orientation="vertical" class="mx-auto my-10 flex w-full max-w-md flex-col justify-start gap-10">
      <StepperItem v-for="(step, index) in steps" :key="index" :step="index" class="relative w-full items-start gap-6" completed="completed">
        <StepperSeparator v-if="index !== steps.length - 1" class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted" />
        <StepperTrigger>
          <LucideCircleDot class="size-6 z-10 shrink-0" />
        </StepperTrigger>
        <div class="flex flex-col gap-1">
          <StepperTitle class="text-sm font-semibold transition lg:text-base">{{ step.title }}</StepperTitle>
          <StepperDescription class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
            {{ step.description }}
          </StepperDescription>
        </div>
      </StepperItem>
    </Stepper>
  </DefaultLayout>
</template>
