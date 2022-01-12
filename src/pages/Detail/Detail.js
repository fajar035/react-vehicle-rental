import React from "react"
import "./Detail.css"
import Bike from "../../assets/images/sepeda_detail.webp"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Link } from "react-router-dom"

class Detail extends React.Component {
  state = {
    counter: 0,
    price: 70
  }

  onClickPrev = () => {
    const price = this.state.price
    const number = this.state.counter
    this.setState({
      counter: number - 1,
      price: price / 2
    })
  }

  onClickNext = () => {
    const number = this.state.counter
    const price = this.state.price
    this.setState({
      counter: number + 1,
      price: price * 2
    })
  }

  onClickReservaion = () => {}

  render() {
    // console.log(this.state)
    return (
      <main>
        <Header />

        <div className="row mt-5 ms-lg-5 d-md-flex justify-content-md-center container-main mb-lg-5">
          <div className="col-lg-12 p-0">
            <div className="col-lg-3 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
              <Link to={`/vehicles/popular`} className="link-detail-0">
                <i className="fas fa-chevron-left fs-2"></i>
                <p className="ms-4 link-detail">Detail</p>
              </Link>
            </div>
          </div>

          <div className="col-lg-6 col-md-10 wrapper-img">
            <img
              src={Bike}
              alt="vehicle"
              className="img-thumb1 img-fluid p-0"
            />
          </div>

          <div className="col-lg-6 wrapper-text-detail col-md-10 mt-lg-0 mt-md-5">
            <h1 className="title-detail">
              Fixie - Gray Only <br />
              <span className="detail-title-location">Yogyakarta</span>
            </h1>
            <div className="detail-status">
              <p className="avail">Available</p>
              <p className="no-pre">No Prepayment</p>
            </div>
            <div className="detail-vehicle">
              <p>Capacity : 1 person</p>
              <p>Type : Bike</p>
              <p>Reservation before 2 PM</p>
            </div>
            <div className="price">
              <p>Rp.{this.state.price}.000/day</p>
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-row justify-content-between p-4 wrapper-carosel">
            <button className="btn-left">
              <i className="fas fa-chevron-left"></i>
            </button>
            <img src={Bike} alt="bike" className="img-fluid img-thumb2" />
            <img src={Bike} alt="bike" className="img-fluid img-thumb2" />
            <button className="btn-right">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>

          <div className="col-lg-6 d-flex flex-row justify-content-around align-items-center  ps-5 pe-5">
            <button className="btn-minus" onClick={this.onClickPrev}>
              <i className="fas fa-minus"></i>
            </button>
            <p className="number">{this.state.counter}</p>
            <button className="btn-plus" onClick={this.onClickNext}>
              <i className="fas fa-plus"></i>
            </button>
          </div>

          <div className="col-lg-12 d-flex justify-content-around">
            <button className="btn-chat-admin">Chat Admin</button>
            <button className="btn-reservation">Reservation</button>
            {/* <Link to="/reservation">Reservation</Link> */}
            <button className="btn-like">
              <i className="fas fa-heart me-2"></i>
              Like
            </button>
          </div>
        </div>

        <Footer />
      </main>
    )
  }
}

export default Detail
