import { AsyncStorage } from "react-native";

saveJsonData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(error.message);
  }
};

loadJsonData = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    const itemJson = JSON.parse(item);
    return itemJson;
  } catch (error) {
    console.log(error.message);
  }
};

saveStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

loadStringData = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(error);
  }
};

loadAllData = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    return keys;
  } catch (error) {
    console.log(error.message);
  }
};

removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error.message);
  }
};

removeAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error.message);
  }
};

export default {
  saveJsonData,
  loadJsonData,
  loadAllData,
  removeData,
  removeAllData,
  saveStringData,
  loadStringData
};
