import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";

function BaseLayout({ children }) {
  const router = useRouter();
  return (
    <>
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
