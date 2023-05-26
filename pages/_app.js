import BaseLayout from "../components/Common/BaseLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
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

export default MyApp;
