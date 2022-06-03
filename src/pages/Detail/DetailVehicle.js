import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import "./Detail.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import defaultImage from "../../assets/images/vehicle-default.jpg";
import { Link } from "react-router-dom";
import {
  getVehicleApi,
  getVehiclePopularIdApi,
} from "../../utils/https/vehicles";
import { numberToRupiah } from "../../utils/helper/currency";

function DetailVehicle(props) {
  const { match } = props;
  const url = match.url;
  const role = useSelector((state) => state.auth.userData.role);
  const [vehicle, setVehicle] = useState([]);
  const [vehiclePopular, setvehiclePopular] = useState([]);
  const [stock, setStock] = useState(null);
  const [photo, setPhoto] = useState([]);
  const [stockPopular, setStockPopular] = useState(null);
  const [photoPopular, setPhotoPopular] = useState([]);
  const id = props.match.params.id;

  // console.log(process.env.REACT_APP_HOST + photo[0]);
  // console.log(vehicle);

  const checkUrlPopular = useCallback((url) => {
    const stringPopular = url.substring(10, 17);
    return stringPopular;
  }, []);

  const getVehiclePopular = useCallback(() => {
    getVehiclePopularIdApi(id)
      .then((res) => {
        if (res.status === 200) {
          setvehiclePopular(res.data.result[0]);
          setPhotoPopular(JSON.parse(res.data.result[0].photo));
          setStockPopular(parseInt(res.data.result[0].stock));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const getVehicle = useCallback(() => {
    getVehicleApi(id)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setVehicle(res.data.result[0]);
          setPhoto(JSON.parse(res.data.result[0].photo));
          setStock(parseInt(res.data.result[0].stock));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // const onClickPrev = () => {
  //   setStock(stock !== 0 ? stock - 1 : 0);
  // };

  // const onClickNext = () => {
  //   setStock(stock + 1);
  // };

  useEffect(() => {
    // console.log("DETEAIL BIKE");
    checkUrlPopular(url);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkUrlPopular, url]);

  useEffect(() => {
    if (checkUrlPopular(url) !== "popular") return getVehicle();
    if (checkUrlPopular(url) === "popular") return getVehiclePopular();
  }, [getVehicle, getVehiclePopular, checkUrlPopular, url]);

  return (
    <main>
      <Header />

      <div className="row mt-5 ms-lg-5 d-md-flex justify-content-md-center container-main mb-lg-5">
        <div className="col-lg-12 p-0">
          <div className="col-lg-3 mb-5 d-flex flex-row align-items-center wrapper-link-detail">
            <Link to={`/vehicles/bike`} className="link-detail-0">
              <i className="fas fa-chevron-left fs-2"></i>
              <p className="ms-4 link-detail">Detail</p>
            </Link>
          </div>
        </div>

        <div className="col-lg-6 col-md-10 wrapper-img">
          {checkUrlPopular(url) !== "popular" ? (
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photo[0]
                  : defaultImage
              }
              alt="vehicle"
              className="img-thumb1 img-fluid p-0"
            />
          ) : (
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photoPopular[0]
                  : defaultImage
              }
              alt="vehicle"
              className="img-thumb1 img-fluid p-0"
            />
          )}
        </div>
        {Object.keys(vehicle).length === 0 &&
        Object.keys(vehiclePopular).length === 0 ? (
          <div className="col-lg-6 wrapper-text-detail col-md-10 mt-lg-0 mt-md-5 d-flex justify-content-center align-align-items-center">
            <h1>Loading ...</h1>
          </div>
        ) : checkUrlPopular(url) !== "popular" ? (
          <div className="col-lg-6 wrapper-text-detail col-md-10 mt-lg-0 mt-md-5">
            <h1 className="title-detail">
              {vehicle.name} <br />
              <span className="detail-title-location">{vehicle.location}</span>
            </h1>
            <div className="detail-status">
              <p className="avail">Available</p>
              <p className="no-pre">No Prepayment</p>
            </div>
            <div className="detail-vehicle">
              <p>Capacity : {vehicle.capacity} person</p>
              <p>Type : {vehicle.category}</p>
              <p>Reservation before 2 PM</p>
            </div>
            <div className="price">
              <p>
                Rp.
                {vehicle.length !== 0 ? numberToRupiah(vehicle.price) : " "}
                /day
              </p>
            </div>
          </div>
        ) : (
          <div className="col-lg-6 wrapper-text-detail col-md-10 mt-lg-0 mt-md-5">
            <h1 className="title-detail">
              {vehiclePopular.name} <br />
              <span className="detail-title-location">
                {vehiclePopular.location}
              </span>
            </h1>
            <div className="detail-status">
              <p className="avail">Available</p>
              <p className="no-pre">No Prepayment</p>
            </div>
            <div className="detail-vehiclePopular">
              <p>Capacity : {vehiclePopular.capacity} person</p>
              <p>Type : {vehiclePopular.category}</p>
              <p>Reservation before 2 PM</p>
            </div>
            <div className="price">
              <p>
                Rp.
                {vehiclePopular.length !== 0
                  ? numberToRupiah(vehiclePopular.price)
                  : " "}
                /day
              </p>
            </div>
          </div>
        )}

        {checkUrlPopular(url) !== "popular" ? (
          <div className="col-lg-6 d-flex flex-row justify-content-between p-4 wrapper-carosel">
            <button className="btn-left">
              <i className="fas fa-chevron-left"></i>
            </button>
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photo[1]
                  : defaultImage
              }
              alt="bike"
              className="img-fluid img-thumb2"
            />
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photo[2]
                  : defaultImage
              }
              alt="bike"
              className="img-fluid img-thumb2"
            />

            <button className="btn-right">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        ) : (
          <div className="col-lg-6 d-flex flex-row justify-content-between p-4 wrapper-carosel">
            <button className="btn-left">
              <i className="fas fa-chevron-left"></i>
            </button>
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photoPopular[1]
                  : defaultImage
              }
              alt="bike"
              className="img-fluid img-thumb2"
            />
            <img
              src={
                photo !== null
                  ? process.env.REACT_APP_HOST + photoPopular[2]
                  : defaultImage
              }
              alt="bike"
              className="img-fluid img-thumb2"
            />

            <button className="btn-right">
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        )}
        {checkUrlPopular(url) !== "popular" ? (
          <div className="col-lg-6 d-flex flex-row justify-content-around align-items-center  ps-5 pe-5">
            <button className="btn-minus">
              <i className="fas fa-minus"></i>
            </button>
            <p className="number">{isNaN(stock) ? 0 : stock}</p>
            <button className="btn-plus">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        ) : (
          <div className="col-lg-6 d-flex flex-row justify-content-around align-items-center  ps-5 pe-5">
            <button className="btn-minus">
              <i className="fas fa-minus"></i>
            </button>
            <p className="number">{isNaN(stockPopular) ? 0 : stockPopular}</p>
            <button className="btn-plus">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        )}

        <div className="col-lg-12 d-flex justify-content-around">
          <Link to="/vehicles/popular/chat">
            <button className="btn-chat-admin">Chat Admin</button>
          </Link>
          {role !== "2" ? (
            <Link to={{ pathname: "/vehicles/reservation", state: { id } }}>
              <button className="btn-reservation">Reservation</button>
            </Link>
          ) : (
            <Link to={{ pathname: "/vehicles/edit", state: { id } }}>
              <button className="btn-reservation">Edit Item</button>
            </Link>
          )}
          {/* <Link to="/reservation">Reservation</Link> */}
          <button className="btn-like">
            <i className="fas fa-heart me-2"></i>
            Like
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default DetailVehicle;
