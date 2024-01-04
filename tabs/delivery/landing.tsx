import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { Box } from "native-base";
import SearchBar from "../components/common/search-bar";
import CategoryList from "../components/common/category-list";
import ItemList from "../components/common/item-list";
import { apiDomain, pageSize } from "../../config";
import { loadItem, loadItemCategory, loadSliderEvent } from "../../apiService";
import {
  IBusiness,
  ICategory,
  IPagination,
  ISliderHome,
} from "../../models/model";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");

export default function LandingDelivery(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [slider, setSlider] = useState<ISliderHome[]>([]);

  const type = "businesses";
  const typeCategory = "business_category";
  const typeCategoryUrl = "business-categories";
  const typeCategoryLabel = "കാറ്റഗറി";
  const main = "Business";

  const handleSearch = (param: string) => {
    setSearchText(param);
  };

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const handleSelectItem = (itemId: string) => {};

  useEffect(() => {
    loadSliderHomeFromApi();
    loadItemCategoryFromApi();
    loadItemFromApi(1);
  }, []);

  const loadSliderHomeFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadSliderEvent();
    if (response) {
      setSlider(response?.data);
      setLoading(false);
    }
  };

  const loadItemCategoryFromApi = async () => {
    setLoading(true);
    let filters: any = [
      {
        name: "onlineDelivery",
        value: true,
      },
    ];
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
    let filters: any = [
      {
        name: "onlineDelivery",
        value: true,
      },
    ];
    let fields = ["name", "nameMalayalam"];
    let sort = ["name"];
    let params = {
      type: type,
      filters: filters,
      fields: fields,
      sort: sort,
      populate: [typeCategory],
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
  }, [searchText]);

  let _renderItem = ({ item, index }: any) => {
    let itemImage =
      apiDomain +
      item?.attributes?.image?.data?.attributes?.formats?.small?.url;

    let mainProp = "";
    let type = "";
    let id = "";

    if (item?.attributes?.business?.data !== null) {
      mainProp = "Business";
      type = "businesses";
      id = item?.attributes?.business?.data?.id;
    } else if (item?.attributes?.small_business?.data !== null) {
      mainProp = "SmallBusiness";
      type = "small-businesses";
      id = item?.attributes?.small_business?.data?.id;
    }
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
    <Box bg={"white"} mt={2}>
      <SafeAreaView>
        {loading ? (
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
          <View>
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
          </View>
        )}
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
