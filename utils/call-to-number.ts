import { Alert, Linking, Platform } from "react-native";

const callToTheNumber = async (phoneNumber: string, prompt: boolean) => {
  if (!phoneNumber) {
    Alert.alert("Error", "Phone number is missing.");
    return;
  }

  const url = `tel:${phoneNumber}`;

  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert("Error", "Phone call not supported on this device.");
      return;
    }

    if (Platform.OS === "android" && prompt) {
      Alert.alert("", `${phoneNumber} - കോൾ ചെയ്യൂ`, [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => Linking.openURL(url) },
      ]);
    } else {
      Linking.openURL(url);
    }
  } catch (err) {
    Alert.alert("Error", "An error occurred while trying to make a call.");
    console.error(err);
  }
};

export default callToTheNumber;
