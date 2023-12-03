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
import call from "react-native-phone-call";
import { Ionicons } from "@expo/vector-icons";

interface customProps {
  loading: boolean;
  data: any;
  onClick: (categoryId: string) => void;
  navigation: any;
}

export default function ItemList({
  loading,
  data,
  onClick,
  navigation,
}: customProps) {
  const handleSelectItem = (itemId: string) => {
    // ...
    onClick(itemId);
  };

  let callToTheNumber = async (phoneNumber: string) => {
    try {
      let callArgs = {
        number: phoneNumber,
        prompt: true,
      };
      await call(callArgs);
    } catch (err: any) {}
  };

  return (
    <View>
      {loading ? (
        <View style={styles.loader}>
          <Spinner color="black" />
        </View>
      ) : (
        <View>
          <Box>
            <FlatList
              data={data}
              renderItem={({ item }: any) => (
                <TouchableOpacity
                  style={
                    {
                      // ...styles.menuCard,
                    }
                  }
                  onPress={() => navigation.navigate("Tools")}
                >
                  <Box
                    _dark={{
                      borderColor: "muted.50",
                    }}
                    borderColor="muted.800"
                    pl={["0", "4"]}
                    pr={["0", "5"]}
                    py="2"
                  >
                    <HStack space={[3, 3]} justifyContent="space-between">
                      <VStack>
                        <Text bold>{item?.malayalamName}</Text>
                        <Text>{item?.businessCategory?.malayalamName}</Text>
                      </VStack>
                      <Spacer />
                      <TouchableOpacity
                        onPress={() => callToTheNumber(item.phoneNumber)}
                      >
                        <Ionicons
                          name="call-outline"
                          style={
                            item.isPremium
                              ? {
                                  color: "#FFA507",
                                }
                              : null
                          }
                        />
                      </TouchableOpacity>
                    </HStack>
                  </Box>
                </TouchableOpacity>
              )}
              keyExtractor={(item: any) => item?._id}
            />
          </Box>
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
  categoryBadge: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f1f1f1",
    borderRadius: 18,
    height: 36,
    paddingRight: 10,
    paddingLeft: 10,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
  },
  categoryBadgeImage: {
    width: 15,
    height: 15,
    borderRadius: 3,
  },
  categoryBadgeText: {
    fontSize: 14,
  },

  categoryMore: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
  },
  categoryMoreLink: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  categoryMoreText: {
    fontSize: 11,
  },
  categoryMoreIcon: {
    fontSize: 15,
    marginLeft: 2,
  },

  categoryExp: {},
  categoryExpHeaderContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryExpHeader: {
    fontWeight: "100",
    fontSize: 25,
  },
  categoryExpItem: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#f1f1f1",
    padding: 10,
  },
  categoryExpItemText: {},
});
