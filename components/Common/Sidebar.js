import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import {
  MdDashboard,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

const sideBarItems = [
  { name: "Industry Category", href: "/", icon: MdDashboard },
  { name: "Industry Sectors", href: "/dashboard", icon: MdDashboard },
  { name: "Questions", href: "/about", icon: MdDashboard },
  { name: "State Management", href: "/about", icon: MdDashboard },
  { name: "Taluka Management", href: "/about", icon: MdDashboard },
  { name: "Department Management", href: "/about", icon: MdDashboard },
  { name: "Subsidy Management", href: "/about", icon: MdDashboard },
  { name: "Report management", href: "/about", icon: MdDashboard },
  { name: "Employee Management", href: "/about", icon: MdDashboard },
  { name: "Client Management", href: "/about", icon: MdDashboard },
  { name: "Operational Partner Management", href: "/about", icon: MdDashboard },
  { name: "Channel Partner Management", href: "/about", icon: MdDashboard },
  { name: "Application Management", href: "/about", icon: MdDashboard },
  { name: "Quatation Management", href: "/about", icon: MdDashboard },
  { name: "Generate Form", href: "/about", icon: MdDashboard },
  { name: "Membership", href: "/about", icon: MdDashboard },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };
  return (
    <div className="sidebar_wrapper">
      <button className="sidebar_btn" onClick={toogleSidebar}>
        {isCollapsed ? (
          <MdOutlineKeyboardArrowRight className="fs-4 text-light" />
        ) : (
          <MdOutlineKeyboardArrowLeft className="fs-4 text-light" />
        )}
      </button>
      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar_top">
          {/* <Image
            alt="logo"
            src={logo}
            width={80}
            height={80}
            className="sidebar_logo"
          /> */}
          <p className="sidebar_logo_name">SubsidyX</p>
        </div>
        <ul className="sidebar_list">
          {sideBarItems?.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar_item" key={name}>
                <Link href={href} className="sidebar_link">
                  <span className="sidebar_icon">
                    <Icon />
                  </span>
                  <span className="sidebar_name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;
