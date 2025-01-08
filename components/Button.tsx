import { View, Pressable, Text } from "react-native";

type ButtonProps = {
  props: string | React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ props, onPress, disabled }: ButtonProps) => {
  return (
    <View className={`w-full h-full flex bg-secondary ${disabled ? 'bg-opacity-50' : ''} justify-center items-center rounded-md`}>
      <Pressable onPress={onPress} disabled={disabled}>
        {props}
        {/* <Text className={`text-white ${textStyle ? textStyle : ''} font-bold`}>{props}</Text> */}
      </Pressable>
    </View>
  );
};

export default Button;
