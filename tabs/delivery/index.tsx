import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListDeliveryComponent from "../components/list-delivery";
import MainComponent from "../components/main";

const Stack = createStackNavigator();

function DeliveryComponent(props: any) {
  function OtherTitle(props: any) {
    return <Text style={styles.subTitle}>{props.name}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName="ഡെലിവറി"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
          elevation: 1,
          borderWidth: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#2b2b2b",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="ഡെലിവറി"
        component={ListDeliveryComponent}
        options={{
          headerShown: true,
          headerTitle: (props: any) => <OtherTitle {...{ name: "ഡെലിവറി" }} />,
        }}
      />
      <Stack.Screen
        name="Business"
        component={MainComponent}
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
    fontSize: 20,
    color: "#2b2b2b",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#2b2b2b",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default DeliveryComponent;
