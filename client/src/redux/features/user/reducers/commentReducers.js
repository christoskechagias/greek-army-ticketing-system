export const createCommentRequest = (state, action) => {
  state.loadingComment = true;
};
export const createCommentSuccess = (state, action) => {
  state.loadingComment = false;
  state.comments.push(action.payload);
};
export const createCommentError = (state, action) => {
  state.loadingComment = false;
  state.error = action.payload;
};

export const fetchCommentsRequest = (state) => {
  state.loadingComments = true;
};
export const fetchCommentsSuccess = (state, action) => {
  state.loadingComments = false;
  state.comments = action.payload;
};
export const fetchCommentsError = (state, action) => {
  state.loadingComments = false;
  state.error = action.payload;
};
