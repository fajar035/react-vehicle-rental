import React from "react";
import ReactDOM from "react-dom";
import MainRouter from "./MainRouter";
import "./index.css";
// import Sweetalertdemo from "./components/sweetalert"

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />
    {/* <Sweetalertdemo /> */}
  </React.StrictMode>,
  document.getElementById("main")
);
