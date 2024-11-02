import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineDashboard } from "react-icons/md";
import { IoTicketOutline, IoSettingsOutline } from "react-icons/io5";
import { Layout, Menu } from "antd";
import { PiUsersThree } from "react-icons/pi";

const { Sider } = Layout;

const items = [
  {
    key: "dashboard",
    label: "DASHBOARD",
    icon: <MdOutlineDashboard style={{ fontSize: "20px" }} />,
    link: "/dashboard",
    accepted_roles: ["admin", "member"],
  },
  {
    key: "myTickets",
    label: "ΤΑ TICKETS ΜΟΥ",
    icon: <IoTicketOutline size={20} />,
    link: "/tickets/my",
    accepted_roles: ["admin", "user"],
  },
  {
    key: "allTickets",
    label: "ΟΛΑ ΤΑ TICKETS",
    icon: (
      <div className="mr-[7px]">
        <IoTicketOutline className="w-5 h-5 absolute top-[12px]" />
        <IoTicketOutline className="w-5 h-5 absolute top-1" />
      </div>
    ),
    link: "/admin/tickets",
    accepted_roles: ["admin"],
  },
  {
    key: "memberAllTickets",
    label: "ΟΛΑ ΤΑ TICKETS",
    icon: (
      <div className="mr-[7px]">
        <IoTicketOutline className="w-5 h-5 absolute top-[12px]" />
        <IoTicketOutline className="w-5 h-5 absolute top-1" />
      </div>
    ),
    link: "/member/tickets/all",
    accepted_roles: ["member"],
  },
  {
    key: "allUsers",
    label: "ΧΡΗΣΤΕΣ",
    icon: <PiUsersThree size={25} />,
    link: "/admin/users",
    accepted_roles: ["admin"],
  },
  {
    key: "settings",
    label: "ΡΥΘΜΙΣΕΙΣ",
    icon: <IoSettingsOutline size={20} />,
    link: "/admin/app/settings/banners",
    accepted_roles: ["admin"],
  },
];

function Sidebar() {
  const { profile } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const filterItems = (items) => {
    if (profile && profile.roles) {
      return items.filter(
        (item) =>
          item.accepted_roles.some((role) => profile.roles.includes(role)) &&
          item
      );
    }
  };

  const onClick = (e) => {
    const key = e.key;
    const findLink = (items) => {
      for (const item of items) {
        if (item.key === key && item.link) {
          return item.link;
        }
      }
      return null;
    };

    const link = findLink(items);
    if (link) navigate(link);
  };

  const getSelectedKey = () => {
    for (const item of items) {
      if (item.link === location.pathname) {
        return item.key;
      }
    }
    return "";
  };

  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        onClick={onClick}
        items={filterItems(items)}
        selectedKeys={[getSelectedKey()]}
      />
    </Sider>
  );
}

export default Sidebar;
