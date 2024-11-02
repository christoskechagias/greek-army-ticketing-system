import React, { useState } from "react";
import ContentWrapper from "../../../components/layout/content/ContentWrapper.jsx";
import { Menu } from "antd";
import { PiMegaphoneBold } from "react-icons/pi";
import { Outlet, useNavigate } from "react-router-dom";

const items = [
  {
    label: "Banners",
    key: "banner",
    icon: <PiMegaphoneBold size={15} className="-scale-x-100" />,
    path: "/admin/app/settings/banners",
  },
];

function Settings() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("banner");

  const onClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setCurrent(e.key);
      navigate(selectedItem.path);
    }
  };

  return (
    <ContentWrapper customStyle="h-full flex flex-col gap-3">
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </ContentWrapper>
  );
}

export default Settings;
