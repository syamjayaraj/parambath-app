import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text } from "react-native";
import ListNotificationComponent from "../components/list-notification";

const Stack = createStackNavigator();

function NotificationComponent() {
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
        headerTintColor: "#2b2b2b",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={ListNotificationComponent}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "അറിയിപ്പുകൾ" }} />
          ),
        }}
        initialParams={{
          url: "notification",
          categoryUrl: "notification-category",
          placeHolderImage: "notification",
          itemCategory: "notificationCategory",
          main: "Notification",
          title: true,
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

export default NotificationComponent;
