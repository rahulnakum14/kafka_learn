import { Schema } from 'mongoose';

export const OrderSchema = new Schema({
  productId: String,
  quantity: Number,
  status: String,
});
