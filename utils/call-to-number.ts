import { Alert, Linking } from "react-native";

const callToTheNumber = async (phoneNumber: any, prompt?: boolean) => {
  try {
    Linking.canOpenURL(`tel:${phoneNumber}`)
      .then((supported) => {
        if (supported) {
          Linking.openURL(`tel:${phoneNumber}`);
        } else {
          Alert.alert("Error", "Phone call not supported on this device.");
        }
      })
      .catch((err) => {
        Alert.alert("Error", "An error occurred while trying to make a call.");
        console.error(err);
      });
  } catch (err: any) {}
};

export default callToTheNumber;
