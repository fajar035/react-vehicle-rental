import { useState, useEffect, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  getVehiclesPopularApi,
  getVehiclesCarsApi,
  getVehiclesMotorBikeApi,
  getVehicleBikeApi
} from "../../utils/https/vehicles";
import "./Vehicles.css";
import Header from "../../components/Header";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import popular from "../../assets/images/popular-default.jpg";
import car from "../../assets/images/car-default.jpg";
import bike from "../../assets/images/bike-default.jpeg";
import motorbike from "../../assets/images/motorbike-default.jpg";

import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

function Vehicles() {
  let { url } = useRouteMatch();
  const [vehiclesBike, setVehiclesBike] = useState([]);
  const [vehiclesMotorBike, setVehiclesMotorBike] = useState([]);
  const [vehiclesCars, setVehiclesCars] = useState([]);
  const [vehiclesPopular, setVehiclesPopular] = useState([]);
  const [isOk, setisOk] = useState(false);

  const getVehiclesBike = useCallback(() => {
    getVehicleBikeApi()
      .then((res) => {
        const vehiclesBike = res.data.result;
        setVehiclesBike(vehiclesBike);

        setisOk(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getVehiclesMotorBike = useCallback(() => {
    getVehiclesMotorBikeApi()
      .then((res) => {
        const vehiclesMotorBike = res.data.result;
        setVehiclesMotorBike(vehiclesMotorBike);
        setisOk(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getVehiclesCars = useCallback(() => {
    getVehiclesCarsApi()
      .then((res) => {
        const vehiclesCars = res.data.result;
        setisOk(true);
        setVehiclesCars(vehiclesCars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getVehiclesPopular = useCallback(() => {
    getVehiclesPopularApi()
      .then((res) => {
        const vehiclesPopular = res.data.result;
        setisOk(true);
        setVehiclesPopular(vehiclesPopular);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getVehiclesBike();
    getVehiclesCars();
    getVehiclesPopular();
    getVehiclesMotorBike();
  }, [
    getVehiclesBike,
    getVehiclesPopular,
    getVehiclesMotorBike,
    getVehiclesCars
  ]);

  return (
    <main>
      <Header />
      {isOk ? (
        <div className="container px-4 mb-5">
          <div className="col-lg-12 col-sm-12 col-md-12 justify-content-center d-flex">
            <div className="col-lg-12 col-sm-12 col-md-12  border rounded-3 mt-5 container-input">
              <input
                typeof="search"
                className="input-search-type"
                placeholder="Search vehicle (ex. cars, cars name)"
              />
              <button typeof="submit" className="btn-search-type float-end">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* Popular */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            Popular in town
            <Link to={`${url}/popular`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesPopular.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/popular/detail/${item.id}`}
                    className="wrapper-img-home">
                    <img src={popular} className="img-size" alt="van_login" />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.vehicle} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bike */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            Bike
            <Link to={`${url}/bike`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/bike/detail/${item.id}`}
                    className="wrapper-img-home">
                    <img src={bike} className="img-size" alt="van_login" />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* MotorBike */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            MotorBike
            <Link to={`${url}/motorbike`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesMotorBike.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/motorbike/detail/${item.id}`}
                    className="wrapper-img-home">
                    <img src={motorbike} className="img-size" alt="van_login" />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Cars */}
          <h3 className="mb-5 mt-5 f-playfair-main">
            Cars
            <Link to={`${url}/cars`} className="float-end link-view-all">
              View all <i className="fas fa-chevron-right text-center ms-2"></i>
            </Link>
          </h3>

          {/* Card */}
          <div className="row position-relative mb-lg-5 wrapper-card">
            {vehiclesCars.map((item, idx) => {
              return (
                <div key={idx} className="col-lg-3 col-md-6 card  ">
                  <Link
                    to={`${url}/cars/detail/${item.id}`}
                    className="wrapper-img-home">
                    <img src={car} className="img-size" alt="van_login" />
                    <div className="city-type-vehicles  bg-light rounded shadow ">
                      <p className="mt-3">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <Footer />
    </main>
  );
}

export default Vehicles;
