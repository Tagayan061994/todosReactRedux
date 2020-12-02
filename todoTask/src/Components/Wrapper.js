import React from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";

const Wrapper = (props) => {
  return (
    <>
      <Header val={props.val} />
      {props.children}
      <Footer />
    </>
  );
};
export default Wrapper;
