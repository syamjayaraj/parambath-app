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
import moment from "moment";

interface customProps {
  loading: boolean;
  data: any;
  onClick: (categoryId: string) => void;
  props: any;
  handleLoadMore: () => void;
}

export default function ItemListEvent({
  loading,
  data,
  onClick,
  props,
  handleLoadMore,
}: customProps) {
  const type = props?.route?.params?.type;
  const typeCategory = props?.route?.params?.typeCategory;
  const mainProp = props?.route?.params?.main;

  return (
    <View>
      {!loading && (
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
                        {moment(item?.attributes?.from).format("Do MMM")}
                        {" - "}
                        {moment(item?.attributes?.to).format("Do MMM")}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Ionicons
                      style={styles.categoryMoreIcon}
                      name="arrow-forward-outline"
                    />
                  </HStack>
                </Box>
              </TouchableOpacity>
            </>
          )}
          keyExtractor={(item: any) => item?.id}
        />
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
  categoryMoreIcon: {
    fontSize: 17,
  },
});
