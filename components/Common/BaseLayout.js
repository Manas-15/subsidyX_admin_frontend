import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notification } from "antd";
import { alertActions } from "../../redux/Actions/alertAction";

function BaseLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch(alertActions.clear());
  }, [router.pathname]);

  if (alert.message) {
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 5000);
  }
  const openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message,
    });
  };
  return (
    <>
      {console.log("I am render")}
      {alert?.message && openNotificationWithIcon(alert?.type, alert?.message)}
      {router.pathname === "/" ||
      router.pathname === "/login" ||
      router.pathname === "/forgotpassword" ||
      router.pathname === "/resetpassword" ||
      router.pathname === "/changepassword" ? (
        <div className="base_layout">{children}</div>
      ) : (
        <div className="base_layout">
          <Sidebar />
          <main className="mainBodyWidth ml-auto w-100">
            <Header />

            <div>{children}</div>
          </main>
        </div>
      )}
    </>
  );
}

export default BaseLayout;
