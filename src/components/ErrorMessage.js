import React, { Component } from "react"
// import "../assets/css/ErrorMsg.css"
import closeSVG from "../assets/icons/close-svgrepo-com.svg"

export class ErrorMsg extends Component {
  // state={
  //     errMsg:this.props.msg
  // }
  onTrigger = (event) => {
    this.props.parentCallback(false)
    event.preventDefault()
  }
  escFunction = (event) => {
    if (event.keyCode === 27) {
      this.props.parentCallback(false)
      event.preventDefault()
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false)
  }
  render() {
    const errMsg = this.props.msg
    console.log("errmsg:", errMsg)
    return (
      <section className="col-12 error-wrapper" onClick={this.onTrigger}>
        <div className="error-container text-center">
          <div className="close-svg text-center align-middle col-12">
            <img src={closeSVG} alt="close x" width={35} height={35} />
            <h3>Oops!</h3>
          </div>
          <div className="col-12 text-center err-msg">{errMsg}</div>
          <button className="err-btn" onClick={this.onTrigger}>
            close
          </button>
        </div>
      </section>
    )
  }
}

export default ErrorMsg
