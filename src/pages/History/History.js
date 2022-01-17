import React from "react"
import { Link } from "react-router-dom"

import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "./History.css"
import { history } from "../../utils/https/history"
import Splitter from "../../components/Splitter"

class History extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataHistory: [],
      isOk: false
    }
  }

  componentDidMount() {
    history()
      .then((res) => {
        this.setState({
          dataHistory: res.data.result,
          isOk: true
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    // console.log("DATA-HISTORY-STATE", this.state.dataHistory)
    const history = this.state.dataHistory
    const success = this.state.isOk
    return (
      <>
        <Header />
        <div className="row mb-5">
          <div className="col-lg-9 col-md-6 m-0 p-0 d-flex">
            <div className="container-fluid m-0 p-0 ">
              {/* Search */}
              <div className="row ms-4 mb-4">
                {/* Form */}
                <div className="col-lg-10 col-md-4">
                  <div className="col-lg-12 col-sm-12 col-md-12 border rounded-3 mt-5 container-input">
                    <input
                      typeof="search"
                      className="input-search-type-history"
                      placeholder="Search vehicle (ex. cars, cars name)"
                    />
                    <button
                      typeof="submit"
                      className="btn-search-type float-end">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </div>

                {/* Radio button */}
                <div className="col-lg-2 d-flex align-self-end flex-column">
                  <label
                    className="form-check-label d-flex justify-content-center mb-3"
                    htmlFor="flexCheckDefault">
                    Select
                  </label>
                  <div className="form-check d-flex justify-content-center">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </div>
              </div>

              {/* filter */}
              <div className="row ms-2">
                <div className="col-lg-3">
                  {" "}
                  <select
                    className="input-select dropdown-toggle p-2 ms-3 filter-history"
                    // value={this.state.selectValue}
                    // onChange={this.handleDropdownChange}
                    name="location">
                    <option disabled>Filter</option>
                    <option defaultValue="type">Type</option>
                    <option defaultValue="data-added">Date Added</option>
                    <option defaultValue="name">Name</option>
                    <option defaultValue="favorit">Favorite Product</option>
                  </select>
                </div>
              </div>

              <div className="row ms-4 mb-4">
                <div className="line-history"></div>
                <p className="week-history">A Week Ago</p>
              </div>

              {/* Card history */}
              {history.map((item, idx) => {
                const date_return = item.return_date
                const date_booking = item.booking_date
                const dateArr_booking = date_booking.split("-")
                const dateArr_return = date_return.split("-")
                const tanggal_return = dateArr_return[2].slice(0, 2)
                const tanggal_booking = dateArr_booking[2].slice(0, 2)
                const tahun_return = dateArr_return[0]

                const hostBackend = process.env.REACT_APP_HOST
                return (
                  <div key={idx} className="row">
                    <div className="col-lg-4 p-5">
                      <div className="wrapper-img-history rounded-3">
                        <img
                          src={hostBackend + item.photo}
                          alt="img-vehicle"
                          className="rounded-3"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 p-5">
                      <div className="wrapper-detail-history">
                        <p className="title-history-detail">{item.vehicle}</p>
                        <p className="date-history-detail">{`${tanggal_booking} To ${tanggal_return} ${tahun_return}`}</p>
                        <p className="prepayment-history-detail">
                          Prepayment : Rp. {item.price}
                        </p>
                        <p className="status-history-detail">Has Been Return</p>
                      </div>
                    </div>
                    <div className="col-lg-2  d-flex justify-content-center align-items-center">
                      <div className="form-check ">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="col-lg-3  wrapper-new-arival">
            <div className="conainer-fluid">
              <div className="row">
                <div className="col-lg-12 d-flex align-items-center justify-content-center  new-arival">
                  New Arival
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  }
}

export default History
