"use client";

import Button from "@/components/Button";
import { validatePodcastUrl, getPodcastId } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { TextInput, View, Text, FlatList } from "react-native";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import PlaceholderImage from "@/assets/images/podcast-url-example.png";

interface Episode {
  title: string;
  link: string;
  pubDate: string;
  audioUrl: string;
}

const NewScreen = () => {
  const [podcastUrl, setpodcastUrl] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (podcastUrl.length > 0) {
      setButtonDisabled(false);
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
      const proxyUrl = `https://genie-api.vercel.app/api/podcast?url=${encodeURIComponent(
        podcastUrl
      )}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const episodes = await response.json(); // JSON으로 응답을 처리
      setEpisodes(episodes);
    } catch (error) {
      console.log(error);
      alert(error); // 오류 메시지 표시
    }
  };

  const renderItem = ({ item }: { item: Episode }) => {
    return (
      <View className="flex flex-1 flex-col mb-2">
        <View className="mb-1 ">
          <Text className="text-sm text-gray-500">{item.pubDate}</Text>
        </View>
        <View className="flex flex-row relative rounded-full items-center">
          <View className="pr-14">
            <Text className="text-lg font-semibold text-pretty">{item.title}</Text>
          </View>
          <View className="absolute right-2">
            <Button props={<MaterialIcons name="play-arrow" size={30} color="#eeece2"/>}/>
          </View>
        </View>
      <View className="border-b border-gray-300 my-3" />
      </View>
    );
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-2xl font-bold">학습하기</Text>
      <Image
        source={PlaceholderImage}
        className="w-[375px] h-[500px] rounded-lg"
      />
      <TextInput
        value={podcastUrl}
        onChangeText={setpodcastUrl}
        className="w-[320px] h-[35px] rounded-md bg-white p-2 mb-3"
        placeholder="https://podcasts.apple.com/..."
      />
      {episodes.length > 0 ? (
        <FlatList
          data={episodes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          className="w-[370px] h-[500px] rounded-lg"
        />
      ) : (
        <View className="w-[320px] h-[70px] font-bold">
          <Button
            props={
              <Text className={`text-white font-bold text-xl`}>Get Feed</Text>
            }
            onPress={() => getPodcastFeed()}
            disabled={buttonDisabled}
          />
        </View>
      )}
    </View>
  );
};

export default NewScreen;
