import { Share } from "react-native";

const onShare = async (item: any, itemCategoryProp: string) => {
  try {
    let sharableString = `${
      item.nameMalayalam ? item.nameMalayalam : item.name
    }${
      item[itemCategoryProp]?.data?.attributes?.nameMalayalam
        ? ", " + item[itemCategoryProp]?.data?.attributes?.nameMalayalam
        : item[itemCategoryProp]?.data?.attributes?.name
        ? ", " + item[itemCategoryProp]?.data?.attributes?.name
        : ", "
    }${item?.place ? ", " + item.place : ""} - ${
      item.ownerNameMalayalam
        ? "ഉടമ: " + item.ownerNameMalayalam + ", "
        : item.owner
        ? "ഉടമ: " + item.owner + ", "
        : ""
    }${item?.phoneNumber ? "ഫോൺ നമ്പർ:" + item?.phoneNumber : ""}${
      item?.phoneNumber2 ? ", ഫോൺ നമ്പർ(2):" + item?.phoneNumber2 : ""
    }${item.website ? ", വെബ്സൈറ്റ്: " + item.website : ""}`;
    const result = await Share.share({
      message: sharableString,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    alert(error.message);
  }
};

export default onShare;
