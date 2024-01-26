import { Linking } from "react-native";

const callToTheNumber = (phoneNumber: string) => {
  try {
    Linking.openURL(`tel:${phoneNumber}`)
      .then((result) => {})
      .catch((err: any) => {
        console.log(err, "err");
      });
  } catch (err: any) {}
};

export default callToTheNumber;
