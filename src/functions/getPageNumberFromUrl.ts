export const getPageNumberFromUrl = (url: string): number => {
  return parseInt(url.slice(url.indexOf("page=") + 5, url.lastIndexOf("&")))
}
