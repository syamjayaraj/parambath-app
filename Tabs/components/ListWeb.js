import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Linking,
} from "react-native";
import axios from "axios";
import {
  Container,
  Content,
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
} from "native-base";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

export default function ListWeb(props) {
  let [items, setItems] = useState([]);
  let [filteredItems, setFilteredItems] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);
  const [showLabel, setShowLabel] = useState(true);

  let urlProp = props.route.params.url;

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    // Change the state every second or the time given by User.
    const interval = setInterval(() => {
      setShowLabel((showLabel) => !showLabel);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let fetchItems = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/${urlProp}/list?`);
      if (response && response.data && response.data.status == 200) {
        setItems(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  let filterItems = (searchInputValue) => {
    setSearchInput(searchInputValue);
    if (searchInputValue) {
      const lowercasedFilter = searchInputValue.toLowerCase();
      let filteredData = items.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercasedFilter) ||
          (item.malayalamName &&
            item.malayalamName.toLowerCase().includes(lowercasedFilter))
      );
      setFilteredItems(filteredData);
    } else {
      setFilteredItems([]);
    }
  };

  let callToTheNumber = async (phoneNumber) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: true,
      };
      await call(callArgs);
    } catch (err) {}
  };

  let cancelInput = () => {
    Keyboard.dismiss();
    setShowCancel(false);
    setSearchInput("");
    setFilteredItems([]);
  };

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err) {}
  };

  let itemsToSHow = filteredItems.length !== 0 ? filteredItems : items;
  return (
    <Container>
      <View>
        <View rounded style={[styles.searchInputContainer]}>
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
      <Content style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <List>
              {itemsToSHow.map((item, index) => {
                let itemImage = item.image ? item.image : "";
                itemImage = itemImage;
                // .replace(
                //   new RegExp("upload", "g"),
                //   "upload/c_thumb,w_200"
                // );

                return (
                  <ListItem key={index}>
                    <Left>
                      <TouchableOpacity
                        onPress={() =>
                          openBrowser({
                            url: item.url,
                          })
                        }
                      >
                        {itemImage ? (
                          <Thumbnail
                            source={{
                              uri: itemImage,
                            }}
                            style={
                              item.isPremium
                                ? {
                                    borderColor: "#FFA507",
                                    borderWidth: 2,
                                    padding: 1,
                                  }
                                : null
                            }
                          />
                        ) : (
                          <Thumbnail
                            source={require("../../assets/icons/placeholders/game.png")}
                            style={
                              item.isPremium
                                ? {
                                    borderColor: "#FFA507",
                                    borderWidth: 2,
                                    padding: 1,
                                  }
                                : null
                            }
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          openBrowser({
                            url: item.url,
                          })
                        }
                      >
                        <Body>
                          <Text>
                            {item.malayalamName
                              ? item.malayalamName
                              : item.name}
                            &nbsp;
                          </Text>

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
                                  backgroundColor: "#ffffff",
                                  borderWidth: 1,
                                  borderColor: "#f1f1f1",
                                  borderRadius: 5,
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
                        </Body>
                      </TouchableOpacity>
                    </Left>

                    <Right>
                      <TouchableOpacity
                        onPress={() =>
                          openBrowser({
                            url: item.url,
                          })
                        }
                      >
                        <Icon
                          name="arrow-forward-outline"
                          style={
                            item.isPremium
                              ? {
                                  color: "#FFA507",
                                }
                              : null
                          }
                        />
                      </TouchableOpacity>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          </View>
        )}
      </Content>
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
    height: 40,
    marginRight: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
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
