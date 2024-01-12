import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import { Box, Text, Heading, Stack, Center, HStack, VStack } from "native-base";
import { pageSize } from "../../../config";
import { fetchNotification } from "../../../apiService";
import { IBusiness, IPagination } from "../../../models/model";
import moment from "moment";

export default function ListNotificationComponent(props: any) {
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    loadItemFromApi(1);
  }, []);

  const loadItemFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await fetchNotification();
    if (response) {
      setItems(response?.data);
      setPagination(response?.meta);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if ((pagination?.pagination?.total as number) < pageSize) {
    } else {
      loadItemFromApi(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    loadItemFromApi();
  }, []);

  return (
    <Box bg={"white"} mt={2}>
      <SafeAreaView>
        <View style={styles.sectionContainer}>
          <FlatList
            data={items}
            maxToRenderPerBatch={20}
            scrollEventThrottle={16}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            renderItem={({ item, index }: any) => (
              <>
                <Box alignItems="center" mb={2}>
                  <Box
                    rounded="lg"
                    overflow="hidden"
                    borderColor="coolGray.200"
                    borderWidth="1"
                    _dark={{
                      borderColor: "white",
                      backgroundColor: "white",
                    }}
                    _web={{
                      shadow: 2,
                      borderWidth: 0,
                    }}
                    _light={{
                      backgroundColor: "white",
                    }}
                  >
                    <Stack p="4" space={3}>
                      <Stack space={2}>
                        <Text fontSize="sm" fontWeight="500" ml="-0.5" mt="-1">
                          {item?.attributes?.title}
                        </Text>
                      </Stack>
                      <Text fontWeight="400">{item?.attributes?.content}</Text>
                      <HStack
                        alignItems="center"
                        space={4}
                        justifyContent="space-between"
                      >
                        <HStack alignItems="center">
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: "warmGray.200",
                            }}
                            fontWeight="400"
                          >
                            {moment(item?.attributes?.date).fromNow()}
                          </Text>
                        </HStack>
                      </HStack>
                    </Stack>
                  </Box>
                </Box>
              </>
            )}
            keyExtractor={(item: any) => item?.id}
          />
        </View>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
