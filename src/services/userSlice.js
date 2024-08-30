import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  status: "notAuth",
  firstName: "",
  secondName: "",
  role: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserToken: {
      reducer(state, action) {
        state.userId = action.payload.userId;
        state.status = action.payload.status;
        state.firstName = action.payload.firstName;
        state.secondName = action.payload.secondName;
        state.role = action.payload.role;
      },
      prepare(userId, status, firstName, secondName, role) {
        return {
          payload: {
            userId,
            status,
            firstName,
            secondName,
            role,
          },
        };
      },
    },
    userLogout(state) {
      state.status = "notAuth";
      state.userId = "";
      state.firstName = "";
      state.secondName = "";
      state.role = "";
    },
  },
});

export const getUserId = (state) => state.user.userId;

export const { getUserToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
