import {
  Box,
  FlatList,
  HStack,
  Spacer,
  Spinner,
  Text,
  VStack,
  View,
} from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import callToTheNumber from "../../../utils/call-to-number";
import moment from "moment";

interface customProps {
  loading: boolean;
  data: any;
  onClick: (categoryId: string) => void;
  props: any;
  handleLoadMore: () => void;
}

export default function ItemList({
  loading,
  data,
  onClick,
  props,
  handleLoadMore,
}: customProps) {
  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;
  const mainProp = props.route.params.main;
  console.log(type === "bus-timings", "bus");

  return (
    <View>
      {!loading && (
        <>
          {type === "bus-timings" && (
            <View style={styles.item}>
              <Box>
                <HStack space={[3, 3]} justifyContent="space-between">
                  <VStack></VStack>
                  <Spacer />
                  <View>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontSize={12}
                      style={styles.parambath}
                    >
                      പറമ്പത്ത് സ്റ്റോപ്പ്
                    </Text>
                  </View>
                </HStack>
              </Box>
            </View>
          )}

          {type === "bus-timings" && (
            <FlatList
              data={data}
              maxToRenderPerBatch={20}
              scrollEventThrottle={16}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1}
              renderItem={({ item, index }: any) => (
                <>
                  <View style={styles.item}>
                    <Box>
                      <HStack space={[3, 3]} justifyContent="space-between">
                        <VStack>
                          <Text bold>
                            {item?.attributes?.nameMalayalam ??
                              item?.attributes?.name}
                          </Text>
                          <Text
                            color="coolGray.600"
                            _dark={{
                              color: "warmGray.200",
                            }}
                            fontSize={12}
                          >
                            {item?.attributes[typeCategory]?.data?.attributes
                              ?.nameMalayalam ??
                              item?.attributes[typeCategory]?.data?.attributes
                                ?.name}{" "}
                          </Text>
                        </VStack>
                        <Spacer />
                        <View>
                          <Text style={styles.time}>
                            {moment(item?.attributes?.time, "HH:mm:ss").format(
                              "hh:mm A"
                            )}
                          </Text>
                        </View>
                      </HStack>
                    </Box>
                  </View>
                </>
              )}
              keyExtractor={(item: any) => item?.id}
            />
          )}
          {type !== "bus-timings" && (
            <>
              {console.log(type !== "bus-timings", "inside")}
              <FlatList
                data={data}
                maxToRenderPerBatch={20}
                scrollEventThrottle={16}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }: any) => (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        props?.navigation?.navigate(mainProp, {
                          itemId: item.id,
                          type: type,
                          // typeCategory: typeCategory,
                        })
                      }
                      style={styles.item}
                      key={index}
                    >
                      <Box>
                        <HStack space={[3, 3]} justifyContent="space-between">
                          <VStack>
                            <Text bold>
                              {item?.attributes?.nameMalayalam ??
                                item?.attributes?.name}
                            </Text>
                            <Text
                              color="coolGray.600"
                              _dark={{
                                color: "warmGray.200",
                              }}
                              fontSize={12}
                            >
                              {item?.attributes[typeCategory]?.data?.attributes
                                ?.nameMalayalam ??
                                item?.attributes[typeCategory]?.data?.attributes
                                  ?.name}{" "}
                            </Text>
                          </VStack>
                          <Spacer />
                          <TouchableOpacity
                            onPress={() =>
                              callToTheNumber(
                                item?.attributes?.nameMalayalam,
                                true
                              )
                            }
                          >
                            <Ionicons
                              name="call-outline"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        </HStack>
                      </Box>
                    </TouchableOpacity>
                  </>
                )}
                keyExtractor={(item: any) => item?.id}
              />
            </>
          )}
        </>
      )}
      {loading && (
        <View style={styles.loader}>
          <Spinner color="black" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    marginBottom: 20,
    // marginBottom: 50,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  parambath: {
    fontSize: 8,
  },
});
