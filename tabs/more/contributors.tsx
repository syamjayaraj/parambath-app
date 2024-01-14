import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Spacer,
  Spinner,
  Text,
  VStack,
} from "native-base";
import { apiDomain } from "../../config";
import { fetchContent } from "../../apiService";

export default function Contributors(props: any) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response: any = await fetchContent("contributors");
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
    <Box padding={5}>
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
                renderItem={({ item }: any) => (
                  <Box pb={7}>
                    <HStack space={[3, 3]} justifyContent="space-between">
                      {item?.attributes?.icon?.data?.attributes?.formats?.small
                        ?.url ? (
                        <Avatar
                          source={{
                            uri: `${apiDomain}${item?.attributes?.icon?.data?.attributes?.formats?.small?.url}`,
                          }}
                        />
                      ) : (
                        <Avatar
                          source={require("../../assets/icons/placeholders/admin.png")}
                        />
                      )}
                      <VStack>
                        <Text bold>{item?.attributes?.name}</Text>
                        <Text>{item?.attributes?.role}</Text>
                      </VStack>
                      <Spacer />
                    </HStack>
                  </Box>
                )}
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
    fontSize: 19,
  },
  menuCardText: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
  },
});
