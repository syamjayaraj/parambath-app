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
import Carousel from "react-native-snap-carousel";
import * as WebBrowser from "expo-web-browser";
import call from "react-native-phone-call";

const { width } = Dimensions.get("window");

export default function ListWithCarousel(props) {
  let [items, setitems] = useState([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);
  const [carousel, setCarousel] = useState([]);
  const [showLabel, setShowLabel] = useState(true);

  let carouselProp = props.route.params.carouselUrl;
  let deliveryUrlProp = props.route.params.deliveryUrl;
  let itemCategoryProp = props.route.params.itemCategory;
  let urlProp = props.route.params.url;
  let categoryUrlProp = props.route.params.categoryUrl;
  let mainProp = props.route.params.main;

  useEffect(() => {
    fetchCarousel();
    fetchitems();
  }, []);

  // useEffect(() => {
  //   // Change the state every second or the time given by User.
  //   const interval = setInterval(() => {
  //     setShowLabel((showLabel) => !showLabel);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  let fetchCarousel = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`${apiUrl}/carousel/list/${carouselProp}`);
      if (response && response.data && response.data.status == 200) {
        setCarousel(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  let fetchitems = async () => {
    try {
      setLoading(true);
      let response = await axios.get(
        `${apiUrl}/${deliveryUrlProp ? deliveryUrlProp : urlProp}/list?`
      );
      if (response && response.data && response.data.status == 200) {
        setitems(response.data.data);
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
      setFilteredEvents(filteredData);
    } else {
      setFilteredEvents([]);
    }
  };

  let cancelInput = () => {
    Keyboard.dismiss();
    setShowCancel(false);
    setSearchInput("");
    setFilteredEvents([]);
  };

  let _renderItem = ({ item, index }) => {
    let itemImage = item.image;
    // .replace(
    //   new RegExp("upload", "g"),
    //   `upload/c_thumb,w_${2 * (width - 50)},h_400`
    // );
    item.linkType = item.linkType === "Delivery" ? "Business" : item.linkType;
    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          props.navigation.navigate(item.linkType, {
            itemId: item.link,
            url: urlProp,
            itemCategory: itemCategoryProp,
          })
        }
        style={{
          padding: 10,
        }}
      >
        <Image
          style={{
            width: width - 20,
            height: 250,
            borderRadius: 10,
          }}
          source={{
            uri: itemImage,
          }}
        ></Image>
      </TouchableOpacity>
    );
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

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err) {}
  };

  let itemsToShow = filteredEvents.length !== 0 ? filteredEvents : items;

  return (
    <Container>
      <Content style={styles.container}>
        {loading ? (
          <View
            style={{
              width: width - 20,
              height: 200,
              borderRadius: 10,
              backgroundColor: "#f1f1f1",
              marginLeft: 10,
              marginTop: 20,
            }}
          ></View>
        ) : !showCancel ? (
          <Carousel
            showsHorizontalScrollIndicator={true}
            indica
            loop={true}
            activeOpacity={1}
            autoplay={true}
            autoplayInterval={2500}
            autoplayDelay={1000}
            layout={"stack"}
            data={carousel}
            sliderWidth={width}
            itemWidth={width}
            renderItem={_renderItem}
          />
        ) : null}
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
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <List>
              {itemsToShow.map((item, index) => {
                let itemImage =
                  item.images && item.images.length != 0
                    ? item.images[0]
                    : item.icon
                    ? item.icon
                    : item[itemCategoryProp] && [itemCategoryProp].icon
                    ? item[itemCategoryProp].icon
                    : "";
                itemImage = itemImage;
                // .replace(
                //   new RegExp("upload", "g"),
                //   "upload/c_thumb,w_200"
                // );
                return (
                  <ListItem key={index}>
                    <Left>
                      {/* <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate(mainProp, {
                            itemId: item._id,
                            url: urlProp,
                            itemCategory: itemCategoryProp,
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
                            source={require("../../assets/icons/placeholders/event.png")}
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
                      </TouchableOpacity> */}

                      <Body>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate(mainProp, {
                              itemId: item._id,
                              url: urlProp,
                              itemCategory: itemCategoryProp,
                            })
                          }
                        >
                          <Text>
                            {item.malayalamName
                              ? item.malayalamName
                              : item.name}
                            &nbsp;
                          </Text>
                          {item.label && showLabel ? (
                            <Text
                              style={{
                                backgroundColor: "#ffffff",
                                borderWidth: 1,
                                borderColor: "#d94338",
                                borderRadius: 5,
                                paddingRight: 10,
                                paddingLeft: 10,
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                textAlign: "center",
                                width: 70,
                                fontSize: 12,
                                marginTop: 10,
                              }}
                            >
                              {item.label}
                            </Text>
                          ) : item[itemCategoryProp] ? (
                            <Text note>
                              {item[itemCategoryProp] &&
                              item[itemCategoryProp].malayalamName
                                ? item[itemCategoryProp].malayalamName
                                : item[itemCategoryProp].name}
                              &nbsp;
                            </Text>
                          ) : null}
                        </TouchableOpacity>
                      </Body>
                    </Left>
                    {deliveryUrlProp ? (
                      <Right
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: item.onlineBookingUrl
                            ? "space-between"
                            : "flex-end",
                        }}
                      >
                        {item.onlineBookingUrl ? (
                          <TouchableOpacity
                            onPress={() =>
                              openBrowser({
                                url: item.onlineBookingUrl,
                              })
                            }
                          >
                            <Icon
                              name="globe-outline"
                              style={
                                item.isPremium
                                  ? {
                                      color: "#FFA507",
                                    }
                                  : null
                              }
                            />
                          </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                          onPress={() => callToTheNumber(item.phoneNumber)}
                        >
                          <Icon
                            name="call-outline"
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
                    ) : (
                      <Right>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate(mainProp, {
                              itemId: item._id,
                              url: urlProp,
                              itemCategory: itemCategoryProp,
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
                    )}
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
  container: {},
  sectionContainer: {
    padding: 20,
    marginTop: 0,
    marginBottom: 50,
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
