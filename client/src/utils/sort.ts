export const sortObjectByKeys = (unorderedObject: Record<string, number>) => {
  const orderedObject = Object.keys(unorderedObject)
    .sort()
    .reduce((obj: Record<string, number>, key: string) => {
      obj[key] = unorderedObject[key];
      return obj;
    }, {});

  return orderedObject;
};
