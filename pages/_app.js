import BaseLayout from "../components/Common/BaseLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <>
        <Provider store={store}>
          <BaseLayout>
            <Component {...pageProps} />
            <ToastContainer theme="colored" />
          </BaseLayout>
        </Provider>
      </>
    );
  }
}

export default MyApp;
