import React from "react"
import ReactDOM from "react-dom"
import MainRouter from "./MainRouter"
import "./index.css"
// import TestRouter from "./testRouter"

ReactDOM.render(
  <React.StrictMode>
    <MainRouter />
    {/* <TestRouter /> */}
  </React.StrictMode>,
  document.getElementById("main")
)
