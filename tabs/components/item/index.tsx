import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Spacer, Text, VStack } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
import callToTheNumber from "../../../utils/call-to-number";
import React from "react";

const ItemComponent = React.memo(
  ({ item, props, mainProp, type, typeCategory, index }: any) => {
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
          <HStack space={[3, 3]} justifyContent="space-between">
            <VStack>
              <Text bold>
                {item?.attributes?.nameMalayalam ?? item?.attributes?.name}
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
            <Spacer />
            <TouchableOpacity
              onPress={() =>
                callToTheNumber(item?.attributes?.phoneNumber, true)
              }
            >
              <Ionicons name="call-outline" size={20} color="#2b2b2b" />
            </TouchableOpacity>
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
});
