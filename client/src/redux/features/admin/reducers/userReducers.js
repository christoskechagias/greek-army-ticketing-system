// src/redux/slices/adminSlice/userReducers.js

export const fetchUsersRequest = (state) => {
  state.loadingUsers = true;
};
export const fetchUsersSuccess = (state, action) => {
  state.loadingUsers = false;
  state.users = action.payload.users;
  state.totalUsers = action.payload.totalUsers;
};
export const fetchUsersError = (state, action) => {
  state.loadingUsers = false;
  state.error = action.payload;
};

export const fetchUserRequest = (state) => {
  state.loadingUser = true;
};
export const fetchUserSuccess = (state, action) => {
  state.loadingUser = false;
  state.user = action.payload;
};
export const fetchUserError = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};

export const createUserRequest = (state) => {
  state.loadingUser = true;
};
export const createUserSuccess = (state) => {
  state.loadingUser = false;
};
export const createUserError = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};

export const updateUserRequest = (state) => {
  state.loadingUser = true;
};
export const updateUserSuccess = (state) => {
  state.loadingUser = false;
};
export const updateUserError = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};

export const deleteUserRequest = (state) => {
  state.loadingUser = true;
};
export const deleteUserSuccess = (state, action) => {
  state.loadingUser = false;
  state.users = state.users.filter((user) => user._id !== action.payload);
};
export const deleteUserError = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};

export const updateUserPasswordRequest = (state, action) => {
  state.loadingUser = true;
};
export const updateUserPasswordSuccess = (state, action) => {
  state.loadingUser = false;
};
export const updateUserPasswordError = (state, action) => {
  state.loadingUser = false;
  state.error = action.payload;
};
