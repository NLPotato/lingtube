export function validatePodcastUrl(url: string) : boolean {
  const regex = /podcasts\.apple\.com\/.*\/id(\d+)/;
  return regex.test(url);
}

export function getPodcastId(url: string) : string {
  const regex = /podcasts\.apple\.com\/.*\/id(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}