/* --------------> Sale Price Calculator <--------------- */
export const calculateSalePrice = (quantity: number, price: number) => {
  return quantity * price;
};

/* --------------> Sale At Date Format <--------------- */
export const formatDate = (dateTime: string) => {
  return new Date(dateTime).toDateString();
};
