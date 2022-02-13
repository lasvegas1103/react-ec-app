import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.user;

export const getIsSignedIn = createSelector(
  [userSelector],
  (state) => state.isSignedIn
);
