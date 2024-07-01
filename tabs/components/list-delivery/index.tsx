import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Spinner } from "native-base";
import SearchBar from "../common/search-bar";
import { apiDomain, pageSize } from "../../../config";
import { loadItem, loadSliderDelivery } from "../../../apiService";
import {
  IBusiness,
  ICategory,
  IPagination,
  ISliderHome,
} from "../../../models/model";
import ItemList from "../common/item-list";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");

export default function ListDeliveryComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[]>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [sliderLoading, setSliderLoading] = useState<boolean>(false);
  const [slider, setSlider] = useState<ISliderHome[]>([]);

  const type = "businesses";
  const typeCategory = "business_category";

  let propsWithParams;
  propsWithParams = {
    ...props,
    route: {
      params: {
        type: "businesses",
        typeCategory: "business_category",
        typeCategoryUrl: "business-categories",
        typeCategoryLabel: "കാറ്റഗറി",
        main: "Business",
      },
    },
  };

  let filters: any = [];
  let fields = ["name", "nameMalayalam", "phoneNumber"];
  let sort = ["name"];
  if (type === "businesses") {
    filters = [
      {
        name: "onlineDelivery",
        value: true,
      },
    ];
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

  const handleSelectItem = (itemId: string) => {};

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
    loadSliderDeliveryFromApi();
  }, [type, typeCategory, selectedCategory, searchText]);

  const loadSliderDeliveryFromApi = async () => {
    setSliderLoading(true);
    const response = await loadSliderDelivery();
    if (response) {
      setSlider(response?.data);
      setSliderLoading(false);
    }
  };

  let _renderItem = ({ item, index }: any) => {
    let itemImage =
      apiDomain +
      item?.attributes?.image?.data?.attributes?.formats?.small?.url;

    let mainProp = "Business";
    let type = "businesses";
    let id = item?.attributes?.business?.data?.id;

    return (
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() =>
          props?.navigation?.navigate(mainProp, {
            itemId: id,
            type: type,
          })
        }
        style={{
          padding: 10,
        }}
      >
        <Image
          style={{
            width: width - 20,
            height: 250,
            borderRadius: 10,
          }}
          source={{
            uri: itemImage,
          }}
        ></Image>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {sliderLoading ? (
        <View
          style={{
            width: width - 20,
            height: 200,
            borderRadius: 10,
            backgroundColor: "#f1f1f1",
            marginLeft: 10,
            marginTop: 20,
          }}
        ></View>
      ) : (
        <View
          style={{
            marginTop: 20,
          }}
        >
          {slider?.length !== 0 && (
            <Carousel
              showsHorizontalScrollIndicator={true}
              loop={true}
              autoplay={true}
              autoplayInterval={2500}
              autoplayDelay={1000}
              layout={"default"}
              data={slider}
              sliderWidth={width}
              itemWidth={width}
              renderItem={_renderItem}
            />
          )}
        </View>
      )}
      <View>
        <SearchBar onSearchData={handleSearch} categories={categories} />
        {/* {categoryLoading ? (
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
        )} */}
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
            props={propsWithParams}
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
