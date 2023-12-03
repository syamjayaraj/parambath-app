import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  Image,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import {
  Container,
  List,
  Text,
  Icon,
  Input,
  Spinner,
  Box,
  FlatList,
  HStack,
  Avatar,
  VStack,
  Spacer,
} from "native-base";
import { apiUrl } from "../../config";
import Carousel from "react-native-snap-carousel";
import * as WebBrowser from "expo-web-browser";
import call from "react-native-phone-call";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function ListWithCarousel(props: any) {
  let [items, setitems] = useState<any>([]);
  let [filteredEvents, setFilteredEvents] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);
  const [carousel, setCarousel] = useState([]);
  const [showLabel, setShowLabel] = useState(true);

  let carouselProp = props.route.params.carouselUrl;
  let deliveryUrlProp = props.route.params.deliveryUrl;
  let itemCategoryProp: any = props.route.params.itemCategory;
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
    } catch (err: any) {
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
    } catch (err: any) {
      setLoading(false);
    }
  };

  let filterItems = (searchInputValue: any) => {
    setSearchInput(searchInputValue);
    if (searchInputValue) {
      const lowercasedFilter = searchInputValue.toLowerCase();
      let filteredData: any = items.filter(
        (item: any) =>
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

  let _renderItem = ({ item, index }: any) => {
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

  let callToTheNumber = async (phoneNumber: string) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: true,
      };
      await call(callArgs);
    } catch (err: any) {}
  };

  const openBrowser = async (params: any) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err: any) {}
  };

  let itemsToShow = filteredEvents.length !== 0 ? filteredEvents : items;

  return (
    <Box bg={"white"} pt={12}>
      <SafeAreaView>
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
            loop={true}
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

        <View style={[styles.searchInputContainer]}>
          <View
            style={[
              styles.searchInput,
              { width: showCancel ? width - 110 : width - 45 },
            ]}
          >
            <Ionicons name="search-outline" size={24} color="black" />
            <Input
              placeholder="തിരയൂ"
              placeholderTextColor="#bababa"
              onChangeText={(value) => filterItems(value)}
              value={searchInput}
              onFocus={() => setShowCancel(true)}
            />
          </View>
          {showCancel ? (
            <TouchableOpacity onPress={() => cancelInput()}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Box>
              <FlatList
                data={itemsToShow}
                renderItem={({ item }: any) => (
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate(mainProp, {
                        itemId: item._id,
                        url: urlProp,
                        itemCategory: itemCategoryProp,
                      })
                    }
                  >
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
                        <VStack>
                          <Text bold>
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
                            <Text style={styles.note}>
                              {item[itemCategoryProp] &&
                              item[itemCategoryProp].malayalamName
                                ? item[itemCategoryProp].malayalamName
                                : item[itemCategoryProp].name}
                              &nbsp;
                            </Text>
                          ) : null}
                        </VStack>
                        <Spacer />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                )}
                keyExtractor={(item: any) => item?._id}
              />
            </Box>
          </View>
        )}
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  note: {
    color: "#7d7c7c",
  },
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
