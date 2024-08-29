import React, { useRef, useEffect } from "react";
import { View, Modal, Animated, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "native-base";

interface SuccessAnimationProps {
  visible: boolean;
  onClose?: () => void;
  size?: number;
  duration?: number;
  backgroundColor?: string;
  iconColor?: string;
  message?: string;
}

const SuccessAnimation = ({
  visible,
  onClose,
  size = 120,
  duration = 2000,
  backgroundColor = "#44c6b1",
  iconColor = "white",
  message,
}: SuccessAnimationProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 2,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onClose) {
          setTimeout(onClose, 500);
        }
      });
    }
  }, [visible]);

  const scale = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0.5],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View style={styles.container}>
        <View style={styles.overlay} />
        <Animated.View
          style={[
            styles.animationContainer,
            {
              transform: [{ scale }],
              opacity,
              backgroundColor,
              width: size,
              height: size,
              borderRadius: size / 2,
            },
          ]}
        >
          <MaterialIcons
            name="check-circle"
            size={size * 0.6}
            color={iconColor}
          />
        </Animated.View>
        {message && (
          <View style={styles.messageContainer}>
            <Text>{message}</Text>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff", // White background
    zIndex: -1, // Ensure it's behind the animation
  },
  animationContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative", // Ensure it overlays other content
    zIndex: 1, // Ensure it's above the overlay
  },
  messageContainer: {
    marginTop: 20,
  },
});

export default SuccessAnimation;
