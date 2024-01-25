import { Ionicons } from "@expo/vector-icons";
import { Box, HStack, Spacer, Text, VStack, View } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";
import moment from "moment";

const ItemBusTimingComponent = React.memo(
  ({ item, typeCategory, index }: any) => {
    return (
      <View style={styles.item} key={index}>
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
            <View>
              <Text style={styles.time}>
                {moment(item?.attributes?.time, "HH:mm:ss").format("hh:mm A")}
              </Text>
            </View>
          </HStack>
        </Box>
      </View>
    );
  }
);

export default ItemBusTimingComponent;

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    flex: 1,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
});
