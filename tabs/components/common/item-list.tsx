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
  let itemCategoryProp = props.route.params.itemCategory;
  let urlProp = props.route.params.url;
  let mainProp = props.route.params.main;

  const handleSelectItem = (itemId: string) => {
    // ...
    onClick(itemId);
  };

  return (
    <View>
      <FlatList
        data={data}
        maxToRenderPerBatch={20}
        scrollEventThrottle={16}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() =>
              props?.navigation?.navigate(mainProp, {
                itemId: item._id,
                url: urlProp,
                itemCategory: itemCategoryProp,
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
                  <Text>
                    {item?.attributes?.auto_stand?.data?.attributes?.name}
                  </Text>
                </VStack>
                <Spacer />
                <TouchableOpacity
                  onPress={() =>
                    callToTheNumber(item?.attributes?.nameMalayalam, true)
                  }
                >
                  <Ionicons name="call-outline" size={20} color="black" />
                </TouchableOpacity>
              </HStack>
            </Box>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item?.id}
      />
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
    // marginBottom: 20,
    marginBottom: 50,
  },
});
