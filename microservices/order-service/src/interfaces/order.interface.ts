// src/interfaces/product.interface.ts
import { Document } from 'mongoose';

export interface Order extends Document {
    productId: String;
    quantity: Number;
    status: String;
}
