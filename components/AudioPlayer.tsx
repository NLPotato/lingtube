import { type Episode } from "@/utils/podcast";
import { changeToLocalDateString, cleanHtmlString } from "@/utils/helpers";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

export default function AudioPlayer({ episode }: { episode: Episode }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadAudio() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: episode.audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
    } catch (error) {
      console.error("Error loading audio:", error);
    }
  }

  useEffect(() => {
    loadAudio();
  }, []);

  function onPlaybackStatusUpdate(status: any) {
    if (status.isLoaded) {
      setDuration(status.durationMillis || 0);
      setPosition(status.positionMillis || 0);
      setIsPlaying(status.isPlaying);
    }
  }

  async function handlePlayPause() {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }
  }

  async function handleSeek(value: number) {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  }

  async function handleSkip(forward: boolean) {
    if (sound) {
      const skipTime = 15000; // 15 seconds
      const newPosition = forward ? position + skipTime : position - skipTime;
      await sound.setPositionAsync(
        Math.max(0, Math.min(newPosition, duration))
      );
    }
  }

  function formatTime(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  return (
    <View className="justify-between p-4">
      <View className="items-center">
        <Image
          source={{
            uri: episode.imageUrl || "https://via.placeholder.com/300",
          }}
          className="w-64 h-64 rounded-lg mb-4"
        />
        <Text className="text-base text-gray-600 text-center mb-4">
          {changeToLocalDateString(episode.pubDate)}
        </Text>
        <Text className="text-xl font-bold text-center mb-2">
          {episode.title}
        </Text>
        <Text
          className="text-base text-gray-600 text-center mb-4"
          numberOfLines={2}
        >
          {cleanHtmlString(episode.description)}
        </Text>
      </View>

      <View className="w-full">
        <Slider
          value={position}
          minimumValue={0}
          maximumValue={duration}
          onSlidingComplete={handleSeek}
          minimumTrackTintColor="black" 
          thumbTintColor="black" 
          tapToSeek={true}
        />
        <View className="flex-row justify-between">
          <Text className="text-sm text-gray-600">{formatTime(position)}</Text>
          <Text className="text-sm text-gray-600">{formatTime(duration)}</Text>
        </View>
      </View>

      <View className="flex-row justify-center items-center my-8">
        <TouchableOpacity onPress={() => handleSkip(false)} className="mx-4">
          <Ionicons name="play-back" size={32} color="colors-primary" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause} className="mx-4">
          <Ionicons
            name={isPlaying ? "pause-circle" : "play-circle"}
            size={64}
            color="colors-primary"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSkip(true)} className="mx-4">
          <Ionicons name="play-forward" size={32} color="colors-primary" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
