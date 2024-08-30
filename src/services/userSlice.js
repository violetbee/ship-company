import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  status: "notAuth",
  firstName: "",
  secondName: "",
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
      },
      prepare(userId, status, firstName, secondName) {
        return {
          payload: {
            userId,
            status,
            firstName,
            secondName,
          },
        };
      },
    },
    userLogout(state) {
      state.status = "notAuth";
      state.userId = "";
    },
  },
});

export const getUserId = (state) => state.user.userId;

export const { getUserToken, userLogout } = userSlice.actions;

export default userSlice.reducer;
