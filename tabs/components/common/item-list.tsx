import { Box, HStack, Spacer, Spinner, Text, VStack, View } from "native-base";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-bidirectional-infinite-scroll";
import ItemComponent from "../item";
import ItemBusTimingComponent from "../item-bus-timing";

interface customProps {
  loading: boolean;
  data: any;
  onClick: (categoryId: string) => void;
  props: any;
  handleLoadMore: () => Promise<void>;
  handleLoadOld: () => Promise<void>;
}

export default function ItemList({
  loading,
  data,
  onClick,
  props,
  handleLoadMore,
  handleLoadOld,
}: customProps) {
  const type = props?.route?.params?.type;
  const typeCategory = props?.route?.params?.typeCategory;
  const mainProp = props?.route?.params?.main;

  return (
    <View>
      {type === "bus-timings" && (
        <>
          {/* <View style={styles.item}>
            <Box>
              <HStack space={[3, 3]} justifyContent="space-between">
                <VStack></VStack>
                <Spacer />
                <View>
                  <Text
                    color="coolGray.600"
                    _dark={{
                      color: "warmGray.200",
                    }}
                    fontSize={12}
                    style={styles.parambath}
                  >
                    പറമ്പത്ത് സ്റ്റോപ്പ്
                  </Text>
                </View>
              </HStack>
            </Box>
          </View> */}
          <FlatList
            initialNumToRender={20}
            data={data}
            keyExtractor={(item: any) => item?.id?.toString()}
            onStartReached={handleLoadOld}
            onEndReached={handleLoadMore}
            showDefaultLoadingIndicators={true}
            onStartReachedThreshold={10}
            onEndReachedThreshold={10}
            activityIndicatorColor={"#2b2b2b"}
            HeaderLoadingIndicator={() =>
              loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
            }
            FooterLoadingIndicator={() =>
              loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
            }
            enableAutoscrollToTop={false}
            renderItem={({ item, index }) => (
              <ItemBusTimingComponent
                item={item}
                typeCategory={typeCategory}
                index={index}
              />
            )}
          />
        </>
      )}
      {type !== "bus-timings" && (
        <>
          <FlatList
            initialNumToRender={20}
            data={data}
            keyExtractor={(item: any) => item?.id?.toString()}
            onStartReached={handleLoadOld}
            onEndReached={handleLoadMore}
            showDefaultLoadingIndicators={true}
            onStartReachedThreshold={10}
            onEndReachedThreshold={10}
            activityIndicatorColor={"#2b2b2b"}
            HeaderLoadingIndicator={() =>
              loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
            }
            FooterLoadingIndicator={() =>
              loading ? <Spinner color="#2b2b2b" style={styles.loader} /> : null
            }
            enableAutoscrollToTop={false}
            renderItem={({ item, index }) => (
              <ItemComponent
                item={item}
                props={props}
                mainProp={mainProp}
                type={type}
                typeCategory={typeCategory}
                index={index}
              />
            )}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginTop: 50,
    marginBottom: 100,
  },
  item: {
    marginBottom: 20,
  },
  time: {
    fontSize: 17,
    fontWeight: "100",
    display: "flex",
    flexDirection: "row",
  },
  parambath: {
    fontSize: 8,
  },
});
