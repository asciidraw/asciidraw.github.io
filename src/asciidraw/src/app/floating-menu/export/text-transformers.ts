interface TextTransformer {
  example?: string
  transform: (text: string) => string
}


function indentWith(text: string, indent: string): string {
  return text.replace(/^/gm, indent);
}

export const none: TextTransformer = {
  transform: (t: string) => t
};

export const multiLine: TextTransformer = {
  example: `/* */`,
  transform: (text: string) => {
    return `/*\n${text}\n*/`;
  }
};

export const filledMultiline: TextTransformer = {
  example: `/***/`,
  transform: (text: string) => {
    return `/*\n${indentWith(text, " * ")}\n*/`;
  }
}

export const quotesMultiline: TextTransformer = {
  example: `""" """`,
  transform: (text: string) => {
    return `"""\n${text}\n"""`;
  }
}

export const hashes: TextTransformer = {
  example: `#`,
  transform: (text: string) => {
    return `${indentWith(text, "# ")}`;
  }
}

export const slashes: TextTransformer = {
  example: `//`,
  transform: (text: string) => {
    return `${indentWith(text, "// ")}`;
  }
}

export const trippleSlashes: TextTransformer = {
  example: `///`,
  transform: (text: string) => {
    return `${indentWith(text, "/// ")}`;
  }
}

export const dashes: TextTransformer = {
  example: `--`,
  transform: (text: string) => {
    return `${indentWith(text, "-- ")}`;
  }
}

export const apostrophies: TextTransformer = {
  example: `'`,
  transform: (text: string) => {
    return `${indentWith(text, "' ")}`;
  }
}

export const backticks: TextTransformer = {
  example: `\``,
  transform: (text: string) => {
    return `\`\`\`\n${text}\n\`\`\``;
  }
}

export const fourSpaces: TextTransformer = {
  example: `    `,
  transform: (text: string) => {
    return `${indentWith(text, "    ")}`;
  }
}

export const semicolons: TextTransformer = {
  example: `;`,
  transform: (text: string) => {
    return `${indentWith(text, "; ")}`;
  }
}
