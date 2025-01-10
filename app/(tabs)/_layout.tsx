import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#primary",
          tabBarStyle: { backgroundColor: "#ffffff" },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={24}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="podcast"
          options={{
            title: "Podcast",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="podcasts" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="episode/[id]"
          options={{
            title: "Episode",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="podcasts" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
