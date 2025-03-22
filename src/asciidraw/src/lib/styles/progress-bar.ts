
export interface ProgressBarStyle {
  leftWall: string
  rightWall: string
  fullBar: string
  emptyBar: string
}

export const basic: ProgressBarStyle = {
  leftWall: "[",
  rightWall: "]",
  fullBar: "=",
  emptyBar: "-",
};

export const block1: ProgressBarStyle = {
  leftWall: "[",
  rightWall: "]",
  fullBar: "█",
  emptyBar: "_",
};

export const block2: ProgressBarStyle = {
  leftWall: "[",
  rightWall: "]",
  fullBar: "█",
  emptyBar: "▒",
};
