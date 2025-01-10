import AudioPlayer from "@/components/AudioPlayer";
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { type Episode } from '@/utils/podcast';

// import { Configuration, OpenAIApi } from 'openai';

// const configuration = new Configuration({
//   apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

export default function EpisodeDetailScreen() {
  const { episode: episodeString } = useLocalSearchParams();
  const episode: Episode = JSON.parse(episodeString as string);

  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState<string | null>(null);


  // async function handleGetTranscript() {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(episode.audioUrl);
  //     const audioBlob = await response.blob();
  //     const formData = new FormData();
  //     formData.append('file', audioBlob, 'audio.mp3');
  //     formData.append('model', 'whisper-1');

  //     const transcriptionResponse = await openai.createTranscription(formData);
  //     setTranscript(transcriptionResponse.data.text);
  //   } catch (error) {
  //     console.error('Error getting transcript:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  return (
    <SafeAreaView className="flex-1 bg-background items-center">
      <AudioPlayer episode={episode} />
    </SafeAreaView>
  );
}

