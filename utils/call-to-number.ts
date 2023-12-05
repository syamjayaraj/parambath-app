import call from "react-native-phone-call";

const callToTheNumber = async (phoneNumber: any) => {
  try {
    let callArgs = {
      number: phoneNumber,
      prompt: false,
    };
    await call(callArgs);
  } catch (err: any) {}
};

export default callToTheNumber;
