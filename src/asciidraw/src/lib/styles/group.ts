
export interface GroupStyle {
  topLeft: string
  top: string
  topRight: string
  right: string
  bottomRight: string
  bottom: string
  bottomLeft: string
  left: string
}

export const basic: GroupStyle = {
  topLeft: "+",
  top: "-",
  topRight: "+",
  right: "|",
  bottomRight: "+",
  bottom: "-",
  bottomLeft: "+",
  left: "|",
};
export const light: GroupStyle = {
  topLeft: "┌",
  top: "─",
  topRight: "┐",
  right: "│",
  bottomRight: "┘",
  bottom: "─",
  bottomLeft: "└",
  left: "│",
};

export const lightRounded: GroupStyle = {
  topLeft: "╭",
  top: "─",
  topRight: "╮",
  right: "│",
  bottomRight: "╯",
  bottom: "─",
  bottomLeft: "╰",
  left: "│",
};

export const heavy: GroupStyle = {
  topLeft: "┏",
  top: "━",
  topRight: "┓",
  right: "┃",
  bottomRight: "┛",
  bottom: "━",
  bottomLeft: "┗",
  left: "┃",
};

export const double: GroupStyle = {
  topLeft: "╔",
  top: "═",
  topRight: "╗",
  right: "║",
  bottomRight: "╝",
  bottom: "═",
  bottomLeft: "╚",
  left: "║",
};

export const dashedLight: GroupStyle = {
  topLeft: "┌",
  top: "╌",
  topRight: "┐",
  right: "╎",
  bottomRight: "┘",
  bottom: "╌",
  bottomLeft: "└",
  left: "╎",
};

export const dashedHeavy: GroupStyle = {
  topLeft: "┏",
  top: "╍",
  topRight: "┓",
  right: "╏",
  bottomRight: "┛",
  bottom: "╍",
  bottomLeft: "┗",
  left: "╏",
};
