import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";

import { Container, Content, Text, Icon } from "native-base";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import { apiUrl } from "../../config";
import * as WebBrowser from "expo-web-browser";
import * as Notifications from "expo-notifications";

const { width } = Dimensions.get("window");

export default function Home(props) {
  const [carousel, setCarousel] = useState([]);
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    fetchCarousel();
    handleNotificationClick();
  }, []);

  let handleNotificationClick = () => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((response) => {
        if (
          response &&
          response.notification &&
          response.notification.request &&
          response.notification.request.content &&
          response.notification.request.content.data
        ) {
          navigateToPageFromNotification(
            response.notification.request.content.data
          );
        }
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (
          response &&
          response.notification &&
          response.notification.request.content &&
          response.notification.request.content &&
          response.notification.request.content.data
        ) {
          navigateToPageFromNotification(
            response.notification.request.content.data
          );
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  };

  let navigateToPageFromNotification = (data) => {
    props.navigation.navigate(data.page, {
      itemId: data.itemId,
      url: data.url,
      itemCategory: data.itemCategory,
      categoryUrl: data.categoryUrl,
      placeHolderImage: data.placeHolderImage,
      main: data.main,
    });
  };

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
    } catch (err) {
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
    } catch (err) {}
  };

  let _renderItem = ({ item, index }) => {
    let itemImage = item.image;
    // .replace(
    //   new RegExp("upload", "g"),
    //   `upload/c_thumb,w_${2 * (width - 50)},h_400`
    // );
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
    <Container>
      <Content>
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
          </View>
        )}

        <View style={styles.container}>
          <View style={styles.menu}>
            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#FEF5E5",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/business.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>സ്ഥാപനങ്ങൾ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#CFECF4",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/auto.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ഓട്ടോ റിക്ഷ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#EAE7F9",
                },
              }}
              onPress={() => props.navigation.navigate("BusTimings")}
            >
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/bus.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ബസ് സമയം</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#FBECEA",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/lorry.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>മറ്റു വാഹനങ്ങൾ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#DAD5CB",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/worker.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ജോലിക്കാർ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#E4F7F5",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/ambulance.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>അത്യാഹിതം</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#FBECEA",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/rep.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ജന പ്രതിനിധികൾ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#EAE7F9",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/enterprise.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ചെറു സംരംഭങ്ങൾ</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.menuCard,
                ...{
                  backgroundColor: "#CFECF4",
                },
              }}
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
              <View style={styles.iconContainer}>
                <Image
                  source={require("../../assets/icons/onlineService.png")}
                  style={styles.icon}
                />
              </View>
              <Text style={styles.menuCardText}>ഓൺലൈൻ സേവനങ്ങൾ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    color: "black",
    marginLeft: 10,
  },
  notificationContainer: {
    borderColor: "#f5f5f5",
    borderWidth: 1,
    borderRadius: 3,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationIconContainer: {
    marginRight: 20,
  },
  notificationText: {
    width: width - 90,
    textAlign: "left",
    fontSize: 12,
  },
  notificationTextSub: {
    textAlign: "left",
    fontSize: 12,
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
    flex: 2,
    flexWrap: "wrap",
    padding: 5,
  },
  menuCard: {
    borderWidth: 1,
    borderColor: "#f5f5f5",
    width: "48.5%",
    height: 200,
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 0.5,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
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
    fontWeight: "bold",
    fontSize: 15,
    color: "#1f1f1f",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 10,
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
