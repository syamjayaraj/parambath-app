import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { useCollectionData } from "../../../hooks/use-collection-data";
import { pageSize } from "../../../config";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [fetchedData, setFetchedData] = useState<any>([]);

  const type = props.route.params.type;
  const { loading, error, data, fetchMore } = useCollectionData(
    type,
    searchInput,
    pageNumber,
    pageSize
  );

  const handleSearch = (param: string) => {
    setSearchInput(param);
  };

  useEffect(() => {
    if (searchInput === "") {
      setFetchedData([]);
      setPageNumber(1);
    } else {
      setFetchedData([]);
      setPageNumber(1);
    }
  }, [searchInput]);

  const handleSelectCategory = (categoryId: string) => {};

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    if (data && pageNumber >= 2) {
      setFetchedData([...fetchedData, ...data]);
    } else if (data && pageNumber < 2) {
      setFetchedData(data);
    }
  }, [data]);

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
          <CategoryList data={categories} onClick={handleSelectCategory} />
        </View>
        <View style={styles.sectionContainer}>
          <ItemList
            handleLoadMore={handleLoadMore}
            loading={loading}
            data={fetchedData}
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
