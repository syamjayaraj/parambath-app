import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Spacer, Text, VStack } from "native-base";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import callToTheNumber from "../../../utils/call-to-number";
import React from "react";
const { width } = Dimensions.get("window");

const ItemComponent = React.memo(
  ({ item, props, mainProp, type, typeCategory, index }: any) => {
    console.log(item, "cat");
    return (
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
          <HStack justifyContent="space-between">
            <VStack>
              <Text
                bold
                style={{
                  flexWrap: "wrap",
                  width: width - 90,
                }}
              >
                {item?.attributes?.nameMalayalam ?? item?.attributes?.name}
                {item?.attributes?.ownerNameMalayalam && (
                  <Text
                    style={{
                      fontSize: 10,
                      color: "coolGray.600",
                      fontWeight: "300",
                    }}
                  >
                    {"  "}
                    {item?.attributes?.ownerNameMalayalam}
                  </Text>
                )}
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
                  item?.attributes[typeCategory]?.data?.attributes?.name}{" "}
              </Text>
            </VStack>
            {typeCategory === "auto_stand" && (
              <>
                <Spacer />
                <TouchableOpacity
                  onPress={() => callToTheNumber(item?.attributes?.phoneNumber)}
                >
                  <Ionicons name="call-outline" size={20} color="#2b2b2b" />
                </TouchableOpacity>
              </>
            )}
            {typeCategory !== "auto_stand" && (
              <>
                <Spacer />
                <Ionicons
                  style={styles.categoryMoreIcon}
                  name="arrow-forward-outline"
                />
              </>
            )}
          </HStack>
        </Box>
      </TouchableOpacity>
    );
  }
);

export default ItemComponent;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    flex: 1,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
  categoryMoreIcon: {
    fontSize: 17,
  },
});
