import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import { Text, Spinner, Box, ScrollView, List, Row } from "native-base";
import { EvilIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import onShare from "../../../utils/on-share";
import openBrowser from "../../../utils/open-browser";
import callToTheNumber from "../../../utils/call-to-number";
import Slider from "../common/slider";
import { loadEventDetails } from "../../../apiService";
import moment from "moment";

export default function MainEventComponent(props: any) {
  let [eventDetails, setEventDetails] = useState<any>({
    itemCategory: {},
  });
  const [loading, setLoading] = useState(false);

  const type = props.route.params.type;
  const itemId = props.route.params.itemId;

  let typeCategory = "";

  useEffect(() => {
    loadEventDetailsFromApi();
  }, []);

  const loadEventDetailsFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadEventDetails({
      id: itemId,
      type: type,
    });
    if (response) {
      setEventDetails(response?.data?.attributes);
      setLoading(false);
    }
  };

  return (
    <Box mt={2} padding={5}>
      <SafeAreaView>
        <ScrollView>
          {loading ? (
            <View style={styles.loader}>
              <Spinner color="#1c1b29" />
            </View>
          ) : (
            <View
              style={{
                marginTop: 50,
              }}
            >
              {eventDetails?.images?.data &&
              eventDetails?.images?.data?.length !== 0 ? (
                <Slider images={eventDetails?.images?.data} />
              ) : null}
              <View style={[styles.sectionContainer]}>
                <View style={styles.shareButtonContainer}>
                  <TouchableOpacity
                    onPress={() => onShare(eventDetails, typeCategory)}
                    style={styles.shareButton}
                  >
                    <EvilIcons
                      name="share-apple"
                      color="#2b2b2b"
                      style={styles.shareIcon}
                    />
                    <Text style={styles.shareText}>Share</Text>
                  </TouchableOpacity>
                </View>
                {eventDetails.name ? (
                  <Text style={styles.title}>
                    {eventDetails.nameMalayalam
                      ? eventDetails.nameMalayalam
                      : eventDetails.name}
                    &nbsp;
                  </Text>
                ) : null}
                {eventDetails[typeCategory] ? (
                  <Text style={styles.workName}>
                    {eventDetails[typeCategory]?.data?.attributes?.nameMalayalam
                      ? eventDetails[typeCategory]?.data?.attributes
                          ?.nameMalayalam
                      : eventDetails[typeCategory]?.data?.attributes?.name}
                    &nbsp;
                  </Text>
                ) : null}

                {eventDetails.about ? (
                  <Text style={styles.aboutText}>{eventDetails.about}</Text>
                ) : null}

                {eventDetails.description ? (
                  <Text style={styles.aboutText}>
                    {eventDetails.description}
                  </Text>
                ) : null}

                {eventDetails.youtube ? (
                  <TouchableOpacity
                    style={[styles.video]}
                    onPress={() => Linking.openURL(eventDetails.youtube)}
                  >
                    <Ionicons name="logo-youtube" size={20} color="#2b2b2b" />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{}}>സഹായക വീഡിയോ കാണു</Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {eventDetails.url ? (
                  <TouchableOpacity
                    style={[styles.booking]}
                    onPress={() =>
                      openBrowser({
                        url: eventDetails.website
                          ? eventDetails.website
                          : eventDetails.url,
                      })
                    }
                  >
                    <Ionicons name="globe-outline" size={20} color="#2b2b2b" />
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 10,
                      }}
                    >
                      <Text style={styles.value}>വെബ്സൈറ്റ് സന്ദർശിക്കൂ</Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {eventDetails.from || eventDetails.to ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="#2b2b2b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.value}>
                        {moment(eventDetails.from).format("DD MMM YYYY")} -{" "}
                        {moment(eventDetails.to).format("DD MMM YYYY")}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {eventDetails.phoneNumber ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="call-outline" size={20} color="#2b2b2b" />
                    </View>
                    <TouchableOpacity
                      style={styles.textContainer}
                      onPress={() => callToTheNumber(eventDetails.phoneNumber)}
                    >
                      <Text>ഫോൺ നമ്പർ</Text>
                      <Text style={styles.value}>
                        {eventDetails.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {eventDetails.phoneNumber2 ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="call-outline" size={20} color="#2b2b2b" />
                    </View>
                    <TouchableOpacity
                      style={styles.textContainer}
                      onPress={() => callToTheNumber(eventDetails.phoneNumber2)}
                    >
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>ഫോൺ നമ്പർ</Text>
                        <Text
                          style={{
                            fontSize: 10,
                            marginLeft: 5,
                          }}
                        >
                          (2)
                        </Text>
                      </View>
                      <Text style={styles.value}>
                        {eventDetails.phoneNumber2}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {eventDetails.email ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <MaterialIcons
                        name="alternate-email"
                        size={20}
                        color="#2b2b2b"
                      />
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
                        <Text>ഇമെയിൽ</Text>
                      </View>
                      <Text style={styles.value}>{eventDetails.email}</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {eventDetails.place ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color="#2b2b2b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>സ്ഥലം</Text>
                      </View>
                      <Text style={styles.value}>{eventDetails.place}</Text>
                    </View>
                  </View>
                ) : null}

                {eventDetails.address ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="mail-outline" size={20} color="#2b2b2b" />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>മേൽവിലാസം</Text>
                      </View>
                      <Text style={styles.value}>{eventDetails.address}</Text>
                    </View>
                  </View>
                ) : null}

                {eventDetails.upi || eventDetails.card ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="wallet-outline"
                        size={20}
                        color="#2b2b2b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text>ഓൺലൈൻ പേയ്മെന്റ്</Text>
                      </View>
                      <View style={{}}>
                        {eventDetails.upi ? (
                          <Text style={styles.value}>
                            യുപിഐ&nbsp;
                            <Text
                              style={{
                                fontSize: 10,
                              }}
                            >
                              (ഗൂഗിൾ പേ/ഫോൺ പേ)
                            </Text>
                          </Text>
                        ) : null}
                        {eventDetails.card ? (
                          <Text style={styles.value}>
                            ക്രെഡിറ്റ്/ഡെബിറ്റ് കാർഡ്
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                ) : null}

                {eventDetails.vehicleNumber ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="clipboard-outline"
                        size={20}
                        color="#2b2b2b"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text>വണ്ടി നമ്പർ</Text>
                      <Text style={styles.value}>
                        {eventDetails.vehicleNumber}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {eventDetails.onlineBookingUrl ? (
                  <TouchableOpacity
                    style={[styles.booking]}
                    onPress={() =>
                      openBrowser({
                        url: eventDetails.onlineBookingUrl,
                      })
                    }
                  >
                    <Ionicons
                      name="phone-portrait-outline"
                      size={20}
                      color="#2b2b2b"
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
                  {eventDetails.whatsapp ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?phone=${eventDetails.whatsapp}`
                        )
                      }
                    >
                      <Ionicons
                        name="logo-whatsapp"
                        size={20}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {eventDetails.website ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        openBrowser({
                          url: eventDetails.website,
                        })
                      }
                    >
                      <Ionicons
                        name="globe-outline"
                        size={20}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {eventDetails.facebook ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.canOpenURL(
                          `fb://page/${eventDetails.facebook}`
                        ).then((supported) => {
                          let facebookUrlIsId = /^\d+$/.test(
                            eventDetails.facebook
                          );

                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${eventDetails.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${eventDetails.facebook}`
                            );
                          }
                        })
                      }
                    >
                      <Ionicons
                        name="logo-facebook"
                        size={20}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {eventDetails.instagram ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() => Linking.openURL(eventDetails.instagram)}
                    >
                      <Ionicons
                        name="logo-instagram"
                        size={20}
                        color="#2b2b2b"
                      />
                    </TouchableOpacity>
                  ) : null}

                  {eventDetails.youtube ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() => Linking.openURL(eventDetails.youtube)}
                    >
                      <Ionicons name="logo-youtube" size={20} color="#2b2b2b" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>

              {eventDetails?.schedule ? (
                <>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 18,
                    }}
                  >
                    കാര്യപരിപാടികൾ
                  </Text>
                  <View style={styles.sheduleContainer}>
                    {eventDetails?.schedule.map(
                      (shedule: any, sheduleIndex: number) => {
                        return (
                          <View key={sheduleIndex}>
                            <View
                              style={{
                                marginTop: 10,
                                marginBottom: 10,
                                backgroundColor: "#2b2b2b",
                                borderRadius: 5,
                                padding: 10,
                                opacity: 0.99,
                              }}
                            >
                              <Text
                                style={{
                                  textAlign: "left",
                                  fontSize: 15,
                                  fontWeight: "bold",
                                  color: "white",
                                }}
                              >
                                {shedule.day}
                              </Text>
                              <Text
                                style={{
                                  textAlign: "left",
                                  color: "white",
                                }}
                              >
                                {shedule.title}
                              </Text>
                            </View>
                            {shedule.scheduleDay.map(
                              (item: any, daySheduleIndex: number) => {
                                return (
                                  <View
                                    key={daySheduleIndex}
                                    style={{
                                      marginTop: 10,
                                    }}
                                  >
                                    <View
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignContent: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <View
                                        style={{
                                          display: "flex",
                                          flexDirection: "row",
                                          marginBottom: 10,
                                        }}
                                      >
                                        <View
                                          style={{
                                            marginRight: 8,
                                            paddingTop: 0,
                                          }}
                                        >
                                          <EvilIcons
                                            name="clock"
                                            size={20}
                                            color="#2b2b2b"
                                          />
                                        </View>
                                        <View
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                          }}
                                        >
                                          <Text
                                            fontSize={14}
                                            style={{
                                              color: "#383838",
                                            }}
                                          >
                                            {item.time}
                                          </Text>
                                          <Text> - </Text>
                                          <Text bold fontSize={15}>
                                            {item.title}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                    {item.description && (
                                      <Text
                                        style={{
                                          marginBottom: 10,
                                          color: "#383838",
                                          fontSize: 12,
                                        }}
                                      >
                                        {item.description}
                                      </Text>
                                    )}
                                  </View>
                                );
                              }
                            )}
                          </View>
                        );
                      }
                    )}
                  </View>
                </>
              ) : null}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  iconContainer: {},
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
    marginTop: 120,
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
  textContainer: {
    marginLeft: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#2b2b2b",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 10,
  },
  workName: {
    fontSize: 17,
    textAlign: "center",
    color: "#595959",
  },
  value: {
    fontSize: 16,
    color: "#2b2b2b",
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
  video: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  shareButtonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  shareButton: {
    marginTop: -17,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    // borderColor: "#969696",
    borderRadius: 5,
    padding: 8,
    paddingTop: 2,
    paddingRight: 12,
    paddingBottom: 6,
    backgroundColor: "#1c1b29",
  },
  shareIcon: {
    fontSize: 20,
    marginRight: 5,
    color: "white",
  },
  shareText: {
    color: "white",
    fontSize: 14,
    marginLeft: 3,
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
    backgroundColor: "white",
  },
});
