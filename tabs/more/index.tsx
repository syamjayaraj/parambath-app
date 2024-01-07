import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import Cooking from "./cooking";

import Contact from "./contact";
import Help from "./help";
import About from "./about";
import Contributors from "./contributors";

import Terms from "./terms";

import ListWeb from "../components/list-web";
import List from "../components/list";
import Main from "../components/main";

const Stack = createStackNavigator();

function MoreComponent() {
  function OtherTitle(props: any) {
    return <Text style={styles.subTitle}>{props.name}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName="Landing"
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
        name="മറ്റുള്ളവ"
        component={Landing}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "മറ്റുള്ളവ" }} />
          ),
        }}
      />
      <Stack.Screen
        name="Channels"
        component={ListWeb}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "തത്സമയ ചാനലുകൾ" }} />
          ),
        }}
        initialParams={{
          url: "channel",
        }}
      />
      <Stack.Screen
        name="Tools"
        component={ListWeb}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഓൺലൈൻ ടൂൾസ്" }} />
          ),
        }}
        initialParams={{
          url: "tool",
        }}
      />
      <Stack.Screen
        name="Cooking"
        component={Cooking}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "പാചകം" }} />,
        }}
        initialParams={{
          url: "cooking",
        }}
      />
      <Stack.Screen
        name="Games"
        component={ListWeb}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "കളികൾ" }} />,
        }}
        initialParams={{
          url: "game",
        }}
      />
      <Stack.Screen
        name="Offers"
        component={List}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "ഓഫറുകൾ" }} />,
        }}
        initialParams={{
          url: "game",
        }}
      />
      <Stack.Screen
        name="Offer"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="Contact"
        component={Contact}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഞങ്ങളുമായി ബന്ധപ്പെടൂ" }} />
          ),
        }}
      />
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "സഹായം" }} />,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Contributors"
        component={Contributors}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "സംഭാവകർ" }} />,
        }}
      />
      <Stack.Screen
        name="Terms"
        component={Terms}
        options={{
          headerShown: true,
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
    marginLeft: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MoreComponent;
