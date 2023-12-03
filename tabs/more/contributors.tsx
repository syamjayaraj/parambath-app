import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import axios from "axios";
import { apiUrl } from "../../config";

export default function Contributors(props: any) {
  let [contributors, setContributors] = useState([]);

  useEffect(() => {
    fetchContributors();
  }, []);

  let fetchContributors = async () => {
    try {
      let response = await axios.get(`${apiUrl}/contributor/list?`);
      if (response && response.data && response.data.status == 200) {
        setContributors(response.data.data);
      } else {
      }
    } catch (err: any) {}
  };

  return (
    <Box bg={"white"} pt={5} padding={3}>
      <SafeAreaView>
        {/* <ScrollView contentContainerStyle={{ width: "100%" }}> */}
        <View style={styles.sectionContainer}>
          <Box>
            <FlatList
              data={contributors}
              renderItem={({ item }: any) => (
                <Box
                  _dark={{
                    borderColor: "muted.50",
                  }}
                  borderColor="muted.800"
                  pl={["0", "4"]}
                  pr={["0", "5"]}
                  py="2"
                >
                  <HStack space={[3, 3]} justifyContent="space-between">
                    {item.image ? (
                      <Avatar
                        source={{
                          uri: item.image,
                        }}
                      />
                    ) : (
                      <Avatar
                        source={require("../../assets/icons/placeholders/admin.png")}
                      />
                    )}
                    <VStack>
                      <Text bold>{item.name}</Text>
                      <Text>{item.role}</Text>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Box>
              )}
              keyExtractor={(item: any) => item?._id}
            />
          </Box>
        </View>
        {/* </ScrollView> */}
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
    color: "black",
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
