export const fetchMembersRequest = (state) => {
  state.loadingMembers = true;
};

export const fetchMembersSuccess = (state, action) => {
  state.loadingMembers = false;
  state.members = action.payload;
};

export const fetchMembersError = (state, action) => {
  state.loadingMembers = false;
  state.error = action.payload;
};
