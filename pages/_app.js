import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import { Accordion } from 'react-lib';
import { AccordionItem } from 'react-lib';
import store from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import "../styles/fontawesome/css/all.css";
import "../styles/globals.css";
import "../styles/globalsResponsive.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || ((page) => page);

    return getLayout(
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
MyApp.getInitialProps=async ({Component, ctx})=> {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    //Anything returned here can be accessed by the client
    return {pageProps: pageProps};
}
const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
