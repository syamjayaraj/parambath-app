import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Linking,
  Button,
  Share,
} from "react-native";
import axios from "axios";
import { Container, Content, Text, Icon, Spinner } from "native-base";
import { apiUrl } from "../../config";
import call from "react-native-phone-call";
import Carousel from "react-native-snap-carousel";
import * as WebBrowser from "expo-web-browser";
import colours from "../../const/colours";

const { width } = Dimensions.get("window");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export default function Autos(props) {
  let [item, setItem] = useState({
    itemCategory: {},
  });

  let [loading, setLoading] = useState(false);

  let itemCategoryProp = props.route.params.itemCategory;
  let urlProp = props.route.params.url;

  useEffect(() => {
    fetchAutoDetails();
  }, []);

  let fetchAutoDetails = async () => {
    let { itemId } = props.route.params;
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/${urlProp}/${itemId}`);
      if (response && response.data && response.data.status == 200) {
        setItem(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err) {
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
    } catch (err) {}
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
      let result = await WebBrowser.openAuthSessionAsync(url, url, {
        showInRecents: true,
      });
    } catch (err) {}
  };

  const onShare = async () => {
    console.warn(item.url, "item");
    try {
      let sharableString = `${
        item.malayalamName
          ? item.malayalamName
          : item.malayalamTitle
          ? item.malayalamTitle
          : item.name
          ? item.name
          : item.title
          ? item.title
          : ""
      }${
        item[itemCategoryProp].malayalamName
          ? ", " + item[itemCategoryProp].malayalamName
          : ", " + item[itemCategoryProp].name
      }${item?.place ? ", " + item.place : ""} - ${
        item.ownerMalayalamName
          ? "ഉടമ: " + item.ownerMalayalamName + ", "
          : item.owner
          ? "ഉടമ: " + item.owner + ", "
          : ""
      }${item?.phoneNumber ? "ഫോൺ നമ്പർ:" + item?.phoneNumber : ""}${
        item?.phoneNumber2 ? ", ഫോൺ നമ്പർ(2):" + item?.phoneNumber2 : ""
      }${item.url ? ", വെബ്സൈറ്റ്: " + item.url : ""}`;

      const result = await Share.share({
        message: sharableString,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Content style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View>
            {item.images && item.images.length !== 0 ? (
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
                data={item.images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={_renderItem}
              />
            ) : null}
            <View
              style={[
                styles.sectionContainer,
                item.isPremium
                  ? {
                      borderColor: "#FFA507",
                    }
                  : null,
              ]}
            >
              {item.isPremium ? (
                <Image
                  source={require("../../assets/icons/premium.png")}
                  style={styles.badge}
                />
              ) : null}
              <View style={styles.shareButtonContainer}>
                <TouchableOpacity onPress={onShare} style={styles.shareButton}>
                  <Icon name="share-outline" style={styles.shareIcon} />
                  <Text style={styles.shareText}>Share</Text>
                </TouchableOpacity>
              </View>
              {item.name || item.title ? (
                <Text style={styles.title}>
                  {item.malayalamName
                    ? item.malayalamName
                    : item.malayalamTitle
                    ? item.malayalamTitle
                    : item.name
                    ? item.name
                    : item.title}
                  &nbsp;
                </Text>
              ) : null}
              {item[itemCategoryProp] ? (
                <Text note style={styles.workName}>
                  {item[itemCategoryProp].malayalamName
                    ? item[itemCategoryProp].malayalamName
                    : item[itemCategoryProp].name}
                  &nbsp;
                </Text>
              ) : null}

              {item.about ? (
                <Text style={styles.aboutText}>{item.about}</Text>
              ) : null}

              {item.description ? (
                <Text style={styles.aboutText}>{item.description}</Text>
              ) : null}

              {(urlProp === "notification" || urlProp === "online-service") &&
              item.youtube ? (
                <TouchableOpacity
                  style={[styles.video]}
                  onPress={() => Linking.openURL(item.youtube)}
                >
                  <Icon name="logo-youtube" style={styles.bookingIcon} />

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

              {(urlProp === "notification" && item.website) || item.url ? (
                <TouchableOpacity
                  style={[styles.booking]}
                  onPress={() =>
                    openBrowser({
                      url: item.website ? item.website : item.url,
                    })
                  }
                >
                  <Icon name="globe-outline" style={styles.bookingIcon} />

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

              {item.opensAt && item.closesAt ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="time-outline" style={styles.icon} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>പ്രവൃത്തി സമയം</Text>
                    <Text style={styles.value}>
                      {item.opensAt}-{item.closesAt}
                    </Text>
                  </View>
                </View>
              ) : null}

              {item.owner ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="person-outline" style={styles.icon} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>ഉടമ</Text>
                    <Text style={styles.value}>
                      {item.ownerMalayalamName
                        ? item.ownerMalayalamName
                        : item.owner}
                    </Text>
                  </View>
                </View>
              ) : null}
              {item.from || item.to ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="calendar-outline" style={styles.icon} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>കാലാവധി</Text>
                    <Text style={styles.value}>
                      {item.from} - {item.to}
                    </Text>
                  </View>
                </View>
              ) : null}

              {item.phoneNumber ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="call-outline" style={styles.icon} />
                  </View>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => callToTheNumber(item.phoneNumber)}
                  >
                    <Text style={styles.label}>ഫോൺ നമ്പർ</Text>
                    <Text style={styles.value}>{item.phoneNumber}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {item.phoneNumber2 ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="call-outline" style={styles.icon} />
                  </View>
                  <TouchableOpacity
                    style={styles.textContainer}
                    onPress={() => callToTheNumber(item.phoneNumber2)}
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
                    <Text style={styles.value}>{item.phoneNumber2}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {item.email ? (
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
                    <Text style={styles.value}>{item.email}</Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {item.place ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="location-outline" style={styles.icon} />
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
                    <Text style={styles.value}>{item.place}</Text>
                  </View>
                </View>
              ) : null}

              {item.address ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="mail-outline" style={styles.icon} />
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
                    <Text style={styles.value}>{item.address}</Text>
                  </View>
                </View>
              ) : null}

              {item.upi || item.card ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="wallet-outline" style={styles.icon} />
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
                      {item.upi ? (
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
                      {item.card ? (
                        <Text style={styles.value}>
                          ക്രെഡിറ്റ്/ഡെബിറ്റ് കാർഡ്
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              ) : null}

              {item.vehicleNumber ? (
                <View style={styles.section}>
                  <View style={styles.iconContainer}>
                    <Icon name="clipboard-outline" style={styles.icon} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.label}>വണ്ടി നമ്പർ</Text>
                    <Text style={styles.value}>{item.vehicleNumber}</Text>
                  </View>
                </View>
              ) : null}

              {item.onlineBookingUrl ? (
                <TouchableOpacity
                  style={[
                    styles.booking,
                    item.isPremium
                      ? {
                          borderColor: "#FFA507",
                        }
                      : null,
                  ]}
                  onPress={() =>
                    openBrowser({
                      url: item.onlineBookingUrl,
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
                {item.whatsapp ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.openURL(`whatsapp://send?phone=${item.whatsapp}`)
                    }
                  >
                    <Icon name="logo-whatsapp" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {urlProp !== "notification" && item.website ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      openBrowser({
                        url: item.website,
                      })
                    }
                  >
                    <Icon name="globe-outline" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {item.facebook ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() =>
                      Linking.canOpenURL(`fb://page/${item.facebook}`).then(
                        (supported) => {
                          let facebookUrlIsId = /^\d+$/.test(item.facebook);

                          if (supported && facebookUrlIsId) {
                            return Linking.openURL(
                              `fb://page/${item.facebook}`
                            );
                          } else {
                            return Linking.openURL(
                              `https://www.facebook.com/${item.facebook}`
                            );
                          }
                        }
                      )
                    }
                  >
                    <Icon name="logo-facebook" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {item.instagram ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(item.instagram)}
                  >
                    <Icon name="logo-instagram" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}

                {urlProp !== "notification" &&
                urlProp !== "online-service" &&
                item.youtube ? (
                  <TouchableOpacity
                    style={styles.footerIconContainer}
                    onPress={() => Linking.openURL(item.youtube)}
                  >
                    <Icon name="logo-youtube" style={styles.footerIcon} />
                  </TouchableOpacity>
                ) : null}
              </View>
              {/* {item.isPremium ? (
                <View style={styles.premiumMessageContainer}>
                  <Text style={styles.premiumMessage}>പ്രീമിയം</Text>
                </View>
              ) : null} */}
            </View>
          </View>
        )}
      </Content>
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
    marginBottom: 100,
    marginTop: 20,
    borderColor: "#e3e3e3",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
    // backgroundColor: colours[getRandomInt(6)],
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
