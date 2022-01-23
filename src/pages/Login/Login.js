import "./Login.css"
import React from "react"
// import axios from "axios"
import { Link } from "react-router-dom"
// import { login } from "../../utils/https/auth"
import Footer from "../../components/Footer"
import iconGoogle from "../../assets/icons/icon_google.png"
import { connect } from "react-redux"
import { loginAction } from "../../redux/actions/auth"
import Swal from "sweetalert2"

class Login extends React.Component {
  submitLogin = (e) => {
    e.preventDefault()
    const body = {
      email: e.target.email.value,
      password: e.target.password.value
    }
    this.props.loginDispatch(body)
  }

  componentDidUpdate() {
    if (this.props.auth.isFulfilled === true) {
      localStorage["vehicle-token"] = JSON.stringify(
        this.props.auth.userData.token
      )
      localStorage["user-photo"] = JSON.stringify(
        this.props.auth.userData.photo
      )
      localStorage["user-role"] = JSON.stringify(this.props.auth.userData.role)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "BERHASIL LOGIN",
        showConfirmButton: false,
        timer: 1500
      })
      this.props.history.push("/")
    }

    if (this.props.auth.isRejected === true) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Email atau Password Salah !!"
      })
    }
    console.log("CEK DATA", this.props.auth)
  }
  render() {
    return (
      <main className="container-fluid m-0 p-0">
        <section className="row position-relative bg-img">
          <div className="col-lg-6 col-md-6 col-sm-16 p-5 wrapper-left-side">
            <div className="col-lg-8 col-md-12 col-sm-12 left-side">
              <h1 className="title-login">Le’ts Explore The World</h1>
              <p className="no-account">Don't have account?</p>
              <Link to="/signup" className="">
                <button className="btn-signup-login">Sign Up</button>
              </Link>
            </div>
          </div>
          <div className="border-line-login position-absolute">
            <span></span>
            <span></span>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12  form mt-5 p-5">
            <form onSubmit={this.submitLogin}>
              <div className="col-12 p-3 ">
                <input
                  typeof="email"
                  placeholder="Email"
                  className="input-login"
                  name="email"
                />
              </div>
              <div className="col-12 p-3 ">
                <input
                  type="password"
                  placeholder="password"
                  className="input-login"
                  name="password"
                />
              </div>
              <Link to="/forgot" className="forgot p-3">
                Forgot password?
              </Link>
              <div className="col-12 p-3 mt-5">
                <button className="btn-login-login" type="submit">
                  Login
                </button>
              </div>
              <div className="col-12 p-3 ">
                <Link to="#">
                  <button className="btn-login-google" type="submit">
                    <img
                      src={iconGoogle}
                      alt="icon-google"
                      className="icon-google me-2"
                    />
                    Login google
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </section>
        <section className="row footer">
          <div className="col-lg-12">
            <Footer />
          </div>
        </section>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (body) => {
      dispatch(loginAction(body))
    }
  }
}

const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(Login)

export default AppWithRedux
