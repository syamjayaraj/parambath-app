import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";
import { Text, Spinner, Box, ScrollView } from "native-base";
import { EvilIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import onShare from "../../../utils/on-share";
import openBrowser from "../../../utils/open-browser";
import callToTheNumber from "../../../utils/call-to-number";
import Slider from "../common/slider";
import * as apiService from "../../../api-service/index";

export default function MainComponent(props: any) {
  let [itemDetails, setItemDetails] = useState<any>({
    itemCategory: {},
  });
  const [loading, setLoading] = useState(false);
  const itemCategoryProp = props.route.params.itemCategory;
  const urlProp = props.route.params.url;
  let { itemId } = props.route.params;

  useEffect(() => {
    fetchItemDetails();
  }, []);

  let fetchItemDetails = async () => {
    try {
      setLoading(true);
      const response = await apiService?.fetchItemDetails(urlProp, itemId);
      if (response && response.data && response.data.status == 200) {
        setItemDetails(response?.data?.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  return (
    <Box pt={12} padding={5}>
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
              {itemDetails.images && itemDetails.images.length !== 0 ? (
                <Slider images={itemDetails?.images} />
              ) : null}
              <View style={[styles.sectionContainer]}>
                <View style={styles.shareButtonContainer}>
                  <TouchableOpacity
                    onPress={() => onShare(itemDetails, itemCategoryProp)}
                    style={styles.shareButton}
                  >
                    <EvilIcons
                      name="share-apple"
                      color="black"
                      style={styles.shareIcon}
                    />
                    <Text style={styles.shareText}>Share</Text>
                  </TouchableOpacity>
                </View>
                {itemDetails.name || itemDetails.title ? (
                  <Text style={styles.title}>
                    {itemDetails.malayalamName
                      ? itemDetails.malayalamName
                      : itemDetails.malayalamTitle
                      ? itemDetails.malayalamTitle
                      : itemDetails.name
                      ? itemDetails.name
                      : itemDetails.title}
                    &nbsp;
                  </Text>
                ) : null}
                {itemDetails[itemCategoryProp] ? (
                  <Text style={styles.workName}>
                    {itemDetails[itemCategoryProp].malayalamName
                      ? itemDetails[itemCategoryProp].malayalamName
                      : itemDetails[itemCategoryProp].name}
                    &nbsp;
                  </Text>
                ) : null}

                {itemDetails.about ? (
                  <Text style={styles.aboutText}>{itemDetails.about}</Text>
                ) : null}

                {itemDetails.description ? (
                  <Text style={styles.aboutText}>
                    {itemDetails.description}
                  </Text>
                ) : null}

                {(urlProp === "notification" || urlProp === "online-service") &&
                itemDetails.youtube ? (
                  <TouchableOpacity
                    style={[styles.video]}
                    onPress={() => Linking.openURL(itemDetails.youtube)}
                  >
                    <Ionicons name="logo-youtube" size={20} color="black" />
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

                {(urlProp === "notification" && itemDetails.website) ||
                itemDetails.url ? (
                  <TouchableOpacity
                    style={[styles.booking]}
                    onPress={() =>
                      openBrowser({
                        url: itemDetails.website
                          ? itemDetails.website
                          : itemDetails.url,
                      })
                    }
                  >
                    <Ionicons name="globe-outline" size={20} color="black" />
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

                {itemDetails.opensAt && itemDetails.closesAt ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="time-outline" size={20} color="black" />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>പ്രവൃത്തി സമയം</Text>
                      <Text style={styles.value}>
                        {itemDetails.opensAt}-{itemDetails.closesAt}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {itemDetails.owner ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      {/* <Ionicons name="person-outline" size={20} color="black" /> */}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>ഉടമ</Text>
                      <Text style={styles.value}>
                        {itemDetails.ownerMalayalamName
                          ? itemDetails.ownerMalayalamName
                          : itemDetails.owner}
                      </Text>
                    </View>
                  </View>
                ) : null}
                {itemDetails.from || itemDetails.to ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="calendar-outline"
                        size={20}
                        color="black"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>കാലാവധി</Text>
                      <Text style={styles.value}>
                        {itemDetails.from} - {itemDetails.to}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {itemDetails.phoneNumber ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="call-outline" size={20} color="black" />
                    </View>
                    <TouchableOpacity
                      style={styles.textContainer}
                      onPress={() => callToTheNumber(itemDetails.phoneNumber)}
                    >
                      <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                      <Text style={styles.value}>
                        {itemDetails.phoneNumber}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {itemDetails.phoneNumber2 ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="call-outline" size={20} color="black" />
                    </View>
                    <TouchableOpacity
                      style={styles.textContainer}
                      onPress={() => callToTheNumber(itemDetails.phoneNumber2)}
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
                          style={{
                            fontSize: 10,
                            marginLeft: 5,
                          }}
                        >
                          (2)
                        </Text>
                      </View>
                      <Text style={styles.value}>
                        {itemDetails.phoneNumber2}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {itemDetails.email ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <MaterialIcons name="email" style={styles.icon} />
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
                      <Text style={styles.value}>{itemDetails.email}</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}

                {itemDetails.place ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="location-outline" style={styles.icon} />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.label}>സ്ഥലം</Text>
                      </View>
                      <Text style={styles.value}>{itemDetails.place}</Text>
                    </View>
                  </View>
                ) : null}

                {itemDetails.address ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="mail-outline" size={20} color="black" />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.label}>മേൽവിലാസം</Text>
                      </View>
                      <Text style={styles.value}>{itemDetails.address}</Text>
                    </View>
                  </View>
                ) : null}

                {itemDetails.upi || itemDetails.card ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons name="wallet-outline" size={20} color="black" />
                    </View>
                    <View style={styles.textContainer}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text style={styles.label}>ഓൺലൈൻ പേയ്മെന്റ്</Text>
                      </View>
                      <View style={{}}>
                        {itemDetails.upi ? (
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
                        {itemDetails.card ? (
                          <Text style={styles.value}>
                            ക്രെഡിറ്റ്/ഡെബിറ്റ് കാർഡ്
                          </Text>
                        ) : null}
                      </View>
                    </View>
                  </View>
                ) : null}

                {itemDetails.vehicleNumber ? (
                  <View style={styles.section}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="clipboard-outline"
                        size={20}
                        color="black"
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.label}>വണ്ടി നമ്പർ</Text>
                      <Text style={styles.value}>
                        {itemDetails.vehicleNumber}
                      </Text>
                    </View>
                  </View>
                ) : null}

                {itemDetails.onlineBookingUrl ? (
                  <TouchableOpacity
                    style={[styles.booking]}
                    onPress={() =>
                      openBrowser({
                        url: itemDetails.onlineBookingUrl,
                      })
                    }
                  >
                    <Ionicons
                      name="phone-portrait-outline"
                      size={20}
                      color="black"
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
                  {itemDetails.whatsapp ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.openURL(
                          `whatsapp://send?phone=${itemDetails.whatsapp}`
                        )
                      }
                    >
                      <Ionicons name="logo-whatsapp" size={20} color="black" />
                    </TouchableOpacity>
                  ) : null}

                  {urlProp !== "notification" && itemDetails.website ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        openBrowser({
                          url: itemDetails.website,
                        })
                      }
                    >
                      <Ionicons name="globe-outline" size={20} color="black" />
                    </TouchableOpacity>
                  ) : null}

                  {itemDetails.facebook ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() =>
                        Linking.canOpenURL(
                          `fb://page/${itemDetails.facebook}`
                        ).then((supported) => {
                          let facebookUrlIsId = /^\d+$/.test(
                            itemDetails.facebook
                          );

                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${itemDetails.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${itemDetails.facebook}`
                            );
                          }
                        })
                      }
                    >
                      <Ionicons name="logo-facebook" size={20} color="black" />
                    </TouchableOpacity>
                  ) : null}

                  {itemDetails.instagram ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() => Linking.openURL(itemDetails.instagram)}
                    >
                      <Ionicons name="logo-instagram" size={20} color="black" />
                    </TouchableOpacity>
                  ) : null}

                  {urlProp !== "notification" &&
                  urlProp !== "online-service" &&
                  itemDetails.youtube ? (
                    <TouchableOpacity
                      style={styles.footerIconContainer}
                      onPress={() => Linking.openURL(itemDetails.youtube)}
                    >
                      <Ionicons name="logo-youtube" size={20} color="black" />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionContainer: {
    marginBottom: 100,
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
  icon: {
    fontSize: 25,
    // color: "#969696",
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
    paddingTop: 10,
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
    paddingTop: 4,
    paddingBottom: 4,
    backgroundColor: "#1c1b29",
  },
  shareIcon: {
    fontSize: 20,
    marginRight: 10,
    color: "white",
  },
  shareText: {
    color: "white",
    fontSize: 14,
    marginLeft: 3,
  },
});