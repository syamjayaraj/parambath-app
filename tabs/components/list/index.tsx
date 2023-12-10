import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { useCollectionData } from "../../../hooks/use-collection-data";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);
  const [page, setPage] = useState(1);

  const type = props.route.params.type;
  const { loading, error, data, fetchMore } = useCollectionData(
    type,
    searchInput,
    page
  );

  // console.log(data, "datagg");

  const handleSearch = (param: string) => {
    setSearchInput(param);
  };

  const handleSelectCategory = (categoryId: string) => {};

  const handleSelectItem = (itemId: string) => {};

  const handleLoadMore = () => {
    if (!fetchMoreLoading) {
      setFetchMoreLoading(true);
      fetchMore({
        variables: { searchInput, pageNumber: page + 1 },
        updateQuery: (prev, { fetchMoreResult }) => {
          setFetchMoreLoading(false);
          if (fetchMoreResult?.autos?.data?.length === 0) {
            return {
              autos: {
                data: [...prev.autos.data],
              },
            };
          } else {
            const newAutos = fetchMoreResult.autos.data;
            setPage(page + 1);
            return {
              autos: {
                data: [...prev.autos.data, ...newAutos],
              },
            };
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
            data={data}
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
