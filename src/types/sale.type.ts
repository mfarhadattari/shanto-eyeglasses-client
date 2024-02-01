import { IUser } from "../redux/features/Auth/authSlice";
import { TEyeglass } from "./eyeglass.type";

export type TSale = {
  _id: string;
  product: TEyeglass;
  productPrice: number;
  quantity: number;
  buyerName: string;
  seller: IUser;
  saleAt: Date;
};
