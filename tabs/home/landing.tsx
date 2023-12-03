import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";

import { Box, Text, ScrollView } from "native-base";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { apiUrl } from "../../config";

const { width } = Dimensions.get("window");

export default function Landing(props: any) {
  const [carousel, setCarousel] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCarousel();
  }, []);

  let fetchCarousel = async () => {
    setLoading(true);
    try {
      let response = await axios.get(`${apiUrl}/carousel/list/Home`);
      if (response && response.data && response.data.status == 200) {
        setCarousel(response.data.data);
        fetchSettings();
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let fetchSettings = async () => {
    try {
      let response = await axios.get(`${apiUrl}/settings`);
      if (response && response.data && response.data.status == 200) {
        setSettings(response.data.data);
      } else {
      }
    } catch (err: any) {}
  };

  let _renderItem = ({ item, index }: any) => {
    let itemImage = item.image;
    let url = "";
    let itemCategory = "";

    if (item.linkType == "Business") {
      url = "business";
      itemCategory = "businessCategory";
    } else if (item.linkType == "Auto") {
      url = "auto";
      itemCategory = "autoStand";
    } else if (item.linkType == "Vehicle") {
      url = "vehicle";
      itemCategory = "vehicleCategory";
    } else if (item.linkType == "Worker") {
      url = "worker";
      itemCategory = "workCategory";
    } else if (item.linkType == "Emergency") {
      url = "emergency";
      itemCategory = "emergencyCategory";
    } else if (item.linkType == "Representative") {
      url = "representative";
      itemCategory = "representativeCategory";
    } else if (item.linkType == "Enterprise") {
      url = "enterprise";
      itemCategory = "businessCategory";
    } else if (item.linkType == "OnlineService") {
      url = "online-service";
      itemCategory = "onlineServiceCategory";
    }

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          props.navigation.navigate(item.linkType, {
            itemId: item.link,
            url: url,
            itemCategory: itemCategory,
            categoryUrl: "auto-stand",
            placeHolderImage: "auto",
            main: "Auto",
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

  return (
    <Box bg={"white"} pt={12}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>പറമ്പത്ത് ആപ്പ് </Text>
          </View>

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
          ) : (
            <View>
              <Carousel
                showsHorizontalScrollIndicator={true}
                loop={true}
                autoplay={true}
                autoplayInterval={2500}
                autoplayDelay={1000}
                layout={"default"}
                data={carousel}
                sliderWidth={width}
                itemWidth={width}
                renderItem={_renderItem}
              />
            </View>
          )}

          <View style={styles.container}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Businesses", {
                    url: "business",
                    categoryUrl: "business-category",
                    placeHolderImage: "business",
                    itemCategory: "businessCategory",
                    main: "Business",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/business.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>സ്ഥാപനങ്ങൾ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Autos", {
                    url: "auto",
                    categoryUrl: "auto-stand",
                    placeHolderImage: "auto",
                    itemCategory: "autoStand",
                    main: "Auto",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/auto.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ഓട്ടോ റിക്ഷ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() => props.navigation.navigate("BusTimings")}
              >
                <Image
                  source={require("../../assets/icons/bus.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ബസ് സമയം</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Vehicles", {
                    url: "vehicle",
                    categoryUrl: "vehicle-category",
                    placeHolderImage: "vehicle",
                    itemCategory: "vehicleCategory",
                    main: "Vehicle",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/lorry.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>മറ്റു വാഹനങ്ങൾ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Workers", {
                    url: "worker",
                    categoryUrl: "work-category",
                    placeHolderImage: "worker",
                    itemCategory: "workCategory",
                    main: "Worker",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/worker.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ജോലിക്കാർ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Emergencies", {
                    url: "emergency",
                    categoryUrl: "emergency-category",
                    placeHolderImage: "emergency",
                    itemCategory: "emergencyCategory",
                    main: "Emergency",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/ambulance.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>അത്യാഹിതം</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Representatives", {
                    url: "representative",
                    categoryUrl: "representative-category",
                    placeHolderImage: "representative",
                    itemCategory: "representativeCategory",
                    main: "Representative",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/rep.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ജന പ്രതിനിധികൾ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Enterprises", {
                    url: "enterprise",
                    categoryUrl: "enterprise-category",
                    placeHolderImage: "enterprise",
                    itemCategory: "businessCategory",
                    main: "Enterprise",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/enterprise.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ചെറു സംരംഭങ്ങൾ</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("OnlineServices", {
                    url: "online-service",
                    categoryUrl: "online-service-category",
                    placeHolderImage: "onlineService",
                    itemCategory: "onlineServiceCategory",
                    main: "OnlineService",
                  })
                }
              >
                <Image
                  source={require("../../assets/icons/onlineService.png")}
                  style={styles.icon}
                />
                <Text style={styles.menuCardText}>ഓൺലൈൻ സേവനങ്ങൾ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // marginTop: 100,
    marginRight: 0,
    width: 400,
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    marginLeft: 10,
    paddingTop: 17,
  },
  container: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  menu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    flex: 3,
    flexWrap: "wrap",
    padding: 5,
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "30%",
    height: 80,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    elevation: 0.2,
  },
  iconContainer: {
    backgroundColor: "white",
    // borderRadius: "50%",
    padding: 15,
  },
  icon: {
    width: 35,
    height: 35,
  },
  menuCardText: {
    fontWeight: "normal",
    fontSize: 12,
    color: "#1f1f1f",
    textAlign: "center",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  sectionContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#f5f5f5",
    padding: 10,
  },
  sectionContent: {
    padding: 10,
  },
  sectionTitle: {
    fontWeight: "normal",
    fontSize: 17,
    marginTop: 20,
  },
});
