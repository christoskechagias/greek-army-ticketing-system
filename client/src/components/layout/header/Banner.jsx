import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners } from "../../../redux/features/user/actions/appActions";

function Banner() {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchBanners());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex animate-marquee whitespace-nowrap">
        {banners.map((banner) => (
          <div key={banner._id} className="flex items-center mr-10">
            <h3 className="font-bold text-xl">{banner.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
