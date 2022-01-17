import React from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"

function Reservation() {
  return (
    <>
      <Header />

      <div className="row mt-5 ms-lg-5 d-md-flex justify-content-md-center container-main mb-lg-5">
        <div className="col-lg-12 p-0">
          <div className="col-lg-4 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
            <Link to="" className="link-detail-0 ">
              <i className="fas fa-chevron-left fs-2"></i>
            </Link>
            <p className="ms-4 link-detail">Add New Item</p>
          </div>
        </div>
        <div className="col-lg-6 ">kolom foto</div>
        <div className="col-lg-6 ">kolom form</div>
      </div>

      <Footer />
    </>
  )
}

export default Reservation
