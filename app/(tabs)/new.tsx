"use client";

import Button from "@/components/Button";
import { validatePodcastUrl, getPodcastId } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Image } from "expo-image";
import PlaceholderImage from "@/assets/images/podcast-url-example.png";

const NewScreen = () => {
  const [podcastUrl, setpodcastUrl] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (podcastUrl.length > 0) {
      setButtonDisabled(false);
    }
  }, [podcastUrl]);

  const getPodcastFeed = async (url: string) => {
    if (!validatePodcastUrl(podcastUrl)){
      alert("Apple Podcast URL을 입력해주세요.");
      return;
    }
    const podcastId = getPodcastId(podcastUrl);
    if (podcastId === "") {
      alert("URL에 id가 있는지 확인해 주세요.");
      return;
    }

    const response = await fetch(podcastUrl);
    const data = await response.json();
    console.log(data);
    return data.results[0].feedUrl;
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-2xl font-bold">학습하기</Text>
      <Image
        source={PlaceholderImage}
        className="w-[375px] h-[700px] rounded-lg"
      />
      <TextInput
        value={podcastUrl}
        onChangeText={setpodcastUrl}
        className="w-[320px] h-[35px] rounded-md bg-white p-2 mb-3"
        placeholder="https://podcasts.apple.com/..."
      />
      <Button
        label="Get Feed"
        onPress={() => getPodcastFeed(podcastUrl)}
        disabled={buttonDisabled}
      />
    </View>
  );
};

export default NewScreen;
