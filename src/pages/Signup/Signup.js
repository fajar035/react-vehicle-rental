import React from "react";
// import axios from "axios"
import "./Signup.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import iconGoogle from "../../assets/icons/icon_google.png";
import axios from "axios";
import Swal from "sweetalert2";

class Signup extends React.Component {
  render() {
    const signUpSubmit = (e) => {
      // console.log(e)
      e.preventDefault();
      const body = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value
      };

      const url = `${process.env.REACT_APP_HOST}/auth/register`;
      axios
        .post(url, body)
        .then((res) => {
          // console.log(res)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Successfully Registered",
            showConfirmButton: false,
            timer: 1500
          });
          return this.props.history.replace("/login");
        })
        .catch((err) => {
          console.log(err.response);
          if (err.response.status === 406) {
            Swal.fire({
              position: "center",
              icon: "warning",
              title: err.response.data.message,
              timer: 2000,
              showConfirmButton: false
            });
          }
        });
    };
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
            <form onSubmit={signUpSubmit}>
              <div className="col-12 p-3 ">
                <input
                  required
                  typeof="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="input-login"
                />
              </div>
              <div className="col-12 p-3 ">
                <input
                  required
                  typeof="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="input-login"
                  autoComplete="false"
                />
              </div>
              <div className="col-12 p-3 mb-5">
                <input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  className="input-login"
                />
              </div>

              <div className="col-12 p-3 ">
                <button className="btn-login-login" type="submit">
                  Sign Up
                </button>
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
    );
  }
}

export default Signup;
