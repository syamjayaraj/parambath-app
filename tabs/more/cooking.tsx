import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Image,
} from "react-native";
import axios from "axios";
import {
  Container,
  List,
  ListItem,
  Text,
  Icon,
  Right,
  Item,
  Input,
  Left,
  Body,
  Spinner,
  Thumbnail,
  Card,
  CardItem,
  Button,
} from "native-base";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

export default function Autos(props: any) {
  let [autos, setAutos] = useState([]);
  let [filteredAutos, setFilteredAutos] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  useEffect(() => {
    fetchAutos();
  }, []);

  let fetchAutos = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/cooking/list?`);
      if (response && response.data && response.data.status == 200) {
        setAutos(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let filterItems = (searchInputValue) => {
    setSearchInput(searchInputValue);
    if (searchInputValue) {
      const lowercasedFilter = searchInputValue.toLowerCase();
      let filteredData = autos.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedFilter) ||
          (item.malayalamName &&
            item.malayalamName.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredAutos(filteredData);
    } else {
      setFilteredAutos([]);
    }
  };

  let callToTheNumber = async (phoneNumber) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: true,
      };
      await call(callArgs);
    } catch (err: any) {}
  };

  let cancelInput = () => {
    Keyboard.dismiss();
    setShowCancel(false);
    setSearchInput("");
    setFilteredAutos([]);
  };

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err: any) {}
  };

  let items = filteredAutos.length !== 0 ? filteredAutos : autos;
  return (
    <Container>
      <View>
        <View style={[styles.searchInputContainer]}>
          <Item
            rounded
            style={[
              styles.searchInput,
              { width: showCancel ? width - 110 : width - 45 },
            ]}
          >
            <Icon name="search-outline" />
            <Input
              placeholder="തിരയൂ"
              placeholderTextColor="#bababa"
              onChangeText={(value) => filterItems(value)}
              value={searchInput}
              onFocus={() => setShowCancel(true)}
            />
          </Item>
          {showCancel ? (
            <TouchableOpacity onPress={() => cancelInput()}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            {items.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    openBrowser({
                      url: item.url,
                    })
                  }
                  key={index}
                  style={{
                    marginBottom: 30,
                  }}
                >
                  <View
                    style={{
                      borderColor: "red",
                      // elevation: 1,
                      borderRadius: 10,
                      borderColor: "#f1f1f1",
                      borderWidth: 1,
                    }}
                  >
                    <View>
                      <Image
                        style={{
                          height: 150,
                          width: width - 41,
                          flex: 1,
                          borderRadius: 10,
                          borderBottomLeftRadius: 0,
                          borderBottomRightRadius: 0,
                        }}
                        source={{
                          uri: item.image,
                        }}
                      ></Image>
                    </View>
                    <View
                      style={{
                        position: "absolute",
                        top: -11,
                        right: -1,
                      }}
                    >
                      {item.label ? (
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Text
                            style={{
                              borderTopRightRadius: 10,

                              backgroundColor: "#ffffff",
                              borderWidth: 1,
                              borderColor: "#f1f1f1",
                              borderRadius: 0,
                              paddingRight: 10,
                              paddingLeft: 10,
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                              textAlign: "center",
                              fontSize: 12,
                              marginTop: 10,
                            }}
                          >
                            {item.label}
                          </Text>
                        </View>
                      ) : null}
                    </View>
                    <View
                      style={{
                        paddingLeft: 20,
                        paddingRight: 20,
                        paddingBottom: 20,
                      }}
                    >
                      <View
                        style={{
                          marginTop: 20,
                          marginBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        >
                          {item.malayalamName ? item.malayalamName : item.name}
                          &nbsp;
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                          }}
                        >
                          {item.description.substr(0, 150)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
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
    marginTop: 20,
  },
  searchInputContainer: {
    margin: 20,
    marginBottom: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    height: 45,
    marginRight: 10,
    backgroundColor: "#F4F5FF",
    borderRadius: 25,
    borderWidth: 0,
    elevation: 0,
  },

  cancel: {
    color: "#595959",
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
  owner: {
    fontSize: 13,
    color: "#1f1f1f",
  },
});
