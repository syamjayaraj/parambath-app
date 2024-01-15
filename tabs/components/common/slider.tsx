import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { apiDomain } from "../../../config";
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
    <Carousel
      loop={true}
      autoPlay={true}
      autoPlayInterval={2500}
      layout={"stack"}
      data={images}
      width={width}
      renderItem={_renderItem}
    />
  );
}
