import { Dimensions, Image, StyleSheet, View } from "react-native";
import { apiDomain } from "../../../config";
import Carousel from "react-native-snap-carousel";
const { width } = Dimensions.get("window");

interface customProps {
  images: any;
}

export default function Slider({ images }: customProps) {
  let _renderItem = ({ item, index }: any) => {
    let itemImage = apiDomain + item?.attributes?.formats?.small?.url;

    return (
      <View
        style={{
          padding: 10,
        }}
        key={"slide" + index}
      >
        <Image
          style={{
            width: width - 50,
            height: 250,
            borderRadius: 10,
          }}
          source={{
            uri: itemImage,
          }}
        ></Image>
      </View>
    );
  };

  return (
    <>
      {images?.length !== 0 && (
        <Carousel
          showsHorizontalScrollIndicator={true}
          loop={true}
          autoplay={true}
          autoplayInterval={2500}
          autoplayDelay={1000}
          layout={"stack"}
          data={images}
          sliderWidth={width}
          itemWidth={width}
          renderItem={_renderItem}
        />
      )}
    </>
  );
}
