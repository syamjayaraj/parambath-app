import React from "react";
import { StyleSheet, Text, Animated, Easing } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListWithCarousel from "../components/list-with-carousel";
import Event from "./event";

const Stack = createStackNavigator();

function EventComponent() {
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
            <OtherTitle {...{ name: "പരിപാടികൾ" }} />
          ),
        }}
        initialParams={{
          carouselUrl: "Event",
          url: "event-category",
          placeHolderImage: "event",
          itemCategory: "event-category",
          main: "Event",
        }}
      />

      <Stack.Screen
        name="Event"
        component={Event}
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

export default EventComponent;
