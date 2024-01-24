import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import HomeComponent from "./tabs/home";
import EventComponent from "./tabs/events";
import NotificationComponent from "./tabs/notification-component";
import DeliveryComponent from "./tabs/delivery";
import MoreComponent from "./tabs/more";
import { MaterialIcons, Ionicons, AntDesign } from "@expo/vector-icons";
import { NativeBaseProvider } from "native-base";

export default function App() {
  const BottomTab = createBottomTabNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer theme={navTheme}>
        <StatusBar style="dark" backgroundColor="white" />
        <BottomTab.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveBackgroundColor: "#fafafa",
            tabBarStyle: {
              height: Platform.OS === "ios" ? 90 : 60,
              backgroundColor: "#ffffff",
              position: "absolute",
              elevation: 0,
            },
            tabBarLabelStyle: {
              fontSize: 10,
              marginTop: 0,
              marginBottom: 5,
              color: "#2b2b2b",
              fontWeight: "bold",
            },
          }}
        >
          <BottomTab.Screen
            name="Home"
            children={(props) => <HomeComponent {...props} />}
            options={{
              tabBarLabel: "ഹോം",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name="home-outline" size={24} color={"#2b2b2b"} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Events"
            component={EventComponent}
            options={{
              tabBarLabel: "പരിപാടികൾ",
              tabBarIcon: ({ color, size, focused }) => (
                <AntDesign name="calendar" size={24} color={"#2b2b2b"} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Notification"
            component={NotificationComponent}
            options={{
              tabBarLabel: "അറിയിപ്പുകൾ",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color={"#2b2b2b"}
                />
              ),
            }}
          />

          <BottomTab.Screen
            name="Delivery"
            component={DeliveryComponent}
            options={{
              tabBarLabel: "ഡെലിവറി",
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialIcons
                  name="delivery-dining"
                  size={24}
                  color={"#2b2b2b"}
                />
              ),
            }}
          />

          <BottomTab.Screen
            name="More"
            component={MoreComponent}
            options={{
              tabBarLabel: "മറ്റുള്ളവ",
              tabBarIcon: ({ color, size, focused }) => (
                <Ionicons name="menu-outline" size={24} color={"#2b2b2b"} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
