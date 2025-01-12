
export interface BoxStyle {
  topLeft: string
  top: string
  topRight: string
  right: string
  bottomRight: string
  bottom: string
  bottomLeft: string
  left: string
}

export const boxStyles: Record<string, BoxStyle> = {
  basic: {
    topLeft: "+",
    top: "-",
    topRight: "+",
    right: "|",
    bottomRight: "+",
    bottom: "-",
    bottomLeft: "+",
    left: "|",
  },
  light: {
    topLeft: "┌",
    top: "─",
    topRight: "┐",
    right: "│",
    bottomRight: "┘",
    bottom: "─",
    bottomLeft: "└",
    left: "│",
  },
  lightRounded: {
    topLeft: "╭",
    top: "─",
    topRight: "╮",
    right: "│",
    bottomRight: "╯",
    bottom: "─",
    bottomLeft: "╰",
    left: "│",
  },
  heavy: {
    topLeft: "┏",
    top: "━",
    topRight: "┓",
    right: "┃",
    bottomRight: "┛",
    bottom: "━",
    bottomLeft: "┗",
    left: "┃",
  },
  double: {
    topLeft: "╔",
    top: "═",
    topRight: "╗",
    right: "║",
    bottomRight: "╝",
    bottom: "═",
    bottomLeft: "╚",
    left: "║",
  },
  dashedLight: {
    topLeft: "┌",
    top: "┄",
    topRight: "┐",
    right: "┆",
    bottomRight: "┘",
    bottom: "┄",
    bottomLeft: "└",
    left: "┆",
  },
  dashedHeavy: {
    topLeft: "┏",
    top: "┅",
    topRight: "┓",
    right: "┇",
    bottomRight: "┛",
    bottom: "┅",
    bottomLeft: "┗",
    left: "┇",
  },
}
