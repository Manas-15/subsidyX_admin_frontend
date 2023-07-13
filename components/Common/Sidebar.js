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
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";

const sideBarItems = [
  {
    name: "Adminstrative Management",
    href: "/adminstrative_management",
    icon: "/Application.png",
  },
  {
    name: "Industry Category",
    href: "/industry_category",
    icon: "/industry category.png",
  },
  {
    name: "Industry Sectors",
    href: "/industry_sector",
    icon: "/industry sectors.png",
  },
  { name: "Questions", href: "/questions", icon: "/Application.png" },
  {
    name: "State Management",
    href: "/state_management",
    icon: "/State.png",
  },
  {
    name: "District Management",
    href: "/district_management",
    icon: "/District.png",
  },
  {
    name: "Taluka Management",
    href: "/taluka_management",
    icon: "/Taluka.png",
  },
  {
    name: "Department Management",
    href: "/department_management",
    icon: "/department.png",
  },
  {
    name: "Subsidy Management",
    href: "/subsidy/subsidy_management",
    icon: "/subsidy.png",
  },
  {
    name: "Report management",
    href: "/report_management",
    icon: "/report (1).png",
  },
  {
    name: "Employee Management",
    href: "/employee_management",
    icon: "/Employee.png",
  },
  {
    name: "Client Management",
    href: "/clients/client_management",
    icon: "/Client.png",
  },
  {
    name: "Operational Partner Management",
    href: "/operational_management",
    icon: "/partner.png",
  },
  {
    name: "Channel Partner Management",
    href: "/channel_partner_management",
    icon: "/Channel Partner.png",
  },
  {
    name: "Trusted Partner Management",
    href: "/trusted_partner_management",
    icon: "/Trusted  Associate Partner.png",
  },
  {
    name: "Application Management",
    href: "/application_management",
    icon: "/Application.png",
  },
  {
    name: "Quatation Management",
    href: "/quatation_management",
    icon: "/quotation.png",
  },
  { name: "Generate Form", href: "/generate_management", icon: "/forms.png" },
  {
    name: "Membership",
    href: "/membership_management",
    icon: "/subscription.png",
  },
  { name: "Logout", href: "/login", icon: "/logout.png" },
];

console.log(sideBarItems);
const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toogleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  let path = router?.pathname;

  useEffect(() => {
    const newPath = path.split("/");
    console.log(newPath);
    if (newPath[1] === "subsidy" || newPath[1].toLowerCase() === "clients") {
      path = newPath[2];
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
                    {/* <Icon /> */}
                    <Image src={Icon} alt="My Image" width={20} height={20} />
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
