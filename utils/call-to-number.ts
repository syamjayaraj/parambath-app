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
      Alert.alert(
        "Error",
        "Phone call feature is not supported on this device."
      );
      return;
    }

    if (Platform.OS === "android" && prompt) {
      Alert.alert(
        "",
        `${phoneNumber} - കോൾ ചെയ്യൂ`, // Malayalam text for "Call"
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Call",
            onPress: async () => {
              try {
                await Linking.openURL(url);
              } catch (err) {
                Alert.alert("Error", "Failed to initiate the call.");
                console.error("Failed to open URL: ", err);
              }
            },
          },
        ]
      );
    } else {
      try {
        await Linking.openURL(url);
      } catch (err) {
        Alert.alert("Error", "Failed to initiate the call.");
        console.error("Failed to open URL: ", err);
      }
    }
  } catch (err) {
    Alert.alert("Error", "An error occurred while trying to make a call.");
    console.error("Error checking call support: ", err);
  }
};

export default callToTheNumber;
