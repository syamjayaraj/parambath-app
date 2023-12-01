import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import axios from "axios";
import { Container, Text, Icon, Spinner } from "native-base";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

export default function Autos(props: any) {
  let [settings, setSettings] = useState({});

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  let fetchSettings = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/settings`);
      if (response && response.data && response.data.status == 200) {
        setSettings(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let callToTheNumber = async (phoneNumber) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: false,
      };
      await call(callArgs);
    } catch (err: any) {}
  };

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err: any) {}
  };

  return (
    <Container>
      <View style={styles.container}>
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
              {settings.phoneNumber ? (
                <View style={styles.section}>
                  <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                  <TouchableOpacity
                    onPress={() => callToTheNumber(settings.phoneNumber)}
                  >
                    <Text style={styles.value}>{settings.phoneNumber}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {settings.phoneNumber2 ? (
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
                      note
                      style={{
                        fontSize: 10,
                        marginLeft: 5,
                      }}
                    >
                      (2)
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => callToTheNumber(settings.phoneNumber2)}
                  >
                    <Text style={styles.value}>{settings.phoneNumber2}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {settings.email ? (
                <View style={styles.section}>
                  <Text style={styles.label}>ഇമെയിൽ</Text>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(`mailto:${settings.email}`)}
                  >
                    <Text style={styles.value}>{settings.email}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {settings.address ? (
                <View style={styles.section}>
                  <Text style={styles.label}>മേല്‍വിലാസം</Text>

                  <Text style={styles.value}>{settings.address}</Text>
                </View>
              ) : null}

              <View style={styles.footer}>
                {settings.whatsapp ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.openURL(
                        `whatsapp://send?phone=${settings.whatsapp}`
                      )
                    }
                  >
                    <Icon name="logo-whatsapp" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {settings.website ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      openBrowser({
                        url: settings.website,
                      })
                    }
                  >
                    <Icon name="globe-outline" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {settings.facebook ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.canOpenURL(`fb://page/${settings.facebook}`).then(
                        (supported) => {
                          let facebookUrlIsId = /^\d+$/.test(settings.facebook);

                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${settings.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${settings.facebook}`
                            );
                          }
                        }
                      )
                    }
                  >
                    <Icon name="logo-facebook" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {settings.instagram ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(settings.instagram)}
                  >
                    <Icon name="logo-instagram" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {settings.youtube ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(settings.youtube)}
                  >
                    <Icon name="logo-youtube" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </View>
        )}
      </View>
    </Container>
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
    color: "black",
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
    color: "black",
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
