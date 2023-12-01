import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import {
  Container,
  Header,
  List,
  ListItem,
  Text,
  Card,
  CardItem,
  Icon,
  Right,
  Item,
  Input,
  Left,
  Body,
  Title,
  Spinner,
  Accordion,
} from "native-base";
import { apiUrl } from "../../config";
const { width } = Dimensions.get("window");

export default function Help(props: any) {
  let [helps, setHelps] = useState([]);

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHelps();
  }, []);

  let fetchHelps = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/help/list?`);
      if (response && response.data && response.data.status == 200) {
        setHelps(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  function _renderHeader(item, expanded, index) {
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
      >
        <Text style={{ fontWeight: "700", width: width - 80 }}>
          {item.title}
        </Text>
        <View>
          {expanded ? (
            <Icon style={{ fontSize: 18 }} name="arrow-up-outline" />
          ) : (
            <Icon style={{ fontSize: 18 }} name="arrow-down-outline" />
          )}
        </View>
      </View>
    );
  }
  function _renderContent(item) {
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
  }

  let helpFiltered = helps.map((item) => {
    return {
      title: item.title,
      content: item.description,
    };
  });

  return (
    <Container>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View style={styles.sectionContainer}>
            <Accordion
              dataArray={helpFiltered}
              animation={true}
              expanded={[0]}
              renderHeader={_renderHeader}
              renderContent={_renderContent}
              style={{ borderRadius: 10 }}
            />
          </View>
        )}
      </View>
    </Container>
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
