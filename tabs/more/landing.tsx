import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Share,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import {
  Text,
  Box,
  ScrollView,
  HStack,
  VStack,
  Spacer,
  FlatList,
} from "native-base";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import appJson from "../../app.json";
import { fetchContent } from "../../apiService";

export default function Landing(props: any) {
  const [content, setContent] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const listData = [
    {
      id: 1,
      title: "സഹായം",
      page: "Help",
      icon: <Ionicons name="help-circle-outline" size={24} color="#2b2b2b" />,
    },
    {
      id: 2,
      title: "ഞങ്ങളുമായി ബന്ധപ്പെടൂ",
      page: "Contact",
      icon: <Ionicons name="call-outline" size={24} color="#2b2b2b" />,
    },
    {
      id: 3,
      title: "ആപ്പിനെക്കുറിച്ച്‌",
      page: "About",
      icon: (
        <Ionicons name="information-circle-outline" size={24} color="#2b2b2b" />
      ),
    },
    {
      id: 4,
      title: "സംഭാവകർ",
      page: "Contributors",
      icon: <Ionicons name="people-outline" size={24} color="#2b2b2b" />,
    },
    {
      id: 5,
      title: "ഉപാധികളും നിബന്ധനകളും",
      page: "Terms",
      icon: <Ionicons name="documents-outline" size={24} color="#2b2b2b" />,
    },
  ];

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

  let shareAppUrl = async () => {
    try {
      let appUrl =
        Platform.OS === "ios" ? content?.appUrlIos : content?.appUrlAndroid;
      const result = await Share.share({
        title: "പറമ്പത്ത് ആപ്പ്",
        message: content?.shareUrlMessage + appUrl,
        url: appUrl,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Box bg={"white"} pt={5} padding={3}>
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <Box style={styles.list}>
            <FlatList
              data={listData}
              renderItem={({ item }) => (
                <Box
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={[0, 3]} justifyContent="space-between">
                    {item?.icon}
                    <VStack>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate(item?.page)}
                      >
                        <Text style={{ marginLeft: 10 }}>{item?.title}</Text>
                      </TouchableOpacity>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              )}
              keyExtractor={(item: any) => item?.id}
            />
          </Box>

          {content?.shareUrlMessage ? (
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
              <EvilIcons name="share-apple" color="#2b2b2b" size={20} />
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
            Version {appJson?.expo?.version}
          </Text>
        </View>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: 10,
  },
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
    padding: 10,
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
