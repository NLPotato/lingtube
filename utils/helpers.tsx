import he from "he";

export function validatePodcastUrl(url: string) : boolean {
  const regex = /podcasts\.apple\.com\/.*\/id(\d+)/;
  return regex.test(url);
}

export function getPodcastId(url: string) : string {
  const regex = /podcasts\.apple\.com\/.*\/id(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

export function changeToLocalDateString(date: string) : string {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString();
}

export function cleanHtmlString(htmlString: string) : string {
  return he.decode(htmlString).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "").replace(/\n/g, " ").trim();
}