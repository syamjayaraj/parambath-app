import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  FlatList,
} from "react-native";
import axios from "axios";
import {
  Container,
  Text,
  Icon,
  Spinner,
  ListItem,
  Left,
  Body,
  List,
  Right,
} from "native-base";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import Carousel from "react-native-snap-carousel";
import * as WebBrowser from "expo-web-browser";
import colours from "../../const/colours";

const { width } = Dimensions.get("window");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default function Events(props: any) {
  let [event, setEvent] = useState({
    images: [],
    eventCategory: {},
  });
  let [eventYears, setEventYears] = useState([]);
  let [loading, setLoading] = useState(false);
  let [selectedYear, setSelectedYear] = useState("");
  let [eventShedule, setEventShedule] = useState("");

  useEffect(() => {
    fetchEventDetails();
  }, []);

  let fetchEventDetails = async () => {
    let { itemId } = props.route.params;
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/event/${itemId}/none/list`);
      if (response && response.data && response.data.status == 200) {
        setEventYears(response.data.data.eventYears);
        setEvent(response.data.data.event);
        setEventShedule(response.data.data.eventShedule);

        setSelectedYear(response.data.data.event.year);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let fetchEventWithYear = async (year) => {
    setSelectedYear(year);
    let { _id } = event.eventCategory;
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/event/${_id}/${year}/list`);
      if (response && response.data && response.data.status == 200) {
        setEventYears(response.data.data.eventYears);
        setEvent(response.data.data.event);
        setEventShedule(response.data.data.eventShedule);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  let callToTheNumber = async (phoneNumber) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: false,
      };
      await call(callArgs);
    } catch (err: any) {}
  };

  let _renderItem = ({ item, index }) => {
    let itemImage = item;
    //.replace(
    //      new RegExp("upload", "g"),
    //      `upload/c_thumb,w_${2 * (width - 50)},h_400`
    //    );
    return (
      <View
        style={{
          padding: 10,
        }}
      >
        <Image
          style={{
            width: width - 50,
            height: 250,
            borderRadius: 10,
          }}
          source={{
            uri: itemImage,
          }}
        ></Image>
      </View>
    );
  };

  const openBrowser = async (params) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err: any) {}
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <Container>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color={colours[getRandomInt(6)]} />
          </View>
        ) : (
          <View>
            {event.images && event.images.length !== 0 ? (
              <Carousel
                showsHorizontalScrollIndicator={true}
                indica
                loop={true}
                activeOpacity={1}
                autoplay={true}
                autoplayInterval={2500}
                autoplayDelay={1000}
                layout={"stack"}
                // ref={(ref) => (this.carousel = ref)}
                data={event.images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={_renderItem}
              />
            ) : null}

            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={eventYears}
              renderItem={({ item }) => (
                <View style={{ padding: 10, marginTop: 0 }}>
                  <TouchableOpacity
                    style={[
                      styles.categoryBadge,
                      {
                        backgroundColor:
                          selectedYear === item.year
                            ? colours[getRandomInt(6)]
                            : "white",
                      },
                    ]}
                    onPress={() => fetchEventWithYear(item.year)}
                  >
                    <Text
                      style={[
                        styles.categoryBadgeText,
                        {
                          color: "black",
                        },
                      ]}
                    >
                      {item.year}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />

            <View
              style={[
                styles.sectionContainer,
                event.isPremium
                  ? {
                      borderColor: "#FFA507",
                    }
                  : null,
              ]}
            >
              {event.isPremium ? (
                <Image
                  source={require("../../assets/icons/premium.png")}
                  style={styles.badge}
                />
              ) : null}
              <Text style={styles.title}>
                {event.malayalamName ? event.malayalamName : event.name}
              </Text>
              <Text note style={styles.workName}>
                {event.eventCategory.malayalamName
                  ? event.eventCategory.malayalamName
                  : event.eventCategory.name}
                &nbsp;
              </Text>

              {event.about ? (
                <Text style={styles.aboutText}>{event.about}</Text>
              ) : null}

              {event.owner ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="person-outline" style={styles.icon} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>ഉടമ</Text>
                    <Text style={styles.value}>
                      {event.ownerMalayalamName
                        ? event.ownerMalayalamName
                        : event.owner}
                    </Text>
                  </View>
                </View>
              ) : null}

              {event.phoneNumber ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="call-outline" style={styles.icon} />
                  </View>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => callToTheNumber(event.phoneNumber)}
                  >
                    <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                    <Text style={styles.value}>{event.phoneNumber}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {event.phoneNumber2 ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="call-outline" style={styles.icon} />
                  </View>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => callToTheNumber(event.phoneNumber2)}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                      <Text
                        note
                        style={{
                          fontSize: 10,
                          marginLeft: 5,
                        }}
                      >
                        (2)
                      </Text>
                    </View>
                    <Text style={styles.value}>{event.phoneNumber2}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {event.email ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="mail-outline" style={styles.icon} />
                  </View>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() =>
                      Linking.openURL("mailto:support@example.com")
                    }
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.label}>ഇമെയിൽ</Text>
                    </View>
                    <Text style={styles.value}>{event.email}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {event.onlineBookingUrl ? (
                <TouchableOpacity
                  style={[
                    styles.booking,
                    event.isPremium
                      ? {
                          borderColor: "#FFA507",
                        }
                      : null,
                  ]}
                  onPress={() =>
                    openBrowser({
                      url: event.onlineBookingUrl,
                    })
                  }
                >
                  <Icon
                    name="phone-portrait-outline"
                    style={styles.bookingIcon}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text style={styles.value}>ബുക്കിംഗ്/ഓർഡർ</Text>
                  </View>
                </TouchableOpacity>
              ) : null}

              <View style={styles.footer}>
                {event.whatsapp ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.openURL(`whatsapp://send?phone=${event.whatsapp}`)
                    }
                  >
                    <Icon name="logo-whatsapp" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {event.website ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      openBrowser({
                        url: event.website,
                      })
                    }
                  >
                    <Icon name="globe-outline" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {event.facebook ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.canOpenURL(`fb://page/${evant.facebook}`).then(
                        (supported) => {
                          let facebookUrlIsId = /^\d+$/.test(evant.facebook);

                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${evant.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${evant.facebook}`
                            );
                          }
                        }
                      )
                    }
                  >
                    <Icon name="logo-facebook" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {event.instagram ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(event.instagram)}
                  >
                    <Icon name="logo-instagram" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {event.youtube ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(event.youtube)}
                  >
                    <Icon name="logo-youtube" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}
              </View>
              {/* {event.isPremium ? (
                <View style={styles.premiumMessageContainer}>
                  <Text style={styles.premiumMessage}>പ്രീമിയം</Text>
                </View>
              ) : null} */}
            </View>

            {eventShedule && eventShedule.shedule ? (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                }}
              >
                കാര്യപരിപാടികൾ
              </Text>
            ) : null}

            {eventShedule && eventShedule.shedule ? (
              <View style={styles.sheduleContainer}>
                <List>
                  {eventShedule.shedule.map((shedule, sheduleIndex) => {
                    return (
                      <View key={sheduleIndex}>
                        <View
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            backgroundColor: "#f1f1f1",
                            borderRadius: 10,
                            padding: 10,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "left",
                              fontSize: 15,
                              fontWeight: "bold",
                            }}
                          >
                            {shedule.day}
                          </Text>
                          <Text
                            style={{
                              textAlign: "left",
                            }}
                          >
                            {shedule.title}
                          </Text>
                        </View>
                        {shedule.dayShedule.map((item, daySheduleIndex) => {
                          return (
                            <ListItem key={daySheduleIndex}>
                              <Left>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item.time}
                                </Text>
                                <Body>
                                  <Text>{item.title}</Text>
                                  <Text note>{item.description}</Text>
                                </Body>
                              </Left>
                            </ListItem>
                          );
                        })}
                      </View>
                    );
                  })}
                </List>
              </View>
            ) : null}
          </View>
        )}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  premiumMessageContainer: {
    marginTop: 50,
  },
  aboutText: {
    marginTop: 20,
    textAlign: "left",
  },
  premiumMessage: {
    textAlign: "center",
    color: "#FFA507",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 30,
    marginTop: 20,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    backgroundColor: colours[getRandomInt(6)],
  },
  sheduleContainer: {
    marginBottom: 100,
    marginTop: 20,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    backgroundColor: colours[getRandomInt(6)],
  },
  badge: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 0,
    right: 0,
  },

  section: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 23,
    color: "#969696",
  },
  textContainer: {
    marginLeft: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "black",
    textAlign: "center",
    marginTop: 15,
  },
  workName: {
    fontSize: 17,
    textAlign: "center",
    color: "#595959",
  },
  value: {
    fontSize: 17,
    color: "black",
  },
  label: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#969696",
  },
  container: {
    marginTop: 50,
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#F2F2FF",
  },

  menuCardText: {
    fontWeight: "normal",
    fontSize: 15,
    color: "#1f1f1f",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 21,
  },
  footer: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  footerIconContainer: {
    marginLeft: 15,
    marginRight: 15,
  },
  footerIcon: {
    fontSize: 30,
  },
  bookingIcon: {
    fontSize: 20,
  },
  booking: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 40,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#969696",
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
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
});
