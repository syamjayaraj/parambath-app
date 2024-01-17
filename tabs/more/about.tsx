import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Box, ScrollView, Text } from "native-base";
import * as WebBrowser from "expo-web-browser";
import appJson from "../../app.json";

export default function Autos() {
  const openBrowser = async (params: any) => {
    try {
      let { url } = params;
      let result = await WebBrowser.openBrowserAsync(url);
    } catch (err: any) {}
  };

  return (
    <Box>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/logo.png")}
                style={styles.logo}
              />
            </View>
            <View>
              <View>
                <Text style={styles.title}>പറമ്പത്ത്</Text>
                <TouchableOpacity
                  onPress={() =>
                    openBrowser({
                      url: "https://onnich.com",
                    })
                  }
                >
                  <Text style={styles.subTitle}>
                    Powered by&nbsp;
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 13,
                      }}
                    >
                      ONNICH
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.copyRightContainer}>
                <TouchableOpacity
                  onPress={() =>
                    openBrowser({
                      url: "https://floyet.com",
                    })
                  }
                >
                  <Text style={styles.copyRight}>
                    {"\u00A9"} 2018-2024 FLOYET Labs & Technologies
                  </Text>
                </TouchableOpacity>
                <Text style={styles.copyRight}>All rights reserved</Text>

                <Text style={styles.version}>
                  Version {appJson?.expo?.version}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: "40%",
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#2b2b2b",
    textAlign: "center",
    marginTop: 15,
    paddingTop: 30,
  },
  subTitle: {
    textAlign: "center",
    marginTop: -10,
    paddingLeft: 20,
    fontSize: 12,
  },
  copyRightContainer: {
    marginTop: 20,
  },
  copyRight: {
    fontSize: 15,
    color: "#2b2b2b",
    textAlign: "center",
    marginTop: 0,
  },
  version: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#2b2b2b",
    textAlign: "center",
    marginTop: 7,
  },
});
