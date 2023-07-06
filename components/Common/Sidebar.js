import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { sidebarActions } from "../../redux/Actions/sidebarAction";
import { userActions } from "../../redux/Actions/userAction";

const sideBarItems = [
  {
    name: "Adminstrative Management",
    href: "/adminstrative_management",
    icon: MdDashboard,
  },
  { name: "Industry Category", href: "/industry_category", icon: MdDashboard },
  { name: "Industry Sectors", href: "/industry_sector", icon: MdDashboard },
  { name: "Questions", href: "/questions", icon: MdDashboard },
  { name: "State Management", href: "/state_management", icon: MdDashboard },
  {
    name: "District Management",
    href: "/district_management",
    icon: MdDashboard,
  },
  { name: "Taluka Management", href: "/taluka_management", icon: MdDashboard },
  { name: "Department Management", href: "/about", icon: MdDashboard },
  {
    name: "Subsidy Management",
    href: "/subsidy/subsidy_management",
    icon: MdDashboard,
  },
  { name: "Report management", href: "/report_management", icon: MdDashboard },
  { name: "Employee Management", href: "/about", icon: MdDashboard },
  { name: "Client Management", href: "/about", icon: MdDashboard },
  { name: "Operational Partner Management", href: "/about", icon: MdDashboard },
  { name: "Channel Partner Management", href: "/about", icon: MdDashboard },
  { name: "Application Management", href: "/about", icon: MdDashboard },
  { name: "Quatation Management", href: "/about", icon: MdDashboard },
  { name: "Generate Form", href: "/about", icon: MdDashboard },
  { name: "Membership", href: "/about", icon: MdDashboard },
  { name: "Logout", href: "/login", icon: MdDashboard },
];

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toogleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  let path = router?.pathname;

  useEffect(() => {
    const newPath = path.split("/");

    if (newPath?.[1] === "subsidy") {
      path = newPath?.[2];
    }
    const pathName = path
      .toLowerCase()
      .replace(/[^\w-]+/g, "")
      .replace("_", " ")
      .split(" ");

    const item = pathName
      .map((item) => {
        return item.charAt(0).toUpperCase() + item.slice(1);
      })
      .join(" ");
    dispatch(sidebarActions.selectedCategory(item));
  }, [router?.pathname]);

  const handleClick = (name) => {
    if (name === "Logout") {
      dispatch(userActions.logout());
    }
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
          {sideBarItems?.map(({ name, href, icon: Icon }, index) => {
            return (
              <li className="sidebar_item" key={index}>
                <Link
                  className="sidebar_link"
                  href={href}
                  onClick={() => handleClick(name)}
                >
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
