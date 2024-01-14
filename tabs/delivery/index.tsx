import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import ListDeliveryComponent from "../components/list-delivery";

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
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="ഡെലിവറി"
        component={ListDeliveryComponent}
        options={{
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഓൺലൈൻ ഡെലിവറി" }} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 20,
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
