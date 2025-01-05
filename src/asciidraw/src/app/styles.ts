
export interface Style {
  topLeft: string
  top: string
  topRight: string
  right: string
  bottomRight: string
  bottom: string
  bottomLeft: string
  left: string
}

export const styles: Record<string, Style> = {
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
