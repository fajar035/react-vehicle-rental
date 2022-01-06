import React from "react"
import "./Signup.css"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"
import iconGoogle from "../../assets/icons/icon_google.png"

function Signup() {
  return (
    <main className="container-fluid m-0 p-0">
      <section className="row position-relative bg-img">
        <div className="col-lg-6 col-md-6 col-sm-16 p-5 wrapper-left-side">
          <div className="col-lg-8 col-md-12 col-sm-12 left-side">
            <h1 className="title-login">Le’ts Explore The World</h1>
            <p className="no-account">Don't have account?</p>
            <Link to="/login">
              <button className="btn-signup-login">login</button>
            </Link>
          </div>
        </div>
        <div className="border-line-signup position-absolute">
          <span></span>
          <span></span>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12  form mt-2 p-5">
          <form>
            <div className="col-12 p-3 ">
              <input typeof="text" placeholder="Name" className="input-login" />
            </div>
            <div className="col-12 p-3 ">
              <input
                typeof="email"
                placeholder="Email"
                className="input-login"
              />
            </div>
            <div className="col-12 p-3 mb-5">
              <input
                type="password"
                placeholder="password"
                className="input-login"
              />
            </div>

            <div className="col-12 p-3 ">
              <Link to="/login">
                <button className="btn-login-login" type="submit">
                  Sign Up
                </button>
              </Link>
            </div>
            <div className="col-12 p-3 ">
              <Link to="#">
                <button className="btn-login-google" type="submit">
                  <img
                    src={iconGoogle}
                    alt="icon-google"
                    className="icon-google"
                  />
                  Login google
                </button>
              </Link>
            </div>
          </form>
        </div>
      </section>
      <section className="row footer-signup">
        <div className="col-lg-12">
          <Footer />
        </div>
      </section>
    </main>
  )
}

export default Signup
