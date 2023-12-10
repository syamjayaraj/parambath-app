import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { useCollectionData } from "../../../hooks/use-collection-data";
import { pageSize } from "../../../config";
import { useCategoryData } from "../../../hooks/use-category-data";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchInput, setSearchInput] = useState("");
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [collectionDataSate, setCollectionDataState] = useState<any>([]);
  const [categoryDataState, setCategoryDataSate] = useState<any>([]);

  const type = props.route.params.type;
  const categoryType = props.route.params.categoryType;
  const categoryName = props.route.params.categoryName;

  const { loading, error, data, fetchMore } = useCollectionData(
    type,
    searchInput,
    selectedCategory,
    pageNumber,
    pageSize
  );

  const { categoryLoading, categoryError, categoryData } =
    useCategoryData(categoryType);

  const handleSearch = (param: string) => {
    setSearchInput(param);
  };

  useEffect(() => {
    if (searchInput === "") {
      setCollectionDataState([]);
      setPageNumber(1);
    } else {
      setCollectionDataState([]);
      setPageNumber(1);
    }
  }, [searchInput]);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    if (data && pageNumber >= 2) {
      setCollectionDataState([...collectionDataSate, ...data]);
    } else if (data && pageNumber < 2) {
      setCollectionDataState(data);
    }
  }, [data]);

  useEffect(() => {
    setCategoryDataSate(categoryData);
  }, [categoryData]);

  const handleLoadMore = () => {
    if (!fetchMoreLoading) {
      setFetchMoreLoading(true);
      fetchMore({
        variables: { searchInput, pageNumber: pageNumber + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
          setFetchMoreLoading(false);
          if (fetchMoreResult[type]?.data?.length === 0) {
            setPageNumber(pageNumber + 1);
          } else {
            setPageNumber(pageNumber + 1);
          }
        },
      });
    }
  };

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
            data={collectionDataSate}
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
