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
import { apiDomain } from "../../config";
import { loadSliderHome } from "../../apiService";
import { ISliderHome } from "../../models/model";
import Carousel from "react-native-snap-carousel";

const { width } = Dimensions.get("window");

export default function Landing(props: any) {
  const [slider, setSlider] = useState<ISliderHome[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSliderHomeFromApi();
  }, []);

  const loadSliderHomeFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadSliderHome();
    if (response) {
      setSlider(response?.data);
      setLoading(false);
    }
  };

  let _renderItem = ({ item, index }: any) => {
    let itemImage =
      apiDomain +
      item?.attributes?.image?.data?.attributes?.formats?.small?.url;

    let mainProp = "";
    let type = "";
    let id = "";

    if (item?.attributes?.business?.data !== null) {
      mainProp = "Business";
      type = "businesses";
      id = item?.attributes?.business?.data?.id;
    } else if (item?.attributes?.auto?.data !== null) {
      mainProp = "Auto";
      type = "autos";
      id = item?.attributes?.auto?.data?.id;
    } else if (item?.attributes?.emergency?.data !== null) {
      mainProp = "Emergency";
      type = "emergencies";
      id = item?.attributes?.emergency?.data?.id;
    } else if (item?.attributes?.small_business?.data !== null) {
      mainProp = "SmallBusiness";
      type = "small-businesses";
      id = item?.attributes?.small_business?.data?.id;
    } else if (item?.attributes?.small_business?.data !== null) {
      mainProp = "Worker";
      type = "workers";
      id = item?.attributes?.worker?.data?.id;
    } else if (item?.attributes?.online_service?.data !== null) {
      mainProp = "OnlineService";
      type = "online-services";
      id = item?.attributes?.online_service?.data?.id;
    } else if (item?.attributes?.vehicle?.data !== null) {
      mainProp = "Vehicle";
      type = "vehicles";
      id = item?.attributes?.vehicle?.data?.id;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          props?.navigation?.navigate(mainProp, {
            itemId: id,
            type: type,
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
              {slider?.length !== 0 && (
                <Carousel
                  showsHorizontalScrollIndicator={true}
                  loop={true}
                  autoplay={true}
                  autoplayInterval={2500}
                  autoplayDelay={1000}
                  layout={"default"}
                  data={slider}
                  sliderWidth={width}
                  itemWidth={width}
                  renderItem={_renderItem}
                />
              )}
            </View>
          )}

          <View style={styles.container}>
            <View style={styles.menu}>
              <TouchableOpacity
                style={styles.menuCard}
                onPress={() =>
                  props.navigation.navigate("Businesses", {
                    type: "businesses",
                    typeCategory: "business_category",
                    typeCategoryUrl: "business-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
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
                    type: "autos",
                    typeCategory: "auto_stand",
                    typeCategoryUrl: "auto-stands",
                    typeCategoryLabel: "ഓട്ടോ സ്റ്റാൻഡ്",
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
                onPress={() =>
                  props.navigation.navigate("BusTimings", {
                    type: "bus-timings",
                    typeCategory: "bus_route",
                    typeCategoryUrl: "bus-routes",
                    typeCategoryLabel: "ബസ് റൂട്ടുകൾ",
                    main: "BusTiming",
                  })
                }
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
                    type: "vehicles",
                    typeCategory: "vehicle_category",
                    typeCategoryUrl: "vehicle-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
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
                    type: "workers",
                    typeCategory: "work",
                    typeCategoryUrl: "works",
                    typeCategoryLabel: "ജോലികൾ",
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
                    type: "emergencies",
                    typeCategory: "emergency_category",
                    typeCategoryUrl: "emergency-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
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
                    type: "representatives",
                    typeCategory: "representative_category",
                    typeCategoryUrl: "representative-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
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
                  props.navigation.navigate("Businesses", {
                    type: "businesses",
                    typeCategory: "business_category",
                    typeCategoryUrl: "business-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
                    main: "Business",
                    extra: "small",
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
                    type: "online-services",
                    typeCategory: "online_service_category",
                    typeCategoryUrl: "online-service-categories",
                    typeCategoryLabel: "കാറ്റഗറി",
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
    color: "#2b2b2b",
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
