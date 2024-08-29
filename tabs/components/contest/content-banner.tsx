import React, { useEffect, useRef } from "react";
import { HStack, Text, VStack } from "native-base";
import { StyleSheet, Animated, Easing, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ContentBanner({}: any) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const navigation: any = useNavigation();

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, [animatedValue]);

  const gradientColors = animatedValue.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: [
      "#7a43a1",
      "#6e3199",
      "#5e1a8f",
      "#5e1a8f",
      "#6e3199",
      "#7a43a1",
    ],
  });

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Contest")}
      style={styles.card}
    >
      <Animated.View
        style={{ ...styles.gradient, backgroundColor: gradientColors }}
      >
        <HStack>
          <Ionicons
            name="trophy-outline"
            size={40}
            color="#fff"
            style={styles.icon}
          />
          <VStack>
            <Text style={styles.title}>മത്സരങ്ങൾ</Text>
            <Text style={styles.subTitle}>പങ്കെടുക്കൂ സമ്മാനങ്ങൾ നേടൂ</Text>
          </VStack>
        </HStack>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 80,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15,
    elevation: 3,
  },
  gradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  icon: {
    marginRight: 10,
    paddingTop: 7,
    transform: [{ rotate: "-20deg" }],
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
    paddingTop: 10,
  },
  subTitle: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: -5,
  },
});
