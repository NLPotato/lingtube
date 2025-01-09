"use client";
import { useState } from "react";
import { View, Pressable } from "react-native";
import clsx from "clsx";

type ButtonProps = {
  props: string | React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
};

const Button = ({ props, onPress, disabled }: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonClasses = clsx("w-full h-full flex-1 bg-secondary rounded-md", {
    "opacity-50": isPressed || disabled,
  });

  return (
    <View className={buttonClasses}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className="w-full h-full items-center justify-center"
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
      >
        {props}
      </Pressable>
    </View>
  );
};

export default Button;
