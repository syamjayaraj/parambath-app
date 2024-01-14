import { FlatList, Text, View } from "native-base";
import { StyleSheet, TouchableOpacity } from "react-native";
interface customProps {
  onClick: (categoryId: number) => void;
}

export default function CategoryListEvent({ onClick }: customProps) {
  const data = [
    {
      id: "1",
      name: "വരാനിരിക്കുന്നവ",
    },
    {
      id: "2",
      name: "ഈ ആഴ്ച",
    },
    {
      id: "3",
      name: "ഈ മാസം",
    },
  ];

  const handleSelectCategory = (categoryId: number) => {
    onClick(categoryId);
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
              onPress={() => handleSelectCategory(Number(item?.id))}
            >
              <Text
                style={[
                  styles.categoryBadgeText,
                  {
                    color: "#2b2b2b",
                  },
                ]}
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item: any) => item.id}
      />
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
