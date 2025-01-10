"use client";

import Button from "@/components/Button";
import {
  validatePodcastUrl,
  getPodcastId,
  changeToLocalDateString,
} from "@/utils/helpers";
import {
  parseRssXml,
  validateSearchResult,
  extractChannelInfo,
  Channel,
  Episode,
} from "@/utils/podcast";
import { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import he from "he";

const PodcastScreen = () => {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(300, width * 0.8);
  const contentWidth = Math.min(370, width * 0.95);
  const [podcastUrl, setpodcastUrl] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [channelInfo, setChannelInfo] = useState<Channel>(Object);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (podcastUrl.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [podcastUrl]);

  const getPodcastFeed = async () => {
    if (!validatePodcastUrl(podcastUrl)) {
      alert("Apple Podcast URL을 입력해주세요.");
      return;
    }
    const podcastId = getPodcastId(podcastUrl);
    if (podcastId === "") {
      alert("URL에 id가 있는지 확인해 주세요.");
      return;
    }
    try {

      const response = await fetch(
        `https://itunes.apple.com/lookup?id=${podcastId}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch podcast data: ${response.status}`);
      }

      const data = await response.json();

      if (data.resultCount === 0) {
        throw new Error("No podcast found with the provided ID");
      }

      const result = data.results[0]; // Assuming there's only one podcast in results

      if (!validateSearchResult(result)) {
        throw new Error("No podcast found with the provided ID");
      }
      const channelInfo = await extractChannelInfo(result);
      const episodes = await parseRssXml(channelInfo.feedUrl);
      setEpisodes(episodes);
      setChannelInfo(channelInfo);
    } catch (error) {
      console.log(error);
      alert(error); // 오류 메시지 표시
    }
  };

  const renderItem = ({ item }: { item: Episode }) => {
    return (
      <View className="flex-1 mb-2">
        <View className="mb-1 flex flex-row items-center">
          <Text className="text-sm text-gray-500">
            {changeToLocalDateString(item.pubDate)}{" "}
          </Text>
          <EvilIcons name="clock" size={15} />
          <Text className="text-sm text-gray-500">{item.playTime}</Text>
        </View>
        <View className="flex flex-row rounded-full items-center relative">
          <View className="flex-1 pr-14">
            <Text className="text-md font-semibold" numberOfLines={2}>
              {item.title}
            </Text>
            <Text className="text-sm text-gray-800" numberOfLines={2}>
              {he
                .decode(
                  item.description
                    .replace(/<[^>]+>/g, "")
                    .replace(/&nbsp;/g, "")
                    .replace(/\n/g, " ")
                    .trim()
                )
                .substring(0, 200 - item.title.length) +
                (item.description.length > 200 - item.title.length
                  ? "..."
                  : "")}
            </Text>
          </View>
          <View className="absolute right-0">
            <Button
              props={
                <MaterialIcons name="play-arrow" size={32} color="#eeece2" />
              }
            />
          </View>
        </View>
        <View className="border-b border-gray-300 my-2" />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center px-3 pt-3">
        {channelInfo && channelInfo.artworkUrl600 ? (
          <View className="rounded-lg mb-2">
            <Image
              source={{ uri: channelInfo.artworkUrl600 }}
              contentFit="contain"
              // className="flex-1"
              transition={1000}
              style={{
                width: imageSize,
                height: imageSize,
              }}
              onError={()=> console.log("이미지 로드 실패")}
            />
          </View>
        ) : (
          <Text>이미지 로드 실패</Text>
        )}
        {/* <View className="flex flex-col w-full mb-4"> */}
        {/* TODO: add info button/page */}
        <Text className="text-lg font-bold text-center">
          {channelInfo.title || "학습하기"}
        </Text>
        {/* </View> */}

        {episodes.length > 0 ? (
          <FlatList
            data={episodes}
            renderItem={renderItem}
            keyExtractor={(item) => item.title}
            style={{ width: contentWidth }}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="items-center w-full">
            <TextInput
              value={podcastUrl}
              onChangeText={setpodcastUrl}
              className={`w-full max-w-[320px] h-[35px] rounded-md bg-white p-2 mb-3`}
              placeholder="https://podcasts.apple.com/..."
            />
            <View className="w-full max-w-[320px] h-[50px]">
              <Button
                props={
                  <Text className={`text-white font-bold text-lg text-center`}>
                    Get Feed
                  </Text>
                }
                onPress={() => getPodcastFeed()}
                disabled={buttonDisabled}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PodcastScreen;
