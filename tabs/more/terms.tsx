import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Box, ScrollView, Spinner } from "native-base";
import HTML from "react-native-render-html";
import { fetchContent } from "../../apiService";

export default function Terms() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const { width: contentWidth } = useWindowDimensions();

  useEffect(() => {
    fetchContentFromApi();
  }, []);

  const fetchContentFromApi = async () => {
    try {
      setLoading(true);
      const response = await fetchContent("term");
      if (response && response?.data) {
        setContent(response?.data);
      } else {
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching content:", err);
      setLoading(false);
    }
  };

  const renderHtmlContent = (content: any) => {
    const renderersProps = {
      p: {
        style: {
          marginVertical: 1,
        },
      },
      h2: {
        style: {
          marginTop: 1,
          marginBottom: 1,
        },
      },
      h3: {
        style: {
          marginTop: 1,
          marginBottom: 1,
        },
      },
    };

    if (!content?.attributes?.content) return null;

    return content.attributes.content.map((item: any, index: number) => {
      if (item.type === "paragraph") {
        return (
          <HTML
            contentWidth={contentWidth}
            key={index}
            source={{ html: `<p>${item.children[0].text}</p>` }}
            renderersProps={renderersProps}
          />
        );
      } else if (item.type === "heading") {
        const level = `h${item.level}`;
        return (
          <HTML
            contentWidth={contentWidth}
            key={index}
            source={{ html: `<${level}>${item.children[0].text}</${level}>` }}
            renderersProps={renderersProps}
          />
        );
      }
      return null;
    });
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
            <View style={{ marginBottom: 50 }}>
              {content && renderHtmlContent(content)}
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
