export const setLocalStorageData = (key: string, data: any) => {
  try {
    const serializableState = JSON.stringify(data);
    localStorage.setItem(key, serializableState);
  } catch (error) {
    console.log(
      "Error has occured while saving login data, Error Details:",
      error
    );
  }
};

export const getLocalStorageData = (key: string) => {
  try {
    const serializableState = localStorage.getItem(key);
    if (serializableState) {
      return JSON.parse(serializableState);
    } else {
      return null;
    }
  } catch (error) {
    console.log(
      "Error has occured while fetching login data, Error Details:",
      error
    );
  }
};
