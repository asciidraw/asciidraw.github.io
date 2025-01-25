/**
 * starts the download of `content`
 * @param content content of the file to download
 * @param filename name of the file
 */
export function startTextDownload(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain" });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
}
