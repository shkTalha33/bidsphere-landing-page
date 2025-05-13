export const formatPrice = (price) => {
  if (typeof price !== "number") return "N/A";

  return `${price} LYD`;
};
