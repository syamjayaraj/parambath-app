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
import SearchBar from "../common/search-bar";
import CategoryList from "../common/category-list";
import ItemList from "../common/item-list";
import { apiDomain, pageSize } from "../../../config";
import {
  loadEvent,
  loadEventCategory,
  loadSliderEvent,
} from "../../../apiService";
import {
  IBusiness,
  ICategory,
  IPagination,
  ISliderHome,
} from "../../../models/model";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");

export default function ListComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [loading, setLoading] = useState<boolean>(false);
  const [slider, setSlider] = useState<ISliderHome[]>([]);

  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;
  const typeCategoryUrl = props.route.params.typeCategoryUrl;
  const typeCategoryLabel = props.route.params.typeCategoryLabel;

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
    loadSliderHomeFromApi();
    loadEventCategoryFromApi();
    loadEventFromApi(1);
  }, []);

  const loadSliderHomeFromApi = async (pageParam?: number) => {
    setLoading(true);
    const response = await loadSliderEvent();
    if (response) {
      setSlider(response?.data);
      setLoading(false);
    }
  };

  const loadEventCategoryFromApi = async () => {
    setLoading(true);
    const response = await loadEventCategory();
    if (response) {
      setCategories(response?.data);
      setLoading(false);
    }
  };

  const loadEventFromApi = async (pageParam?: number) => {
    setLoading(true);
    let fields = ["name", "nameMalayalam"];
    let sort = ["name"];
    if (type === "bus-timings") {
      fields = [...fields, "time"];
      sort = ["time"];
    }
    let params = {
      type: type,
      fields: fields,
      sort: sort,
      populate: [typeCategory],
      searchText: searchText,
      pageNumber: pageParam ? pageNumber : pageNumber,
      pageSize: pageSize,
    };
    const response = await loadEvent(params);
    if (response) {
      setItems(response?.data);
      setPagination(response?.meta);
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if ((pagination?.pagination?.total as number) < pageSize) {
    } else {
      loadEventFromApi(pageNumber + 1);
      setPageNumber(pageNumber + 1);
    }
  };

  useEffect(() => {
    loadEventFromApi();
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
    } else if (item?.attributes?.auto?.data !== null) {
      mainProp = "Auto";
      type = "autos";
      id = item?.attributes?.auto?.data?.id;
    } else if (item?.attributes?.emergency?.data !== null) {
      mainProp = "Emergency";
      type = "emergencies";
      id = item?.attributes?.emergency?.data?.id;
    } else if (item?.attributes?.small_business?.data !== null) {
      mainProp = "SmallBusiness";
      type = "small-businesses";
      id = item?.attributes?.small_business?.data?.id;
    } else if (item?.attributes?.small_business?.data !== null) {
      mainProp = "Worker";
      type = "workers";
      id = item?.attributes?.worker?.data?.id;
    } else if (item?.attributes?.online_service?.data !== null) {
      mainProp = "OnlineService";
      type = "online-services";
      id = item?.attributes?.online_service?.data?.id;
    } else if (item?.attributes?.vehicle?.data !== null) {
      mainProp = "Vehicle";
      type = "vehicles";
      id = item?.attributes?.vehicle?.data?.id;
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
