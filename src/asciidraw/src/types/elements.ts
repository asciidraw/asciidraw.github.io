import { boxStyles, groupStyles, progressBarStyles } from "@/lib/styles";

export namespace ElementsData {
  export interface Box {
    id: string
    type: "box"
    x: number
    y: number
    width: number
    height: number
    style: keyof typeof boxStyles
  }

  export interface ProgressBar {
    id: string
    type: "progressBar"
    x: number
    y: number
    width: number
    value: number
    style: keyof typeof progressBarStyles
    showValue: boolean
  }

  export type UtilTextAlignmentVertical = "t" | "m" | "b";
  export type UtilTextAlignmentHorizontal = "l" | "c" | "r";
  export type UtilTextAlignment = `${UtilTextAlignmentVertical}${UtilTextAlignmentHorizontal}`;

  export interface Label {
    id: string
    type: "label"
    x: number
    y: number
    width: number
    height: number
    text: string
    block: boolean
    alignment: UtilTextAlignment
  }

  export interface Group {
    id: string
    type: "group"
    x: number
    y: number
    width: number
    height: number
    style: keyof typeof groupStyles
    label: string
  }
}
