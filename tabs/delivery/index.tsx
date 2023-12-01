import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListWithCarousel from "../components/list-with-carousel";
import Main from "../components/main";

const Stack = createStackNavigator();

function DeliveryComponent() {
  function HomeTitle() {
    return <Text style={styles.title}>പറമ്പത്ത്</Text>;
  }

  function OtherTitle(props: any) {
    return <Text style={styles.subTitle}>{props.name}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "white",
          elevation: 1,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={ListWithCarousel}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഓൺലൈൻ ഡെലിവറി" }} />
          ),
        }}
        initialParams={{
          carouselUrl: "Delivery",
          deliveryUrl: "business/delivery",
          url: "business",
          categoryUrl: "business-category/delivery",
          placeHolderImage: "business",
          itemCategory: "businessCategory",
          main: "Business",
        }}
      />

      <Stack.Screen
        name="Business"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeliveryComponent;
