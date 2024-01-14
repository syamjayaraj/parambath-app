import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import Contact from "./contact";
import Help from "./help";
import About from "./about";
import Contributors from "./contributors";
import Terms from "./terms";

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
        headerTintColor: "#2b2b2b",
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
    color: "#2b2b2b",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2b2b2b",
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
