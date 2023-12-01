import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Keyboard,
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
} from "native-base";
import moment from "moment";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import RBSheet from "react-native-raw-bottom-sheet";
import colours from "../../const/colours";

const { width, height } = Dimensions.get("window");

export default function ListComponent(props: any) {
  let [items, setitems] = useState([]);
  let [categories, setCategories] = useState([]);
  let [selectedCategoryId, setSelectedCategoryId] = useState("");
  let [filtereditems, setFiltereditems] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);

  const refRBSheet = useRef();

  let itemCategoryProp: any = props.route.params.itemCategory;
  let urlProp = props.route.params.url;
  let categoryUrlProp = props.route.params.categoryUrl;
  let mainProp = props.route.params.main;
  let placeholderImageUrlprop = props.route.params.placeholderImageUrl;

  useEffect(() => {
    fetchitems();
  }, []);

  let fetchitems = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/${urlProp}/list?`);
      if (response && response.data && response.data.status == 200) {
        setitems(response.data.data);
        showCategories(response.data.data);
        setFiltereditems(response.data.data);
      } else {
      }
      // fetchItemCategories();
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let fetchItemCategories = async () => {
    try {
      let response = await axios.get(`${apiUrl}/${categoryUrlProp}/list?`);
      if (response && response.data && response.data.status == 200) {
        setitemsCategories(response.data.data);
      } else {
      }
    } catch (err: any) {}
  };

  let showCategories = (items) => {
    let itemCategories: any = [];
    items.map((item: any) => {
      let categoryExist = false;
      itemCategories.map((itemCategory: any) => {
        if (item[itemCategoryProp]._id === itemCategory._id) {
          categoryExist = true;
        }
      });
      if (!categoryExist) {
        itemCategories.push(item[itemCategoryProp]);
      }
    });
    setCategories(itemCategories);
  };

  let setCategoryIdAdvanced = (value: any) => {
    if (selectedCategoryId === value) {
      setSelectedCategoryId("");
    } else {
      setSelectedCategoryId(value);
    }
  };

  const moveItem = (arr, fromIndex, toIndex) => {
    let itemRemoved = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, itemRemoved[0]);
    return arr;
  };

  let setCategoryIdAdvancedBottomSheet = (value) => {
    if (selectedCategoryId === value) {
      setSelectedCategoryId("");
    } else {
      setSelectedCategoryId(value);

      categories?.map((item, index) => {
        if (item._id === value) {
          const newArray = moveItem(categories, index, 0);
          setCategories(newArray);
        }
      });
    }
    refRBSheet.current.close();
  };

  useEffect(() => {
    setSearchAdvanced(searchInput);
  }, [selectedCategoryId]);

  let setSearchAdvanced = (value) => {
    setSearchInput(value);

    let categoryWiseFilteredData = [];
    if (selectedCategoryId) {
      categoryWiseFilteredData = items.filter((item) => {
        return item[itemCategoryProp]._id === selectedCategoryId;
      });
    } else {
      categoryWiseFilteredData = items;
    }
    if (value) {
      const lowercasedFilter = value.toLowerCase();
      let filteredData = categoryWiseFilteredData.filter((item) => {
        return (
          (item.name && item.name.toLowerCase().includes(lowercasedFilter)) ||
          item[itemCategoryProp].name
            .toLowerCase()
            .includes(lowercasedFilter) ||
          (item.malayalamName &&
            item.malayalamName.includes(lowercasedFilter)) ||
          (item[itemCategoryProp].malayalamName &&
            item[itemCategoryProp].malayalamName.includes(lowercasedFilter)) ||
          (item.title && item.title.toLowerCase().includes(lowercasedFilter)) ||
          (item[itemCategoryProp].malayalamTitle &&
            item[itemCategoryProp].malayalamTitle.includes(lowercasedFilter))
        );
      });
      setFiltereditems(filteredData);
    } else {
      setFiltereditems(categoryWiseFilteredData);
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

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err: any) {}
  };

  let cancelInput = () => {
    Keyboard.dismiss();
    setShowCancel(false);
    setSearchInput("");
    setFiltereditems(items);
  };

  // categories = categories.map((item) => {
  //   let itemIcon = item.icon ? item.icon : "";
  //   itemIcon = itemIcon.replace(
  //     new RegExp("upload", "g"),
  //     "upload/c_thumb,w_50"
  //   );
  //   return {
  //     ...item,
  //     icon: itemIcon,
  //   };
  // });

  const getRandomInt = (max: any) => {
    return Math.floor(Math.random() * max);
  };

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
              onChangeText={(value) => setSearchAdvanced(value)}
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
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          renderItem={({ item }: any) => (
            <View style={{ padding: 10, marginTop: 0 }}>
              <TouchableOpacity
                style={[styles.categoryBadge]}
                onPress={() => setCategoryIdAdvanced(item._id)}
              >
                {/* {item.icon ? (
                  <Image
                    source={{
                      uri: item.icon,
                    }}
                    style={styles.categoryBadgeImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/icons/placeholders/category.png")}
                    style={styles.categoryBadgeImage}
                  />
                )} */}
                <Text
                  style={[
                    styles.categoryBadgeText,
                    {
                      color: "black",
                    },
                  ]}
                >
                  {item.malayalamName ? item.malayalamName : item.name}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        {categories?.length !== 0 && (
          <TouchableOpacity
            style={styles.categoryMore}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.categoryMoreText}>മറ്റുള്ളവ</Text>
            <Icon
              style={styles.categoryMoreIcon}
              name="arrow-forward-outline"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color={colours[getRandomInt(6)]} />
          </View>
        ) : (
          <View>
            <View style={styles.sectionContainer}>
              <List>
                {filtereditems.map((item: any, index: number) => {
                  let itemImage =
                    item.images.length != 0
                      ? item.images[0]
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
                          ) : urlProp === "business" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/business.png")}
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
                          ) : urlProp === "auto" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/auto.png")}
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
                          ) : urlProp === "vehicle" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/vehicle.png")}
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
                          ) : urlProp === "worker" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/worker.png")}
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
                          ) : urlProp === "emergency" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/emergency.png")}
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
                          ) : urlProp === "enterprise" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/enterprise.png")}
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
                          ) : urlProp === "representative" ? (
                            <Thumbnail
                              source={require("../../assets/icons/placeholders/representative.png")}
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
                          ) : null}
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
                                : item.malayalamTitle
                                ? item.malayalamTitle
                                : item.name
                                ? item.name
                                : item.title}
                              &nbsp;
                            </Text>
                            {item[itemCategoryProp] ? (
                              <Text note>
                                {item[itemCategoryProp] &&
                                item[itemCategoryProp].malayalamName
                                  ? item[itemCategoryProp].malayalamName
                                  : item[itemCategoryProp].name}
                                &nbsp;
                                {urlProp === "notification" ? (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: "#b0b0b0",
                                    }}
                                  >
                                    &nbsp; &nbsp;|&nbsp;
                                    {moment(item.createdAt)
                                      .startOf("day")
                                      .fromNow()}
                                  </Text>
                                ) : null}
                              </Text>
                            ) : null}
                          </TouchableOpacity>
                        </Body>
                      </Left>
                      {urlProp === "notification" ? (
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
                      ) : (
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
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </View>
          </View>
        )}
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={height - 50}
          animationType="slide"
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
          }}
        >
          <View style={styles.categoryExp}>
            {/* <View style={styles.categoryExpHeaderContainer}>
              <Text style={styles.categoryExpHeader}>തിരഞ്ഞെടുക്കൂ</Text>
            </View> */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={categories}
              renderItem={({ item }: any) => (
                <View style={{ padding: 10, marginTop: 0 }}>
                  <TouchableOpacity
                    style={[styles.categoryExpItem]}
                    onPress={() => setCategoryIdAdvancedBottomSheet(item._id)}
                  >
                    {/* {item.icon ? (
                  <Image
                    source={{
                      uri: item.icon,
                    }}
                    style={styles.categoryBadgeImage}
                  />
                ) : (
                  <Image
                    source={require("../../assets/icons/placeholders/category.png")}
                    style={styles.categoryBadgeImage}
                  />
                )} */}
                    <Text
                      style={[
                        styles.categoryExpItemText,
                        {
                          color: "black",
                        },
                      ]}
                    >
                      {item.malayalamName ? item.malayalamName : item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item: any) => item._id}
            />
          </View>
        </RBSheet>
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
  time: {
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
    paddingTop: 0,
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
  categoryBadge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    borderRadius: 18,
    height: 36,
    paddingRight: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  categoryBadgeImage: {
    width: 15,
    height: 15,
    borderRadius: 3,
  },
  categoryBadgeText: {
    fontSize: 14,
    // marginLeft: 6,
  },

  categoryMore: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  categoryMoreText: {
    fontSize: 11,
  },
  categoryMoreIcon: {
    fontSize: 15,
    marginLeft: 2,
  },

  categoryExp: {},
  categoryExpHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryExpHeader: {
    fontWeight: "100",
    fontSize: 25,
  },
  categoryExpItem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    padding: 10,
  },
  categoryExpItemText: {},
});
