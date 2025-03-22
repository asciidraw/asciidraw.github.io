export function splitTextToLines(text: string, maxWidth: number, block: boolean): string[] {
  return block ? splitTextToLinesBlock(text, maxWidth) : splitTextToLinesWrapping(text, maxWidth);
}

function splitTextToLinesWrapping(text: string, maxWidth: number): string[] {
  const lines: string[] = [];

  const hardLines = text.split('\n');

  for (const hardLine of hardLines) {
    if (!hardLine.length) {
      lines.push("");
      continue;
    }
    let words = hardLine.split(' ');
    let wrappedLines = [];
    let currentLine = '';

    for (let word of words) {
      if (currentLine.length + word.length < maxWidth) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else if (word.length >= maxWidth) {
        // maxWidth > 0 is a check to prevent an infinite loop
        while (word.length >= maxWidth) {
          wrappedLines.push(word.substring(0, maxWidth));
          word = word.substring(maxWidth);
        }
        currentLine = word;
      } else {
        wrappedLines.push(currentLine);
        currentLine = word;
      }
    }

    if (currentLine)
      wrappedLines.push(currentLine);

    lines.push(...wrappedLines);
  }

  return lines;
}

function splitTextToLinesBlock(text: string, maxWidth: number): string[] {
  const lines: string[] = [];

  let col = 0;
  let currentLine = "";

  for (const char of text) {
    if (col >= maxWidth || char === '\n') {
      col = 0;
      lines.push(currentLine);
      currentLine = "";
    } else {
      col++;
      currentLine += char;
    }
  }

  if (currentLine.length)
    lines.push(currentLine);

  return lines;
}
