import "@/global.css";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("@/assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("@/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("@/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("@/assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("@/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("@/assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("@/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("@/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("@/assets/fonts/Poppins-Thin.ttf"),
    "NotoSansJP-Thin": require("@/assets/fonts/NotoSansJP-Thin.ttf"),
    "NotoSansJP-Light": require("@/assets/fonts/NotoSansJP-Light.ttf"),
    "NotoSansJP-Regular": require("@/assets/fonts/NotoSansJP-Regular.ttf"),
    "NotoSansJP-Medium": require("@/assets/fonts/NotoSansJP-Medium.ttf"),
    "NotoSansJP-SemiBold": require("@/assets/fonts/NotoSansJP-SemiBold.ttf"),
    "NotoSansJP-Bold": require("@/assets/fonts/NotoSansJP-Bold.ttf"),
    "NotoSansJP-ExtraBold": require("@/assets/fonts/NotoSansJP-ExtraBold.ttf"),
    "NotoSansJP-Black": require("@/assets/fonts/NotoSansJP-Black.ttf"),
    "NotoSansKR-Thin": require("@/assets/fonts/NotoSansKR-Thin.ttf"),
    "NotoSansKR-Light": require("@/assets/fonts/NotoSansKR-Light.ttf"),
    "NotoSansKR-Regular": require("@/assets/fonts/NotoSansKR-Regular.ttf"),
    "NotoSansKR-Medium": require("@/assets/fonts/NotoSansKR-Medium.ttf"),
    "NotoSansKR-SemiBold": require("@/assets/fonts/NotoSansKR-SemiBold.ttf"),
    "NotoSansKR-Bold": require("@/assets/fonts/NotoSansKR-Bold.ttf"),
    "NotoSansKR-ExtraBold": require("@/assets/fonts/NotoSansKR-ExtraBold.ttf"),
    "NotoSansKR-Black": require("@/assets/fonts/NotoSansKR-Black.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      {/* <Stack.Screen name="+not-found" /> */}
    </Stack>
  );
}
