import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  SafeAreaView,
} from "react-native";
import { Text, Spinner, Box, ScrollView } from "native-base";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from "@expo/vector-icons";
import { fetchContent } from "../../apiService";
import callToTheNumber from "../../utils/call-to-number";

const { width } = Dimensions.get("window");

export default function Contact() {
  const [content, setContent] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response: any = await fetchContent("setting");
      if (response && response?.data) {
        setContent(response?.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const openBrowser = async (params: any) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err: any) {}
  };

  return (
    <Box bg={"white"} pt={12}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          {loading ? (
            <View style={styles.loader}>
              <Spinner color="#1c1b29" />
            </View>
          ) : (
            <View>
              <Image
                source={require("../../assets/contact.png")}
                style={styles.featured}
              />
              <View style={styles.sectionContainer}>
                {content?.attributes?.phoneNumber ? (
                  <View style={styles.section}>
                    <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                    <TouchableOpacity
                      onPress={() =>
                        callToTheNumber(content?.attributes?.phoneNumber)
                      }
                    >
                      <Text style={styles.value}>
                        {content?.attributes?.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {content?.attributes?.phoneNumber2 ? (
                  <View style={styles.section}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                      <Text
                        style={{
                          fontSize: 10,
                          marginLeft: 5,
                        }}
                      >
                        (2)
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        callToTheNumber(content?.attributes?.phoneNumber2)
                      }
                    >
                      <Text style={styles.value}>
                        {content?.attributes?.phoneNumber2}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {content?.attributes?.email ? (
                  <View style={styles.section}>
                    <Text style={styles.label}>ഇമെയിൽ</Text>
                    <TouchableOpacity
                      onPress={() =>
                        Linking.openURL(`mailto:${content?.attributes?.email}`)
                      }
                    >
                      <Text style={styles.value}>
                        {content?.attributes?.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {content?.attributes?.address ? (
                  <View style={styles.section}>
                    <Text style={styles.label}>മേല്‍വിലാസം</Text>

                    <Text style={styles.value}>
                      {content?.attributes?.address}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.footer}>
                  {content?.attributes?.whatsapp ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?phone=${content?.attributes?.whatsapp}`
                        )
                      }
                    >
                      <Ionicons
                        name="logo-whatsapp"
                        size={24}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {content?.attributes?.website ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        openBrowser({
                          url: content?.attributes?.website,
                        })
                      }
                    >
                      <Ionicons
                        name="globe-outline"
                        size={24}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {content?.attributes?.facebook ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.canOpenURL(
                          `fb://page/${content?.attributes?.facebook}`
                        ).then((supported) => {
                          let facebookUrlIsId = /^\d+$/.test(
                            content?.attributes?.facebook
                          );
                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${content?.attributes?.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${content?.attributes?.facebook}`
                            );
                          }
                        })
                      }
                    >
                      <Ionicons
                        name="logo-facebook"
                        size={24}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {content?.attributes?.instagram ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.openURL(content?.attributes?.instagram)
                      }
                    >
                      <Ionicons
                        name="logo-instagram"
                        size={24}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {content?.attributes?.youtube ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.openURL(content?.attributes?.youtube)
                      }
                    >
                      <Ionicons name="logo-youtube" size={24} color="#2b2b2b" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  featured: {
    width: width,
    height: 200,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 100,
    margin: 20,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  aboutSection: {
    margin: 10,
  },
  section: {
    marginTop: 30,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#2b2b2b",
    textAlign: "center",
    marginTop: 15,
  },
  workName: {
    fontSize: 15,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2b2b2b",
  },
  value: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#636363",
    marginTop: 10,
  },
  searchInput: {
    backgroundColor: "#F2F2FF",
  },

  menuCardText: {
    fontWeight: "normal",
    fontSize: 15,
    color: "#1f1f1f",
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
  footer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  footerIconContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  footerIcon: {
    fontSize: 30,
  },
});
