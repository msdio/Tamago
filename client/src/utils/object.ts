export const isEmptyObj = (obj: Record<string, unknown>) => {
  if (obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  }

  return false;
};
