import LocalizedStrings from "react-native-localization";
import { RTL_LANGS } from "../config";

export const localisedStrings = new LocalizedStrings({
	"en-GB": require("./en-GB.json"),
	"en-US": require("./en-US.json"),
	"zh-CN": require("./zh-CN.json"),
});

export const interfaceLangIsRTL = RTL_LANGS.includes(localisedStrings.getLanguage());