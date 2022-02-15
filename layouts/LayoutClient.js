import React from "react";
import Head from "next/head";
import FooterBox from "../Components/Footer/FooterBox";
import Header from "../Components/Header/Header";
import { ToastContainer, toast } from "react-toastify";
// import MessengerCustomerChat from "../Components/react-messenger/react-messenger-customer-chat";
import MessengerCustomerChat from 'react-messenger-customer-chat';

const LayoutClient = ({ children }) => {
  return (
    <div className="layout1">
      <Header />
      <div>{children}</div>

      <FooterBox />
      {/* <MessengerCustomerChat
        // pageId="503486866782616"
        // appId="403668491128518"
        // htmlRef="<REF_STRING>"
        pageId="141259733037430"
        appId="479802529808660"
        htmlRef={window.location.pathname}
        //htmlRef="<REF_STRING>"
      /> */}
      <ToastContainer />
    </div>
  );
};

export default LayoutClient;
