export const getTierLevel = (score: number) => {
  if (score <= 360) {
    return 1;
  } else if (score <= 630) {
    return 2;
  } else if (score <= 810) {
    return 3;
  } else if (score <= 900) {
    return 4;
  } else {
    return 5;
  }
};
