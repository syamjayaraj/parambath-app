import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { pageSize } from "../../../config";
import { loadItem, loadItemCategory } from "../../../apiService";
import { IBusiness, ICategory, IPagination } from "../../../models/model";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [businesses, setBusinesses] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);

  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;
  const typeCategoryUrl = props.route.params.typeCategoryUrl;
  const typeCategoryLabel = props.route.params.typeCategoryLabel;

  const handleSearch = (param: string) => {
    setSearchText(param);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    loadItemCategoryFromApi();
    loadItemFromApi(1);
  }, []);

  const loadItemCategoryFromApi = async () => {
    setLoading(true);
    const response = await loadItemCategory({
      typeCategoryUrl: typeCategoryUrl,
      pageSize: 100,
    });
    if (response) {
      setCategories(response?.data);
      setLoading(false);
    }
  };

  const loadItemFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadItem({
      type: type,
      fields: ["name", "nameMalayalam"],
      populate: [typeCategory],
      searchText: searchText,
      pageNumber: pageParam ? pageNumber : pageNumber,
      pageSize: pageSize,
    });
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
          <SearchBar onSearchData={handleSearch} categories={categories} />
          <CategoryList
            data={categories}
            typeCategoryLabel={typeCategoryLabel}
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
