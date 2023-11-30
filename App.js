import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";

import Home from "./Tabs/Home";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            showLabel: true,
            activeTintColor: "black",
            inactiveTintColor: "grey",
            labelStyle: {
              fontSize: 10,
              marginTop: 0,
              marginBottom: 5,
              color: "black",
              fontWeight: "bold",
            },
            // activeBackgroundColor: colours[getRandomInt(6)],
            inactiveBackgroundColor: "white",
            tabStyle: {
              borderRadius: 10,
              elevation: 1,
              padding: 1,
            },
            style: {
              // opacity: 0.9,
              height: Platform.OS === "ios" ? 90 : 60,
              width: "80%",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              marginLeft: "10%",
              marginRight: "10%",

              backgroundColor: "transparent",
              borderTopWidth: 0,
              position: "absolute",
              elevation: 0, // <-- this is the solution
              // position: "absolute",
              // left: 0,
              // right: 0,
              // bottom: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              // borderWidth: 1,
              // borderColor: "black",
              // borderTopColor: "black",
              // borderBottomWidth: 0,
              // backgroundColor: "trasparent",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            lorem="lorem"
            children={(props) => <Home {...props} />}
            options={{
              tabBarLabel: "ഹോം",
              tabBarIcon: ({ color, size }) => (
                <Icon
                  name="home-outline"
                  style={{ color: color }}
                  size={size}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default MyTabs;
