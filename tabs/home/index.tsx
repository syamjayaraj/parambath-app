import React from "react";
import { StyleSheet, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "./landing";
import ListComponent from "../components/list";
import MainComponent from "../components/main";
import Contest from "./contest";
import ContestDetails from "./contest-details";

const Stack = createStackNavigator();

function HomeComponent(props: any) {
  function LandingTitle() {
    return <Text style={styles.title}>പറമ്പത്ത്</Text>;
  }
  function OtherTitle(props: any) {
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
          shadowOpacity: 0,
        },
        headerTintColor: "#2b2b2b",
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={Landing}
        options={{
          headerShown: false,
          headerTitle: (props: any) => <LandingTitle {...props} />,
        }}
      />
      <Stack.Screen
        name="Contest"
        component={Contest}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "Contest" }} />,
        }}
      />
      <Stack.Screen
        name="ContestDetails"
        component={ContestDetails}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "Contest Details" }} />
          ),
        }}
      />

      <Stack.Screen
        name="Autos"
        component={ListComponent}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഓട്ടോ റിക്ഷകൾ" }} />
          ),
        }}
      />
      <Stack.Screen
        name="BusTimings"
        component={ListComponent}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => <OtherTitle {...{ name: "ബസ് സമയം" }} />,
        }}
      />
      <Stack.Screen
        name="Auto"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Workers"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "ജോലിക്കാർ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Worker"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Vehicles"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "മറ്റു വാഹനങ്ങൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Vehicle"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Businesses"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "സ്ഥാപനങ്ങൾ",
          gestureDirection: "horizontal",
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
      <Stack.Screen
        name="Emergencies"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "അത്യാഹിതം",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Emergency"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="Representatives"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "ജന പ്രതിനിധികൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="Representative"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="SmallBusinesses"
        component={ListComponent}
        options={{
          headerShown: true,
          headerTitle: "ചെറു സംരംഭങ്ങൾ",
          gestureDirection: "horizontal",
        }}
      />
      <Stack.Screen
        name="SmallBusiness"
        component={MainComponent}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          gestureDirection: "horizontal",
        }}
      />

      <Stack.Screen
        name="OnlineServices"
        component={ListComponent}
        options={{
          headerShown: true,
          gestureDirection: "horizontal",
          headerTitle: (props: any) => (
            <OtherTitle {...{ name: "ഓൺലൈൻ സേവനങ്ങൾ" }} />
          ),
        }}
      />

      <Stack.Screen
        name="OnlineService"
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

export default HomeComponent;
