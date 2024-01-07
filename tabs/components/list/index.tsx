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
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);

  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;
  const typeCategoryUrl = props.route.params.typeCategoryUrl;
  const typeCategoryLabel = props.route.params.typeCategoryLabel;
  const extra = props.route.params.extra;

  const handleSearch = (param: string) => {
    setSearchText(param);
  };

  const handleSelectCategory = (categoryId: number) => {
    if (categoryId === selectedCategory) {
      setSelectedCategory(undefined);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    loadItemCategoryFromApi();
    loadItemFromApi(1);
  }, []);

  const loadItemCategoryFromApi = async () => {
    setLoading(true);
    let filters: any = [];
    if (type === "businesses") {
      filters = [
        {
          name: "small",
          value: extra === "small" ? true : false,
        },
      ];
    }
    let params = {
      filters: filters,
    };
    const response = await loadItemCategory({
      typeCategoryUrl: typeCategoryUrl,
      pageSize: 100,
      params: params,
    });
    if (response) {
      setCategories(response?.data);
      setLoading(false);
    }
  };

  const loadItemFromApi = async (pageParam?: number) => {
    setLoading(true);
    let filters: any = [];
    let fields = ["name", "nameMalayalam"];
    let sort = ["name"];
    if (type === "businesses") {
      filters = [
        {
          name: "small",
          value: extra === "small" ? false : true,
        },
      ];
    }
    if (type === "bus-timings") {
      fields = [...fields, "time"];
      sort = ["time"];
    }
    let params = {
      type: type,
      filters: filters,
      fields: fields,
      sort: sort,
      populate: [typeCategory],
      categoryType: typeCategory,
      categoryId: selectedCategory,
      searchText: searchText,
      pageNumber: pageParam ? pageNumber : pageNumber,
      pageSize: pageSize,
    };
    const response = await loadItem(params);
    if (response) {
      setItems(response?.data);
      setPagination(response?.meta);
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
  }, [type, typeCategory, selectedCategory, searchText, pageNumber, pageSize]);

  return (
    <Box bg={"white"} mt={2}>
      <SafeAreaView>
        <View>
          <SearchBar onSearchData={handleSearch} categories={categories} />
          <CategoryList
            data={categories}
            typeCategoryLabel={typeCategoryLabel}
            onClick={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        </View>
        <View style={styles.sectionContainer}>
          <ItemList
            handleLoadMore={handleLoadMore}
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
