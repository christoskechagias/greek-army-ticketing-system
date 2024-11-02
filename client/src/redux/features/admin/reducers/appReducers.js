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

export const createBannerRequest = (state) => {
  state.loadingBanner = true;
};

export const createBannerSuccess = (state, action) => {
  state.loadingBanner = false;
  state.banners = [...state.banners, action.payload];
};

export const createBannerError = (state, action) => {
  state.loadingBanner = false;
  state.error = action.payload;
};

export const deleteBannerRequest = (state) => {
  state.loadingBanner = true;
};
export const deleteBannerSuccess = (state, action) => {
  state.loadingBanner = false;
  state.banners = state.banners.filter(
    (banner) => banner._id !== action.payload
  );
};
export const deleteBannerError = (state, action) => {
  state.loadingBanner = false;
  state.error = action.payload;
};

export const updateBannerRequest = (state) => {
  state.loadingBanner = true;
};
export const updateBannerSuccess = (state, action) => {
  state.loadingBanner = false;
  const updatedBanner = action.payload;
  state.banners = state.banners.map((banner) =>
    banner._id === updatedBanner._id ? updatedBanner : banner
  );
};
export const updateBannerError = (state, action) => {
  state.loadingBanner = false;
  state.error = action.payload;
};
