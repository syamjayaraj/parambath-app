import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Share,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Container, List, Text, Icon, Box, ScrollView } from "native-base";
import axios from "axios";
import { apiUrl } from "../../config";
import * as WebBrowser from "expo-web-browser";

export default function Landing(props: any) {
  let [settings, setSettings] = useState<any>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  let fetchSettings = async () => {
    try {
      let response = await axios.get(`${apiUrl}/settings`);
      if (response && response.data && response.data.status == 200) {
        setSettings(response.data.data);
      } else {
      }
    } catch (err: any) {}
  };

  let shareAppUrl = async () => {
    try {
      let appUrl =
        Platform.OS === "ios" ? settings.appUrlIos : settings.appUrlAndroid;
      const result = await Share.share({
        title: "പറമ്പത്ത് ആപ്പ്",
        message: settings.shareUrlMessage + appUrl,
        url: appUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const openBrowser = async (params: any) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err: any) {}
  };

  return (
    <Box bg={"white"} pt={5} padding={3}>
      <ScrollView contentContainerStyle={{ width: "100%" }}>
        <View style={styles.sectionContainer}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={{
                ...styles.menuCard,
              }}
              onPress={() => props.navigation.navigate("Cooking")}
            >
              <Image
                source={require("../../assets/icons/bake.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.menuCardText}>പാചകം</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.menuCard,
              }}
              onPress={() => props.navigation.navigate("Games")}
            >
              <Image
                source={require("../../assets/icons/game.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.menuCardText}>കളികൾ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.menuCard,
              }}
              onPress={() => props.navigation.navigate("Tools")}
            >
              <Image
                source={require("../../assets/icons/tool.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.menuCardText}>ഓൺലൈൻ ടൂൾസ് </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
              }}
              onPress={() => props.navigation.navigate("Channels")}
            >
              <Image
                source={require("../../assets/icons/tv.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.menuCardText}>തത്സമയ ചാനലുകൾ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
              }}
              onPress={() =>
                props.navigation.navigate("Offers", {
                  url: "offer",
                  categoryUrl: "offer-category",
                  placeHolderImage: "offer",
                  itemCategory: "offerCategory",
                  main: "Offer",
                })
              }
            >
              <Image
                source={require("../../assets/icons/offer.png")}
                style={styles.imageIcon}
              />
              <Text style={styles.menuCardText}>ഓഫറുകൾ</Text>
            </TouchableOpacity>

            {settings.products ? (
              <TouchableOpacity
                style={{
                  ...styles.menuCard,
                }}
                onPress={() =>
                  openBrowser({
                    url: settings.products,
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/products.png")}
                  style={styles.imageIcon}
                />
                <Text style={styles.menuCardText}>ഉൽപ്പന്നങ്ങൾ</Text>
              </TouchableOpacity>
            ) : null}

            {settings.tech ? (
              <TouchableOpacity
                style={{
                  ...styles.menuCard,
                }}
                onPress={() =>
                  openBrowser({
                    url: settings.tech,
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/tech.png")}
                  style={styles.imageIcon}
                />
                <Text style={styles.menuCardText}>ടെക്നോളജി</Text>
              </TouchableOpacity>
            ) : null}
            {settings.coding ? (
              <TouchableOpacity
                style={{
                  ...styles.menuCard,
                  ...{
                    backgroundColor: "#FBECEA",
                  },
                }}
                onPress={() =>
                  openBrowser({
                    url: settings.coding,
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/coding.png")}
                  style={styles.imageIcon}
                />
                <Text style={styles.menuCardText}>
                  കോഡിങ്/പ്രോഗ്രാമിങ് പഠിക്കാം
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <List>
            <Icon name="help-circle-outline" style={styles.icon} />

            <TouchableOpacity onPress={() => props.navigation.navigate("Help")}>
              <Text style={{ marginLeft: 10 }}>സഹായം</Text>
            </TouchableOpacity>

            <Icon name="call-outline" style={styles.icon} />

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Contact")}
            >
              <Text style={{ marginLeft: 10 }}>ഞങ്ങളുമായി ബന്ധപ്പെടൂ</Text>
            </TouchableOpacity>

            <Icon name="information-circle-outline" style={styles.icon} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("About")}
            >
              <Text style={{ marginLeft: 10 }}>ആപ്പിനെക്കുറിച്ച്‌</Text>
            </TouchableOpacity>

            <Icon name="people-outline" style={styles.icon} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Contributors")}
            >
              <Text style={{ marginLeft: 10 }}>സംഭാവകർ</Text>
            </TouchableOpacity>

            <Icon name="documents-outline" style={styles.icon} />
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Terms")}
            >
              <Text style={{ marginLeft: 10 }}>ഉപാധികളും നിബന്ധനകളും</Text>
            </TouchableOpacity>
          </List>

          {settings.shareUrlMessage ? (
            <TouchableOpacity
              onPress={shareAppUrl}
              style={{
                marginTop: 30,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: "#f1f1f1",
                padding: 10,
              }}
            >
              <Icon name="share-outline" style={styles.icon} />
              <Text style={{ marginLeft: 5, fontSize: 13 }}>
                സുഹൃത്തുക്കളെ ആപ്പിലേക്ക് സ്വാഗതം ചെയ്യൂ
              </Text>
            </TouchableOpacity>
          ) : null}

          <Text
            style={{
              marginTop: 30,
              marginBottom: 50,
              textAlign: "center",
              fontSize: 15,
              color: "#b0b0b0",
            }}
          >
            Version 3.3
          </Text>
        </View>
      </ScrollView>
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
    color: "black",
  },
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 0,
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
    borderWidth: 0,
    borderColor: "red",
    width: "48%",
    height: 80,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 0.2,
    padding: 6,
    borderRadius: 0.5,
  },
  imageIcon: {
    width: 30,
    height: 30,
  },
  icon: {
    fontSize: 19,
  },
  menuCardText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
    marginTop: 10,
  },
});
