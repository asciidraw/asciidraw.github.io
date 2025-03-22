
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

export const basic: BoxStyle = {
  topLeft: "+",
  top: "-",
  topRight: "+",
  right: "|",
  bottomRight: "+",
  bottom: "-",
  bottomLeft: "+",
  left: "|",
};
export const light: BoxStyle = {
  topLeft: "┌",
  top: "─",
  topRight: "┐",
  right: "│",
  bottomRight: "┘",
  bottom: "─",
  bottomLeft: "└",
  left: "│",
};

export const lightRounded: BoxStyle = {
  topLeft: "╭",
  top: "─",
  topRight: "╮",
  right: "│",
  bottomRight: "╯",
  bottom: "─",
  bottomLeft: "╰",
  left: "│",
};

export const heavy: BoxStyle = {
  topLeft: "┏",
  top: "━",
  topRight: "┓",
  right: "┃",
  bottomRight: "┛",
  bottom: "━",
  bottomLeft: "┗",
  left: "┃",
};

export const double: BoxStyle = {
  topLeft: "╔",
  top: "═",
  topRight: "╗",
  right: "║",
  bottomRight: "╝",
  bottom: "═",
  bottomLeft: "╚",
  left: "║",
};

export const dashedLight: BoxStyle = {
  topLeft: "┌",
  top: "╌",
  topRight: "┐",
  right: "╎",
  bottomRight: "┘",
  bottom: "╌",
  bottomLeft: "└",
  left: "╎",
};

export const dashedHeavy: BoxStyle = {
  topLeft: "┏",
  top: "╍",
  topRight: "┓",
  right: "╏",
  bottomRight: "┛",
  bottom: "╍",
  bottomLeft: "┗",
  left: "╏",
};
