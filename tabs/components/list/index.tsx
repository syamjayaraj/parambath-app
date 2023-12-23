import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { pageSize } from "../../../config";
import { loadItem } from "../../../apiService";
import { IBusiness, IPagination } from "../../../models/model";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [businesses, setBusinesses] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryDataState, setCategoryDataSate] = useState<any>([]);

  const type = props.route.params.type;
  const categoryType = props.route.params.categoryType;
  const categoryName = props.route.params.categoryName;

  const handleSearch = (param: string) => {
    setSearchText(param);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    loadItemFromApi(1);
  }, []);

  const loadItemFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadItem({
      type: type,
      fields: ["name", "nameMalayalam"],
      populate: ["business_category"],
      searchText: searchText,
      pageNumber: pageParam ? pageNumber : pageNumber,
      pageSize: pageSize,
    });
    console.log(response, "res");
    if (response) {
      if (type === "businesses") {
        setBusinesses(response?.data);
        setPagination(response?.meta);
      }
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if ((pagination?.pagination?.total as number) < pageSize) {
    } else {
      loadItemFromApi(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    loadItemFromApi();
  }, [searchText]);

  return (
    <Box bg={"white"} mt={2}>
      <SafeAreaView>
        <View>
          <SearchBar onSearchData={handleSearch} data={categories} />
          <CategoryList
            data={categoryDataState}
            categoryName={categoryName}
            onClick={handleSelectCategory}
          />
        </View>
        <View style={styles.sectionContainer}>
          <ItemList
            handleLoadMore={handleLoadMore}
            loading={loading}
            data={businesses}
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
