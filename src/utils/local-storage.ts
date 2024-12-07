export const getValueFromLocalStorageObject = (
  storageKey: string,
  key: string,
) => {
  // Kiểm tra tính hợp lệ của tham số
  if (!storageKey || !key) {
    return null;
  }

  // Lấy dữ liệu từ localStorage
  const storedValue = localStorage.getItem(storageKey);
  if (!storedValue) {
    return null;
  }

  try {
    const parsedObject = JSON.parse(storedValue);

    if (
      parsedObject &&
      Object.prototype.hasOwnProperty.call(parsedObject, key)
    ) {
      return parsedObject[key];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
