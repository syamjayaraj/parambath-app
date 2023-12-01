import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Markdown from "react-native-markdown-display";

import axios from "axios";
import { Container, Spinner } from "native-base";
import { apiUrl } from "../../config";

export default function Terms(props: any) {
  let [term, setTerm] = useState({
    text: "",
  });

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTerms();
  }, []);

  let fetchTerms = async () => {
    try {
      setLoading(true);
      let response = await axios.get(`${apiUrl}/term`);
      if (response && response.data && response.data.status == 200) {
        setTerm(response.data.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loader}>
            <Spinner color="#1c1b29" />
          </View>
        ) : (
          <View
            style={{
              marginBottom: 50,
            }}
          >
            <Markdown>{term.text}</Markdown>
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
  container: {
    padding: 30,
  },
});
