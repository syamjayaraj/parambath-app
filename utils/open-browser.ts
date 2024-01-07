import * as WebBrowser from "expo-web-browser";

const openBrowser = async (params: any) => {
  try {
    let { url } = params;
    let result = await WebBrowser.openAuthSessionAsync(url, url, {
      showInRecents: true,
    });
  } catch (err: any) {}
};
export default openBrowser;
