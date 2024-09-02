import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, View, Alert, Keyboard } from "react-native";
import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  Button,
  Actionsheet,
  useDisclose,
} from "native-base";
import { apiDomain } from "../../config";
import { loadItemDetails, submitContest } from "../../apiService"; // Assuming `submitParticipant` is your API call to Strapi
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SuccessAnimation from "../components/success-animation/success-animation";

export default function ContestDetails(props: any) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [actionSheetHeight, setActionSheetHeight] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] =
    useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const navigation: any = useNavigation();

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response: any = await loadItemDetails({
        type: "contests",
        id: props?.route?.params?.id,
      });
      if (response && response?.data) {
        setContent(response?.data);
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const handleOptionSelect = (option: any) => {
    setSelectedOption(option);
    console.log(option?.title);
    if (option?.title !== "അതെ") {
      setNote(option?.title);
    }
    onOpen();
  };

  const handleSubmit = async () => {
    try {
      if (!name || !phoneNumber || !selectedOption) {
        Alert.alert("Error", "Please fill all fields.");
        return;
      }

      const participantData = {
        data: {
          name,
          phoneNumber,
          note,
          contest: props?.route?.params?.id,
          answer: selectedOption?.correct,
        },
      };

      console.log(selectedOption?.correct, "correct");

      const response: any = await submitContest(participantData);

      if (response?.id) {
        setShowSuccessAnimation(true);
        onClose();
      } else {
        Alert.alert(
          "Error",
          "നിങ്ങളുടെ ഉത്തരം സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക."
        );
      }
    } catch (err: any) {
      Alert.alert(
        "Error",
        "നിങ്ങളുടെ ഉത്തരം സമർപ്പിക്കുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക."
      );
    }
  };

  const contentImage =
    apiDomain +
    content?.attributes?.image?.data?.attributes.formats?.small?.url;

  const handleCloseSuccess = () => {
    navigation.navigate("Home");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setActionSheetHeight("80%");
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setActionSheetHeight("auto");
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Box mb={20}>
      <SuccessAnimation
        visible={showSuccessAnimation}
        message="നിങ്ങളുടെ ഉത്തരം വിജയകരമായി സമർപ്പിച്ചു"
        onClose={handleCloseSuccess}
      />
      <SafeAreaView>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Box alignItems="center" mt={5}>
              <Box
                maxW="80"
                rounded="lg"
                overflow="hidden"
                borderColor="coolGray.200"
                borderWidth="1"
                _light={{
                  backgroundColor: "gray.50",
                }}
              >
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image
                      source={{
                        uri: contentImage,
                      }}
                      alt="image"
                    />
                  </AspectRatio>
                  <Center
                    bg="violet.500"
                    position="absolute"
                    bottom="0"
                    px="3"
                    py="1.5"
                  >
                    <HStack>
                      <Ionicons
                        name="trophy-outline"
                        size={28}
                        style={styles.icon}
                      />
                      <Text color="warmGray.50" fontWeight="700" fontSize="xs">
                        {content?.attributes?.prize}
                      </Text>
                    </HStack>
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="md" ml="-1">
                      {content?.attributes?.title}
                    </Heading>
                    <Text
                      fontSize="xs"
                      _light={{
                        color: "violet.500",
                      }}
                      fontWeight="500"
                      ml="-0.5"
                      mt="-1"
                    >
                      {moment(content?.attributes?.endDate).format(
                        "Do MMM YYYY hh:mm A"
                      )}{" "}
                      വരെ
                    </Text>
                  </Stack>
                  <Text fontWeight="400">
                    {content?.attributes?.description}
                  </Text>
                  <HStack
                    alignItems="center"
                    space={4}
                    justifyContent="space-between"
                  >
                    <HStack alignItems="center">
                      <Text color="coolGray.600" fontWeight="400">
                        {moment(content?.attributes?.createdAt).format(
                          "Do MMM YYYY"
                        )}
                      </Text>
                    </HStack>
                  </HStack>
                </Stack>
              </Box>
              {content?.attributes?.question && (
                <Box
                  mt={5}
                  rounded="lg"
                  width={"80%"}
                  overflow="hidden"
                  borderColor="coolGray.200"
                  borderWidth="1"
                  _light={{
                    backgroundColor: "gray.50",
                  }}
                >
                  <Stack p="4" space={3}>
                    <Text fontWeight="400">
                      {content?.attributes?.question}
                    </Text>
                  </Stack>
                  {content?.attributes?.option?.length !== 0 &&
                    content?.attributes?.option?.map(
                      (option: any, index: number) => (
                        <Button
                          key={index}
                          onPress={() => handleOptionSelect(option)}
                          colorScheme="violet"
                          variant={
                            selectedOption === option ? "solid" : "outline"
                          }
                        >
                          {option?.title}
                        </Button>
                      )
                    )}
                </Box>
              )}
            </Box>
          </View>
        )}
      </SafeAreaView>

      {/* Bottom Sheet for Additional Details */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box w="100%" px={4} py={6} height={actionSheetHeight}>
            <Input
              placeholder="പേര്"
              value={name}
              onChangeText={setName}
              mb={4}
            />
            <Input
              placeholder="ഫോൺ നമ്പർ"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              mb={4}
              keyboardType="phone-pad"
            />
            <Input
              placeholder="ഉത്തരം"
              value={note}
              onChangeText={setNote}
              mb={4}
              height={20}
            />
            <Button onPress={handleSubmit} colorScheme="violet">
              ഉത്തരം സമർപ്പിക്കൂ
            </Button>
          </Box>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}

const styles = StyleSheet.create({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#2b2b2b",
  },
  sectionContainer: {
    marginTop: 0,
    padding: 1,
  },
  icon: {
    fontSize: 14,
    color: "white",
    marginRight: 5,
    paddingTop: 3,
  },
});
