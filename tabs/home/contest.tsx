import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
} from "native-base";
import { apiDomain } from "../../config";
import { fetchContent } from "../../apiService";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Contest(props: any) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation: any = useNavigation();

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response: any = await fetchContent("contests");
      if (response && response?.data) {
        setContent(response?.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  return (
    <Box mb={20}>
      <SafeAreaView>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Box>
              <FlatList
                data={content}
                renderItem={({ item }: any) => {
                  const itemImage =
                    apiDomain +
                    item?.attributes?.image?.data?.attributes.formats?.small
                      ?.url;

                  return (
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
                                uri: itemImage,
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
                              <Text
                                color="warmGray.50"
                                fontWeight="700"
                                fontSize="xs"
                              >
                                {item?.attributes?.prize}
                              </Text>
                            </HStack>
                          </Center>
                        </Box>
                        <Stack p="4" space={3}>
                          <Stack space={2}>
                            <Heading size="md" ml="-1">
                              {item?.attributes?.title}
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
                              {moment(item?.attributes?.endDate).format(
                                "Do MMM YYYY hh:mm A"
                              )}{" "}
                              വരെ
                            </Text>
                          </Stack>
                          <Text fontWeight="400">
                            {item?.attributes?.description}
                          </Text>
                          <HStack
                            alignItems="center"
                            space={4}
                            justifyContent="space-between"
                          >
                            <HStack alignItems="center">
                              <Text color="coolGray.600" fontWeight="400">
                                {moment(item?.attributes?.createdAt).format(
                                  "Do MMM YYYY"
                                )}
                              </Text>
                            </HStack>
                          </HStack>
                          <Button
                            color="amber.200"
                            backgroundColor="purple.800"
                            onPress={() => {
                              navigation?.navigate("ContestDetails", {
                                id: item?.id,
                              });
                            }}
                          >
                            പങ്കെടുക്കൂ
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  );
                }}
                keyExtractor={(item: any) => item?.id}
              />
            </Box>
          </View>
        )}
      </SafeAreaView>
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
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 0,
    padding: 1,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 21,
  },
  owner: {
    fontSize: 13,
    color: "#1f1f1f",
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 0,
    flex: 3,
    flexWrap: "wrap",
    padding: 5,
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "48%",
    height: 80,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 0.2,
    marginBottom: 20,
    padding: 6,
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
  icon: {
    fontSize: 14,
    color: "white",
    marginRight: 5,
    paddingTop: 3,
  },
  menuCardText: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
  },
});
