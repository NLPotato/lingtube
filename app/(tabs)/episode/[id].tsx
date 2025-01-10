import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
// import { AudioDownloader } from '@/components/AudioDownloader';
import { type Episode } from "@/utils/podcast";
import { changeToLocalDateString } from "@/utils/helpers";
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
import { Download, CheckCircle } from "lucide-react";

export default function EpisodeScreen() {
  const { episode: episodeString } = useLocalSearchParams();
  const episode: Episode = JSON.parse(episodeString as string);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulating download process
    for (let i = 0; i <= 100; i += 10) {
      setDownloadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsDownloading(false);
    setIsDownloaded(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        <View className="space-y-4">
          <Text className="text-2xl font-bold">{episode.title}</Text>
          <Text className="text-sm text-gray-500">
            {changeToLocalDateString(episode.pubDate)} • {episode.playTime}
          </Text>
          <Text className="text-base">{episode.description}</Text>

          {/* <View className="space-y-2">
          {!isDownloaded && (
            <Button
              onPress={handleDownload}
              disabled={isDownloading}
              className="w-full"
            >
              {isDownloading ? (
                <View className="flex-row items-center">
                  <Download className="mr-2 h-4 w-4 animate-spin" />
                  Downloading...
                </View>
              ) : (
                <View className="flex-row items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Episode
                </View>
              )}
            </Button>
          )}

          {isDownloading && (
            <View className="space-y-2">
              <Progress value={downloadProgress} className="w-full" />
              <Text className="text-center">{downloadProgress}% Downloaded</Text>
            </View>
          )}

          {isDownloaded && (
            <View className="flex-row items-center justify-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Text className="text-green-500">Episode Downloaded</Text>
            </View>
          )}
        </View> */}

          {/* {isDownloaded && (
          // <AudioDownloader audioUrl={episode.enclosure.url} episodeTitle={episode.title} />
        )} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
