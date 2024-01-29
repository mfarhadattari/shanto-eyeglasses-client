import moment from "moment";

/* --------------> Sale Price Calculator <--------------- */
export const calculateSalePrice = (quantity: number, price: number) => {
  return quantity * price;
};

/* --------------> Sale At Date Format <--------------- */
export const formatDate = (dateTime: string) => {
  return moment(dateTime).format("dddd, DD MMMM YYYY, HH:mm:ss");
};
