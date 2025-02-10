import type { RouteLocationRaw } from "vue-router";

export type GuideStep = {
  selector: string
  title: string
  description: string
  side?: "top" | "right" | "bottom" | "left"
  seeAlso?: Array<{
    label: string
    ref: RouteLocationRaw
  }>
}
