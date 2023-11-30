import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Home";
import BusTimings from "./BusTimings";
import List from "../components/List";
import Main from "../components/Main";

const Stack = createStackNavigator();

function HomeComponent() {
  function HomeTitle() {
    return <Text style={styles.title}>പറമ്പത്ത്</Text>;
  }

  function OtherTitle(props) {
    return <Text style={styles.subTitle}>{props.name}</Text>;
  }

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "white",
          elevation: 1,
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerTitle: (props) => <HomeTitle {...props} /> }}
      />
      <Stack.Screen
        name="Autos"
        component={List}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props) => <OtherTitle {...{ name: "ഓട്ടോ റിക്ഷകൾ" }} />,
        }}
      />
      <Stack.Screen
        name="BusTimings"
        component={BusTimings}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props) => <OtherTitle {...{ name: "ബസ് സമയം" }} />,
        }}
      />
      <Stack.Screen
        name="Auto"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Workers"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "ജോലിക്കാർ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Worker"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Vehicles"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "മറ്റു വാഹനങ്ങൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Vehicle"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Businesses"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "സ്ഥാപനങ്ങൾ",
          gestureDirection: "horizontal",
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
      <Stack.Screen
        name="Emergencies"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "അത്യാഹിതം",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Emergency"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="Representatives"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "ജന പ്രതിനിധികൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Representative"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="Enterprises"
        component={List}
        options={{
          headerShown: true,
          headerTitle: "ചെറു സംരംഭങ്ങൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Enterprise"
        component={Main}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="OnlineServices"
        component={List}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props) => (
            <OtherTitle {...{ name: "ഓൺലൈൻ സേവനങ്ങൾ" }} />
          ),
        }}
      />

      <Stack.Screen
        name="OnlineService"
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

export default HomeComponent;
