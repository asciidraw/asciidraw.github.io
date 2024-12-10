interface RequestOptions {
  accept?: string
}


export function requestFilePick(options?: RequestOptions): Promise<File[]> {
  return new Promise(function requestFilePick(resolve, reject) {
    const fileInput: HTMLInputElement = document.createElement("input");
    fileInput.type = "file";
    fileInput.hidden = true;
    if (options?.accept)
      fileInput.accept = options.accept;

    fileInput.onchange = () => {
      if (fileInput.files === null) {
        reject()
      } else {
        resolve([...fileInput.files]);
      }
    }

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  });
}
