import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Share,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import {
  Container,
  List,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Thumbnail,
} from "native-base";
import axios from "axios";
import { apiUrl } from "../../config";
import * as WebBrowser from "expo-web-browser";

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

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err: any) {}
  };

  console.log(contributors, "aa");

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.sectionContainer}>
          {contributors.map((item, index) => {
            return (
              <List key={index}>
                <ListItem avatar>
                  <Left>
                    {item.image ? (
                      <Thumbnail
                        source={{
                          uri: item.image,
                        }}
                      />
                    ) : (
                      <Thumbnail
                        source={require("../../assets/icons/placeholders/admin.png")}
                      />
                    )}
                  </Left>
                  <Body>
                    <Text>{item.name}</Text>
                    <Text note>{item.role}</Text>
                  </Body>
                </ListItem>
              </List>
            );
          })}
        </View>
      </View>
    </Container>
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
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "48%",
    height: 80,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
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
