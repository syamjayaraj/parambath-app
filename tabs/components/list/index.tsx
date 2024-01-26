import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Box, Spinner } from "native-base";
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { categorySize, pageSize } from "../../../config";
import { loadItem, loadItemCategory } from "../../../apiService";
import { IBusiness, ICategory, IPagination } from "../../../models/model";

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);

  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;
  const typeCategoryUrl = props.route.params.typeCategoryUrl;
  const typeCategoryLabel = props.route.params.typeCategoryLabel;
  const extra = props.route.params.extra;

  let filters: any = [];
  let fields = ["name", "nameMalayalam"];
  let sort = ["name"];
  if (type === "businesses") {
    filters = [
      {
        name: "small",
        value: extra === "small" ? true : false,
      },
    ];
  }
  if (type === "bus-timings") {
    fields = [...fields, "time"];
    sort = ["time"];
  }
  if (type === "vehicles") {
    fields = [...fields, "ownerNameMalayalam"];
  }
  if (type === "autos") {
    fields = [...fields, "phoneNumber", "ownerNameMalayalam"];
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
    pageNumber: pageNumber,
    pageSize: pageSize,
  };

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
  }, []);

  const loadItemCategoryFromApi = async () => {
    setCategoryLoading(true);
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
      pageSize: categorySize,
      params: params,
    });
    if (response) {
      setCategories(response?.data);
      setCategoryLoading(false);
    }
  };

  const loadItems = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadItem({
      ...params,
      pageNumber: pageParam || pageNumber,
    });

    if (response) {
      const newData = response?.data;
      const existingData: any = items;
      setItems([...existingData, ...newData]);
      setPagination(response?.meta);
      setLoading(false);
    }
  };

  const handleLoadMore = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        if ((pagination?.pagination?.total as number) < items?.length) {
          resolve();
          return;
        }

        const nextPageNumber = pageNumber + 1;
        await loadItems(nextPageNumber);
        setPageNumber(nextPageNumber);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleLoadOld = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        resolve();
        return;
      } catch (error) {
        reject(error);
      }
    });
  };

  const loadItemFromApi = async (pageNumberParam: number) => {
    setInitialLoading(true);
    const response = await loadItem({
      ...params,
      pageNumber: pageNumberParam ?? pageNumber,
    });
    if (response) {
      const data = response?.data;
      setItems(data);
      setPagination(response?.meta);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadItemFromApi(1);
  }, [type, typeCategory, selectedCategory, searchText]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <SearchBar onSearchData={handleSearch} categories={categories} />
        {categoryLoading ? (
          <View
            style={{
              height: 78,
            }}
          ></View>
        ) : (
          <CategoryList
            data={categories}
            typeCategoryLabel={typeCategoryLabel}
            onClick={handleSelectCategory}
            selectedCategory={selectedCategory}
          />
        )}
      </View>
      <View style={styles.sectionContainer}>
        {initialLoading ? (
          <View>
            <Spinner color="#2b2b2b" style={styles.loader} />
          </View>
        ) : (
          <ItemList
            handleLoadMore={handleLoadMore}
            handleLoadOld={handleLoadOld}
            loading={loading}
            data={items}
            onClick={handleSelectItem}
            props={props}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
    marginBottom: 100,
  },
  sectionContainer: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 50,
  },
});
