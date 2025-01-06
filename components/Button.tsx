import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ label, onPress, disabled }: Props) => {
  return (
    <View className={`w-[320px] h-[70px] flex bg-secondary ${disabled ? 'bg-opacity-50' : ''} justify-center items-center rounded-md`}>
      <Pressable onPress={onPress} disabled={disabled}>
        <Text className="text-white text-2xl font-bold">{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;
