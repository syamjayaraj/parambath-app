import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Box, ScrollView, Spinner } from "native-base";
import * as apiService from "../../api-service/index";

export default function Terms() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response: any = await apiService?.fetchContent("term");
      if (response && response?.data && response?.status == 200) {
        setContent(response?.data?.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  return (
    <Box bg={"white"} pt={5} padding={3}>
      <SafeAreaView>
        <ScrollView contentContainerStyle={{ width: "100%" }}>
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
              {/* <Markdown>{htmlContent}</Markdown> */}
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
  container: {
    padding: 30,
  },
});
