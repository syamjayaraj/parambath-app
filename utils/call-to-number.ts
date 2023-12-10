import call from "react-native-phone-call";

const callToTheNumber = async (phoneNumber: any, prompt?: boolean) => {
  try {
    let callArgs = {
      number: phoneNumber,
      prompt: prompt ? prompt : false,
    };
    await call(callArgs);
  } catch (err: any) {}
};

export default callToTheNumber;
