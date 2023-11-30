import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Keyboard,
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
} from "native-base";
import { apiUrl } from "../../config";
import RBSheet from "react-native-raw-bottom-sheet";
import colours from "../../const/colours";

const { width, height } = Dimensions.get("window");

export default function Autos(props) {
  let [busTimings, setBusTimings] = useState([]);
  let [busRoutes, setBusRoutes] = useState([]);
  let [selectedBusRoute, setSelectedBusRoute] = useState("");
  let [filteredBusTimings, setFilteredBusTimings] = useState([]);
  let [loading, setLoading] = useState(false);
  let [searchInput, setSearchInput] = useState("");
  let [showCancel, setShowCancel] = useState(false);

  const refRBSheet = useRef();

  useEffect(() => {
    fetchBusTimings();
  }, []);

  let fetchBusTimings = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/bus-timing/list?`);
      if (response && response.data && response.data.status == 200) {
        setBusTimings(response.data.data);
        showRoutes(response.data.data);
        setFilteredBusTimings(response.data.data);
      } else {
      }
      fetchBusRoutes();

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  let fetchBusRoutes = async () => {
    try {
      let response = await axios.get(`${apiUrl}/bus-route/list?`);
      if (response && response.data && response.data.status == 200) {
        setBusRoutes(response.data.data);
      } else {
      }
    } catch (err) {}
  };

  let showRoutes = (timings) => {
    let routes = [];
    timings.map((timing) => {
      let routeExist = false;
      routes.map((itemCategory) => {
        if (timing.route._id === itemCategory._id) {
          routeExist = true;
        }
      });
      if (!routeExist) {
        routes.push(timing.route);
      }
    });
    setBusRoutes(routes);
  };

  const moveItem = (arr, fromIndex, toIndex) => {
    let itemRemoved = arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, itemRemoved[0]);
    return arr;
  };

  let setBusRouteAdvanced = (value) => {
    if (selectedBusRoute === value) {
      setSelectedBusRoute("");
    } else {
      setSelectedBusRoute(value);
    }
  };

  let setBusRouteAdvancedBottomSheet = (value) => {
    if (selectedBusRoute === value) {
      setSelectedBusRoute("");
    } else {
      setSelectedBusRoute(value);

      busRoutes?.map((item, index) => {
        if (item._id === value) {
          const newArray = moveItem(busRoutes, index, 0);
          setBusRoutes(newArray);
        }
      });
    }
    refRBSheet.current.close();
  };

  useEffect(() => {
    setSearchAdvanced(searchInput);
  }, [selectedBusRoute]);

  let setSearchAdvanced = (value) => {
    setSearchInput(value);

    let routeWiseFilteredData = [];
    if (selectedBusRoute) {
      routeWiseFilteredData = busTimings.filter((item) => {
        return item.route._id === selectedBusRoute;
      });
    } else {
      routeWiseFilteredData = busTimings;
    }
    if (value) {
      const lowercasedFilter = value.toLowerCase();
      let filteredData = routeWiseFilteredData.filter((item) => {
        return (
          item.name.toLowerCase().includes(lowercasedFilter) ||
          item.route.from.toLowerCase().includes(lowercasedFilter) ||
          item.route.to.toLowerCase().includes(lowercasedFilter) ||
          (item.malayalamName &&
            item.malayalamName.includes(lowercasedFilter)) ||
          (item.route.fromMalayalam &&
            item.route.fromMalayalam.includes(lowercasedFilter)) ||
          (item.route.toMalayalam &&
            item.route.toMalayalam.includes(lowercasedFilter))
        );
      });
      setFilteredBusTimings(filteredData);
    } else {
      setFilteredBusTimings(routeWiseFilteredData);
    }
  };

  let cancelInput = () => {
    Keyboard.dismiss();
    setShowCancel(false);
    setSearchInput("");
    setFilteredBusTimings(busTimings);
  };

  let items = filteredBusTimings;

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

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
          data={busRoutes}
          renderItem={({ item }) => (
            <View style={{ padding: 10, marginTop: 0 }}>
              <TouchableOpacity
                style={[
                  styles.categoryBadge,
                  // {
                  //   backgroundColor:
                  //     selectedBusRoute === item._id
                  //       ? colours[getRandomInt(6)]
                  //       : "white",
                  // },
                ]}
                onPress={() => setBusRouteAdvanced(item._id)}
              >
                <Text
                  style={[
                    styles.categoryBadgeText,
                    {
                      color: "black",
                    },
                  ]}
                >
                  {item.fromMalayalam ? item.fromMalayalam : item.from}
                  &#8644;
                  {item.toMalayalam ? item.toMalayalam : item.to}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        {busRoutes?.length !== 0 && (
          <TouchableOpacity
            style={styles.categoryMore}
            onPress={() => refRBSheet.current.open()}
          >
            <Text style={styles.categoryMoreText}>എല്ലാ ബസ് റൂട്ടുകളും</Text>
            <Icon
              style={styles.categoryMoreIcon}
              name="arrow-forward-outline"
            />
          </TouchableOpacity>
        )}
      </View>
      <Content style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            {/* <Spinner color={colours[getRandomInt(6)]} /> */}
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <List>
              {items.map((item, index) => {
                return (
                  <ListItem key={index}>
                    <Left>
                      <Body>
                        <Text>
                          {item.malayalamName ? item.malayalamName : item.name}
                          &nbsp;
                        </Text>
                        {item.route ? (
                          <Text note>
                            {item.route.fromMalayalam
                              ? item.route.fromMalayalam
                              : item.route.from}
                            &rarr;
                            {item.route.toMalayalam
                              ? item.route.toMalayalam
                              : item.route.to}
                          </Text>
                        ) : null}
                      </Body>
                    </Left>
                    <Right>
                      <Text style={styles.time}>{item.expectedTime}</Text>
                      <Text note style={styles.parambath}>
                        പറമ്പത്ത് സ്റ്റോപ്പ്
                      </Text>
                    </Right>
                  </ListItem>
                );
              })}
            </List>
          </View>
        )}

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={height - 160}
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
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={busRoutes}
              renderItem={({ item }) => (
                <View style={{ padding: 10, marginTop: 0 }}>
                  <TouchableOpacity
                    style={[
                      styles.categoryExpItem,
                      // {
                      //   backgroundColor:
                      //     selectedBusRoute === item._id
                      //       ? colours[getRandomInt(6)]
                      //       : "white",
                      // },
                    ]}
                    onPress={() => setBusRouteAdvancedBottomSheet(item._id)}
                  >
                    <Text
                      style={[
                        styles.categoryExpItemText,
                        {
                          color: "black",
                        },
                      ]}
                    >
                      {item.fromMalayalam ? item.fromMalayalam : item.from}
                      &#8644;
                      {item.toMalayalam ? item.toMalayalam : item.to}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>
        </RBSheet>
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
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  parambath: {
    fontSize: 8,
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
  categoryExpItem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    padding: 10,
  },
  categoryExpItemText: {},
});
