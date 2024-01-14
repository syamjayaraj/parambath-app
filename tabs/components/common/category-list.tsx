import { FlatList, Text, View } from "native-base";
import { Ref, useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

interface customProps {
  data: any;
  typeCategoryLabel: string;
  selectedCategory: number | undefined;
  onClick: (categoryId: number) => void;
}

export default function CategoryList({
  data,
  onClick,
  typeCategoryLabel,
  selectedCategory,
}: customProps) {
  const { height } = Dimensions.get("window");
  const refRBSheet: any = useRef();
  const flatListRef: any = useRef(null);

  const handleSelectCategory = (categoryId: number) => {
    onClick(categoryId);
  };

  const scrollToIndex = (index: number) => {
    flatListRef.current.scrollToIndex({ animated: true, index: index });
  };

  const handleSelectCategoryFromPopup = (categoryId: number, index: number) => {
    onClick(categoryId);
    refRBSheet.current.close();
    scrollToIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item, index }: any) => (
          <View style={{ padding: 10, marginTop: 0 }}>
            <TouchableOpacity
              style={[
                styles.categoryBadge,
                {
                  backgroundColor:
                    selectedCategory === item?.id ? "black" : "white",
                },
              ]}
              onPress={() => {
                handleSelectCategory(Number(item?.id));
                scrollToIndex(index);
              }}
            >
              <Text
                style={[
                  styles.categoryBadgeText,
                  {
                    color: selectedCategory === item?.id ? "white" : "black",
                  },
                ]}
              >
                {item?.attributes?.nameMalayalam ?? item?.attributes?.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: any) => item.id}
      />
      {data?.length !== 0 && (
        <View style={styles.categoryMore}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.categoryMoreLink}
          >
            <Text style={styles.categoryMoreText}>{typeCategoryLabel}</Text>
            <Ionicons
              style={styles.categoryMoreIcon}
              name="arrow-forward-outline"
            />
          </TouchableOpacity>
        </View>
      )}

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={height - 50}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={styles.categoryExp}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({ item, index }: any) => (
              <View style={{ padding: 10, marginTop: 0 }}>
                <TouchableOpacity
                  style={[
                    styles.categoryExpItem,
                    {
                      backgroundColor:
                        selectedCategory === item?.id ? "black" : "white",
                    },
                  ]}
                  onPress={() =>
                    handleSelectCategoryFromPopup(Number(item.id), index)
                  }
                >
                  <Text
                    style={[
                      styles.categoryExpItemText,
                      {
                        color:
                          selectedCategory === item?.id ? "white" : "black",
                      },
                    ]}
                  >
                    {item?.attributes?.nameMalayalam ?? item?.attributes?.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item: any) => item.id}
          />
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
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
