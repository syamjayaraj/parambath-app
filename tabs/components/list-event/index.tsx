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
import CategoryListEvent from "../common/category-list-event";
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
import ItemListEvent from "../common/item-list-event";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");

export default function ListWithCarouselEventComponent(props: any) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [items, setItems] = useState<IBusiness[] | undefined>([]);
  const [pagination, setPagination] = useState<IPagination>();
  const [sliderLoading, setSliderLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [slider, setSlider] = useState<ISliderHome[]>([]);

  const type = props.route.params.type;
  const typeCategory = props.route.params.typeCategory;

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
    loadSliderEventFromApi();
    loadEventCategoryFromApi();
    loadEventFromApi(1);
  }, []);

  const loadSliderEventFromApi = async () => {
    setSliderLoading(true);
    const response = await loadSliderEvent();
    if (response) {
      setSlider(response?.data);
      setSliderLoading(false);
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
    let fields = ["name", "nameMalayalam", "from", "to"];
    let filters: any = [];
    let sort = ["from:desc", "to:desc"];
    let params = {
      type: type,
      fields: fields,
      filters: filters,
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

    let mainProp = "Event";
    let type = "events";
    let id = item?.attributes?.event?.data?.id;

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
          <View>
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
          {/* <CategoryListEvent onClick={handleSelectCategory} /> */}
        </View>
        <View style={styles.sectionContainer}>
          <ItemListEvent
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
