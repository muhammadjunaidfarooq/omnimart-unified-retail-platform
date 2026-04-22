import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface for the Document
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  location?: {
    type: {
      type: StringConstructor;
      enum: string[];
      default: string;
    };
    coordinates: {
      type: NumberConstructor[];
      default: number[];
    };
  };
  socketId: string | null;
  isOnline: boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true, // Removes accidental spaces
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true, // Always store emails in lowercase
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: false, // This allows Google users to stay password-less
      select: false, // Prevents password from leaking in API responses
    },
    mobile: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },
    image: {
      type: String,
      required: false,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },
    socketId: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

userSchema.index({ location: "2dsphere" });

// 2. Singleton pattern to prevent re-compiling the model
// const User: Model<IUser> =
//   mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
