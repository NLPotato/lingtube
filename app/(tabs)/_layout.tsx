import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex-1">
      <SafeAreaView className="flex-1">
        <Tabs screenOptions={{ headerShown: false }}>
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
            name="new"
            options={{
              title: "New",
              tabBarIcon: ({ color }) => (
                <Ionicons name="add-circle" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </View>
  );
}
