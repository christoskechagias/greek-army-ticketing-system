// HeaderDropdown.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown } from "antd";
import { logout } from "../../../redux/features/auth/authActions";

function HeaderDropdown() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.auth);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const onMenuClick = (e) => {
    if (e.key === "logoutButton") dispatch(logout());
  };

  const items = [
    {
      label: (
        <div className="text-sm text-center">
          <p>
            {profile?.rank.abbreviation +
              " (" +
              profile?.brand.abbreviation +
              ") "}
          </p>
          <p>{profile?.firstName + " " + profile?.lastName}</p>
        </div>
      ),
      key: "userInfo",
      disabled: true,
      className:
        "!text-black !cursor-default hover:bg-transparent !hover:cursor-default",
    },
    {
      type: "divider",
    },
    {
      label: <p className="text-[#4096FF] text-base text-center">Αποσύνδεση</p>,
      key: "logoutButton",
    },
  ];

  return (
    <Dropdown
      menu={{ items, onClick: onMenuClick }}
      trigger={["click"]}
      onOpenChange={() => setIsDropdownMenuOpen(!isDropdownMenuOpen)}
    >
      <Avatar
        className={`duration-300 cursor-pointer ${
          isDropdownMenuOpen ? "border border-[#F36061]" : "border border-white"
        }`}
        size="large"
      >
        {profile.firstName[0]}
      </Avatar>
    </Dropdown>
  );
}

export default HeaderDropdown;
