import React from "react"
import { Link } from "react-router-dom"
import "./Forgot.css"
import Footer from "../../components/Footer"

function Forgot() {
  return (
    <main className="container-fluid m-0 p-0">
      <section className="row position-relative d-flex justify-content-center bg-img-forgot">
        <div className="col-10">
          <div className="back-forgot col-2">
            <Link to="/login" className="link-back-forgot">
              <i className="fas fa-chevron-left me-5"></i>
              Back
            </Link>
          </div>
          <div className="body-forgot">
            <h1 className="title-forgot">Do’t worry, we got your back!</h1>
            <form className="form-forgot col-lg-6 col-sm-12 col-md-8 ">
              <input
                typeof="email"
                placeholder="Enter your email address"
                className="input-email-forgot"
              />
              <button type="submit" className="btn-link-forgot">
                Send Link
              </button>
            </form>
            <p className="resend-link-p col-8">
              You will receive a link to reset your password. If you haven’t
              received any link, click
              <Link to="#" className="resend-link">
                Resend Link
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Forgot
