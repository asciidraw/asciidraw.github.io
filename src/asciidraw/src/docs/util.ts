
export interface Directory {
  files: string[]
  directories: Record<string, Directory>
}

export function parseFilesToDirectory(fileList: string[]): Directory {
  const files: string[] = [];
  const directoriesList: Record<string, string[]> = {};

  for (const file of fileList) {
    const splitIndex = file.indexOf("/");
    if (splitIndex === -1) {
      files.push(file);
    } else {
      const name = file.substring(0, splitIndex);
      const rest = file.substring(splitIndex+1);
      if (!directoriesList.hasOwnProperty(name)) {
        directoriesList[name] = [rest];
      } else {
        directoriesList[name].push(rest);
      }
    }
  }

  const directories: Record<string, Directory> = Object.fromEntries(
    Object.entries(directoriesList)
      .map(([name, files]) => [name, parseFilesToDirectory(files)])
  )

  return { files: files, directories };
}
