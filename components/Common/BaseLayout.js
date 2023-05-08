import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useRouter } from "next/router";

function BaseLayout({ children }) {
  const router = useRouter();
  console.log("routerrouterrouterrouter", router.pathname);
  return (
    <>
      {router.pathname === "/" ||
      router.pathname === "/login" ||
      router.pathname === "/forgotpassword" ? (
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
