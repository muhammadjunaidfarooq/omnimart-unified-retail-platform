import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface extending Mongoose Document
export interface IGrocery {
  _id? : mongoose.Types.ObjectId | string,
  name: string;
  category: string;
  price: string;
  unit: string; // e.g., "kg", "dozen", "piece"
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Define the Schema
const grocerySchema = new Schema<IGrocery>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Fruits & Vegetables",
        "Dairy & Eggs",
        "Rice, Atta & Grains",
        "Snacks & Biscuits",
        "Spices & Masalas",
        "Beverages & Drinks",
        "Personal Care",
        "Household Essentials",
        "Instant & Packaged Food",
        "Baby & Pet Care",
      ],
      required: true,
    },
    price: {
      type: String,
      required: true,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "g", "liter", "ml", "piece", "pack"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // Handles createdAt and updatedAt automatically
);

// 3. Prevent model re-compilation (Critical for Next.js)
const Grocery: Model<IGrocery> =
  mongoose.models.Grocery || mongoose.model<IGrocery>("Grocery", grocerySchema);

export default Grocery;
