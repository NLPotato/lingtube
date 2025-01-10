import * as xml2js from "xml2js";

interface RSSItem {
  title: string;
  description: string;
  link: string;
  guid: string;
  creator: string;
  pubDate: string;
  enclosure: {
    $: {
      url: string;
      length: string;
      type: string;
    };
  }[];
  "itunes:summary"?: string;
  "itunes:explicit"?: string;
  "itunes:duration"?: string;
  "itunes:image"?: {
    $: {
      href: string;
    };
  };
  "itunes:season"?: number;
  "itunes:episode"?: number;
}

export interface Channel {
  title: string;
  publisher: string;
  feedUrl: string;
  artworkUrl100: string;
  artworkUrl600: string;
  genres: string[];
  releaseDate: string;
  collectionPrice: number;
}

export interface Episode {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  audioUrl: string;
  playTime: string;
}

export async function extractChannelInfo(data: Object) {
  const channelInfo: Channel = {
    title: data.collectionName,
    publisher: data.artistName,
    feedUrl: data.feedUrl,
    artworkUrl100: data.artworkUrl100,
    artworkUrl600: data.artworkUrl600,
    genres: data.genres,
    releaseDate: data.releaseDate,
    collectionPrice: data.collectionPrice,
  };
  return channelInfo;
}

export async function parseRssXml(feedUrl: string) {
  try {
    const response = await fetch(feedUrl);
    const data = await response.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(data);

    const episodes: Episode[] = result.rss.channel[0].item.map(
      (item: RSSItem) => ({
        title: item.title[0],
        link: item.link[0],
        pubDate: item.pubDate[0],
        audioUrl: item.enclosure[0].$.url,
        description: item.description[0],
        playTime: item["itunes:duration"] ? item["itunes:duration"] : "",
      })
    );
    return episodes;
  } catch (error) {
    console.error(`Error fetching RSS feed: ${feedUrl}`, error);
    return [];
  }
}

export function validateSearchResult(result: { kind: string }) {
  return result.kind === "podcast";
}
