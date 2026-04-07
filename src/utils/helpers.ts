export const isEmpty = (obj: any) => {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
};

export const isNotEmptyArray = (data: any) => {
  return Array.isArray(data) && data?.length > 0;
};
