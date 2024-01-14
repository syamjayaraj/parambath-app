import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Text, Spinner, Box, ScrollView } from "native-base";
const { width } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";
import { fetchContent } from "../../apiService";

export default function Help(props: any) {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeSections, setActiveSections] = useState<any>([]);

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response: any = await fetchContent("helps");
      if (response && response?.data) {
        setContent(response?.data);
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
            <Ionicons name="arrow-up-outline" size={24} color="#2b2b2b" />
          ) : (
            <Ionicons name="arrow-down-outline" size={24} color="#2b2b2b" />
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

  let helpFiltered: any = content.map((item: any) => {
    return {
      title: item?.attributes?.title,
      content: item?.attributes?.content,
    };
  });

  const updateSections = (activeSections: any) => {
    setActiveSections(activeSections);
  };

  return (
    <Box bg={"white"} padding={5} pt={1}>
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
    color: "#2b2b2b",
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
