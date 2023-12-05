import { Share } from "react-native";

const onShare = async (item: any, itemCategoryProp: string) => {
  try {
    let sharableString = `${
      item.malayalamName
        ? item.malayalamName
        : item.malayalamTitle
        ? item.malayalamTitle
        : item.name
        ? item.name
        : item.title
        ? item.title
        : ""
    }${
      item[itemCategoryProp].malayalamName
        ? ", " + item[itemCategoryProp].malayalamName
        : ", " + item[itemCategoryProp].name
    }${item?.place ? ", " + item.place : ""} - ${
      item.ownerMalayalamName
        ? "ഉടമ: " + item.ownerMalayalamName + ", "
        : item.owner
        ? "ഉടമ: " + item.owner + ", "
        : ""
    }${item?.phoneNumber ? "ഫോൺ നമ്പർ:" + item?.phoneNumber : ""}${
      item?.phoneNumber2 ? ", ഫോൺ നമ്പർ(2):" + item?.phoneNumber2 : ""
    }${item.url ? ", വെബ്സൈറ്റ്: " + item.url : ""}`;

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
