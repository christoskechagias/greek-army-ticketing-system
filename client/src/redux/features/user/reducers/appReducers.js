export const fetchBannersRequest = (state) => {
  state.loadingBanners = true;
};

export const fetchBannersSuccess = (state, action) => {
  state.loadingBanners = false;
  state.banners = action.payload;
};

export const fetchBannersError = (state, action) => {
  state.loadingBanners = false;
  state.error = action.payload;
};
