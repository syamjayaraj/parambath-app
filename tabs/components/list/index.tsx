import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import * as apiService from "../../../api-service/index";

export default function ListComponent(props: any) {
  let [items, setitems] = useState([]);
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);

  let type = props.route.params.url;

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await apiService?.fetchItems(type);
      if (response && response.data && response.data.status == 200) {
        setitems(response?.data?.data);
      } else {
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  const searchData = (searchInput: string) => {};

  const handleSelectCategory = (categoryId: string) => {};

  const handleSelectItem = (itemId: string) => {};

  return (
    <Box bg={"white"} pt={2}>
      <SafeAreaView>
        <View>
          <SearchBar onSearchData={searchData} data={categories} />
          <CategoryList data={categories} onClick={handleSelectCategory} />
        </View>
        <View style={styles.sectionContainer}>
          <ItemList
            loading={loading}
            data={items}
            onClick={handleSelectItem}
            props={props}
          />
        </View>
      </SafeAreaView>
    </Box>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
