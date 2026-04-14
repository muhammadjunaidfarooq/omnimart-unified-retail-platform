import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserSlice {
  userData: IUser | null;
  junaid: null;
}

const initialState: IUserSlice = {
  userData: null,
  junaid: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
