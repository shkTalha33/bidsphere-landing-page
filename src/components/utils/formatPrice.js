export const formatPrice = (price) => {
    if (typeof price !== "number") return "N/A"; // Handle non-numeric values
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };
  