"use client";

import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { TextInput, View, Text } from "react-native";
import { Image } from 'expo-image';
import PlaceholderImage from "@/assets/images/podcast-url-example.jpeg";

const NewScreen = () => {
  const [podcastUrl, setpodcastUrl] = useState<string>("");
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (podcastUrl.length > 0) {
      setButtonDisabled(false);
    }
  }, [podcastUrl]);

  const getPodcastFeed = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setButtonDisabled(false);
    return data.results[0].feedUrl;
  };

  return (
    <View className="flex-1 items-center bg-background">
      <Text className="text-2xl font-bold">학습하기</Text>
      <Image source={PlaceholderImage} className="w-[375px] h-[700px] rounded-lg" />
      <View className="text-md">Podcast URL을 입력해주세요.</View>
      <TextInput
        value={podcastUrl}
        onChangeText={setpodcastUrl}
        className="w-[320px] h-[35px] rounded-md bg-white font-bold p-2 mb-3"
      />
      <Button label="Get Feed" onPress={() => getPodcastFeed(podcastUrl)} disabled={buttonDisabled} />
    </View>
  );
};

export default NewScreen;