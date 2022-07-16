export function download(url: string, name?: string) {
  const fileName = name || url.split('/').pop() || 'image';
  const el = document.createElement("a");
  el.setAttribute("href", url);
  el.setAttribute("download", fileName);
  document.body.appendChild(el);
  el.click();
  el.remove();
}