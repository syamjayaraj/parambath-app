import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { Text, Spinner, Box, ScrollView } from "native-base";
import { apiUrl } from "../../config";
const { width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";

export default function Help(props: any) {
  const [helps, setHelps] = useState([]);

  const [loading, setLoading] = useState(false);
  const [activeSections, setActiveSections] = useState<any>([]);
  useEffect(() => {
    fetchHelps();
  }, []);

  const fetchHelps = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/help/list?`);
      if (response && response.data && response.data.status == 200) {
        setHelps(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  function renderHeader(item: any, index: number, expanded: boolean) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          borderRadius: 10,
          marginTop: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#f1f1f1",
        }}
        key={index}
      >
        <Text style={{ fontWeight: "700", width: width - 80 }}>
          {item.title}
        </Text>
        <View>
          {expanded ? (
            <Ionicons name="arrow-up-outline" size={24} color="black" />
          ) : (
            <Ionicons name="arrow-down-outline" size={24} color="black" />
          )}
        </View>
      </View>
    );
  }

  const renderContent = (item: any) => {
    return (
      <Text
        style={{
          backgroundColor: "#ffffff",
          padding: 10,
        }}
      >
        {item.content}
      </Text>
    );
  };

  let helpFiltered: any = helps.map((item: any) => {
    return {
      title: item?.title,
      content: item?.description,
    };
  });

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Box bg={"white"} pt={12} padding={5}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
          {loading ? (
            <View style={styles.loader}>
              <Spinner color="#1c1b29" />
            </View>
          ) : (
            <View style={styles.sectionContainer}>
              <Accordion
                sections={helpFiltered}
                renderHeader={renderHeader as any}
                renderContent={renderContent}
                touchableComponent={TouchableOpacity}
                duration={400}
                onChange={updateSections}
                activeSections={activeSections}
                renderAsFlatList={false}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: "black",
  },
  container: {
    padding: 20,
  },
  sectionContainer: {
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },

  menuCardText: {
    fontWeight: "normal",
    fontSize: 15,
    color: "#1f1f1f",
  },
  subTitle: {
    fontWeight: "bold",
    fontSize: 15,
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 10,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  name: {
    fontSize: 21,
  },
  owner: {
    fontSize: 13,
    color: "#1f1f1f",
  },
});
