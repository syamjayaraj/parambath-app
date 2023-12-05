import { FlatList, Text, View } from "native-base";
import { useRef } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

interface customProps {
  data: any;
  onClick: (categoryId: string) => void;
}

export default function CategoryList({ data, onClick }: customProps) {
  const { height } = Dimensions.get("window");
  const refRBSheet: any = useRef();

  const handleSelectCategory = (categoryId: string) => {
    // ...
    onClick(categoryId);
  };

  const handleSelectCategoryFromPopup = (categoryId: string) => {
    // ...
    refRBSheet.current.close();
  };

  return (
    <View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={({ item }: any) => (
          <View style={{ padding: 10, marginTop: 0 }}>
            <TouchableOpacity
              style={[styles.categoryBadge]}
              onPress={() => handleSelectCategory(item._id)}
            >
              <Text
                style={[
                  styles.categoryBadgeText,
                  {
                    color: "black",
                  },
                ]}
              >
                {item.malayalamName ? item.malayalamName : item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: any) => item._id}
      />
      {data?.length !== 0 && (
        <View style={styles.categoryMore}>
          <TouchableOpacity
            onPress={() => refRBSheet.current.open()}
            style={styles.categoryMoreLink}
          >
            <Text style={styles.categoryMoreText}>മറ്റുള്ളവ</Text>
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
            renderItem={({ item }: any) => (
              <View style={{ padding: 10, marginTop: 0 }}>
                <TouchableOpacity
                  style={[styles.categoryExpItem]}
                  onPress={() => handleSelectCategoryFromPopup(item._id)}
                >
                  <Text
                    style={[
                      styles.categoryExpItemText,
                      {
                        color: "black",
                      },
                    ]}
                  >
                    {item.malayalamName ? item.malayalamName : item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item: any) => item._id}
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
