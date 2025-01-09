import { View, Pressable, Text } from "react-native";

type ButtonProps = {
  props: string | React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ props, onPress, disabled }: ButtonProps) => {
  return (
    <View
      className={`w-full h-full flex bg-secondary ${
        disabled ? "bg-opacity-30" : ""
      } justify-center items-center rounded-md`}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="w-full h-full items-center justify-center"
      >
        {props}
      </Pressable>
    </View>
  );
};

export default Button;
