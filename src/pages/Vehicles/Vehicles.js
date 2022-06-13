import { useState, useEffect, useCallback } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import {
  getVehiclesPopularApi,
  getVehiclesCarsApi,
  getVehiclesMotorBikeApi,
  getVehiclesBikeApi
} from "../../utils/https/vehicles";
import "./Vehicles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import vehicleDefault from "../../assets/images/vehicle-default.jpg";
import Loading from "../../components/Loading/Loading.js";

function Vehicles() {
  let { url } = useRouteMatch();
  const [vehiclesBike, setVehiclesBike] = useState([]);
  const [vehiclesMotorBike, setVehiclesMotorBike] = useState([]);
  const [vehiclesCars, setVehiclesCars] = useState([]);
  const [vehiclesPopular, setVehiclesPopular] = useState([]);
  const [isOk, setisOk] = useState(false);
  const [isNull, setIsNull] = useState({
    popular: false,
    bike: false,
    motorbike: false,
    car: false
  });

  const getVehiclesBike = useCallback(() => {
    getVehiclesBikeApi()
      .then((res) => {
        const vehiclesBike = res.data.result;
        setVehiclesBike(vehiclesBike);
        console.log("VEHICLE-BIKE", vehiclesBike);

        setisOk(true);
        setIsNull({
          ...isNull,
          bike: false
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.result.data === "Data not found") {
          setisOk(false);
          setIsNull({
            ...isNull,
            bike: true
          });
        }
      });
  }, [isNull]);

  const getVehiclesMotorBike = useCallback(() => {
    getVehiclesMotorBikeApi()
      .then((res) => {
        const vehiclesMotorBike = res.data.result;
        setVehiclesMotorBike(vehiclesMotorBike);
        setisOk(true);
        setIsNull({
          ...isNull,
          motorbike: false
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.result.data === "Data not found") {
          setisOk(false);
          setIsNull({
            ...isNull,
            motorbike: true
          });
        }
      });
  }, [isNull]);

  const getVehiclesCars = useCallback(() => {
    getVehiclesCarsApi()
      .then((res) => {
        const vehiclesCars = res.data.result;
        setisOk(true);
        setVehiclesCars(vehiclesCars);
        setIsNull({
          ...isNull,
          card: false
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.result.data === "Data not found") {
          setisOk(false);
          setIsNull({
            ...isNull,
            car: true
          });
        }
      });
  }, [isNull]);

  const getVehiclesPopular = useCallback(() => {
    getVehiclesPopularApi()
      .then((res) => {
        const vehiclesPopular = res.data.result;
        setisOk(true);
        setVehiclesPopular(vehiclesPopular);
        setIsNull({
          ...isNull,
          popular: false
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.result.data === "Data not found") {
          setisOk(false);
          setIsNull({
            ...isNull,
            popular: true
          });
        }
      });
  }, [isNull]);

  // console.log(isOk);
  // console.log(isNull);

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  return (
    <main>
      <Header />
      {!isOk ? (
        <div className='container px-4 mb-5'>
          <div className='col-lg-12 col-sm-12 col-md-12 justify-content-center d-flex'>
            <div className='col-lg-12 col-sm-12 col-md-12  border rounded-3 mt-5 container-input'>
              <input
                typeof='search'
                className='input-search-type'
                placeholder='Search vehicle (ex. cars, cars name)'
              />
              <button
                typeof='submit'
                className='btn-search-type float-end'
              >
                <i className='fas fa-search'></i>
              </button>
            </div>
          </div>

          {/* Popular */}
          <h3 className='mb-5 mt-5 f-playfair-main'>
            Popular in town
            <Link
              to={`${url}/popular`}
              className='float-end link-view-all'
            >
              View all{" "}
              <i className='fas fa-chevron-right text-center ms-2'></i>
            </Link>
          </h3>

          {/* Card */}
          {isNull.popular ? (
            <div className='row position-relative mb-lg-5 wrapper-card'>
              <div className='col-lg-3 col-md-6 '>
                <p>No data</p>
              </div>
            </div>
          ) : (
            <div className='row position-relative mb-lg-5 wrapper-card'>
              {vehiclesPopular.map((item, idx) => {
                const photos = item.photo;
                const photo = JSON.parse(photos);
                const photoUrl =
                  process.env.REACT_APP_HOST + photo[0];

                return (
                  <div key={idx} className='col-lg-3 col-md-6 card  '>
                    <Link
                      to={`${url}/popular/detail/${item.id}`}
                      className='wrapper-img-home'
                    >
                      <img
                        src={photoUrl}
                        className='img-size'
                        alt='Vehicle'
                      />
                      <div className='city-type-vehicles  bg-light rounded shadow '>
                        <p className='mt-3'>
                          {item.vehicle} <br />
                          <span className='color-subtitle'>
                            {item.location}
                          </span>
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bike */}
          <h3 className='mb-5 mt-5 f-playfair-main'>
            Bike
            <Link
              to={`${url}/bike`}
              className='float-end link-view-all'
            >
              View all{" "}
              <i className='fas fa-chevron-right text-center ms-2'></i>
            </Link>
          </h3>

          {/* Card */}
          <div className='row position-relative mb-lg-5 wrapper-card'>
            {vehiclesBike.map((item, idx) => {
              // console.log(item);
              const photos = item.photo;
              const photo = JSON.parse(photos);
              // console.log(photo);
              if (photo !== null) {
                var photoUrl = process.env.REACT_APP_HOST + photo[0];
              }
              // console.log(photoUrl);
              // console.log(photoUrl);
              return (
                <div key={idx} className='col-lg-3 col-md-6 card  '>
                  <Link
                    to={`${url}/bike/detail/${item.id}`}
                    className='wrapper-img-home'
                  >
                    <img
                      src={!photoUrl ? vehicleDefault : photoUrl}
                      className='img-size'
                      alt='van_login'
                    />
                    <div className='city-type-vehicles  bg-light rounded shadow '>
                      <p className='mt-3'>
                        {item.name} <br />
                        <span className='color-subtitle'>
                          {item.location}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* MotorBike */}
          <h3 className='mb-5 mt-5 f-playfair-main'>
            MotorBike
            <Link
              to={`${url}/motorbike`}
              className='float-end link-view-all'
            >
              View all{" "}
              <i className='fas fa-chevron-right text-center ms-2'></i>
            </Link>
          </h3>

          {/* Card */}
          <div className='row position-relative mb-lg-5 wrapper-card'>
            {vehiclesMotorBike.map((item, idx) => {
              const photos = item.photo;
              const photo = JSON.parse(photos);
              // console.log(photo);
              if (photo !== null) {
                var photoUrl = process.env.REACT_APP_HOST + photo[0];
              }
              // console.log(photoUrl);
              return (
                <div key={idx} className='col-lg-3 col-md-6 card  '>
                  <Link
                    to={`${url}/motorbike/detail/${item.id}`}
                    className='wrapper-img-home'
                  >
                    <img
                      src={!photoUrl ? vehicleDefault : photoUrl}
                      className='img-size'
                      alt='van_login'
                    />
                    <div className='city-type-vehicles  bg-light rounded shadow '>
                      <p className='mt-3'>
                        {item.name} <br />
                        <span className='color-subtitle'>
                          {item.location}
                        </span>
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Cars */}
          <h3 className='mb-5 mt-5 f-playfair-main'>
            Cars
            <Link
              to={`${url}/cars`}
              className='float-end link-view-all'
            >
              View all{" "}
              <i className='fas fa-chevron-right text-center ms-2'></i>
            </Link>
          </h3>

          {/* Card */}
          <div className='row position-relative mb-lg-5 wrapper-card'>
            {vehiclesCars.map((item, idx) => {
              const photos = item.photo;
              const photo = JSON.parse(photos);
              // console.log(photo);
              if (photo !== null) {
                var photoUrl = process.env.REACT_APP_HOST + photo[0];
              }
              return (
                <div key={idx} className='col-lg-3 col-md-6 card  '>
                  <Link
                    to={`${url}/cars/detail/${item.id}`}
                    className='wrapper-img-home'
                  >
                    <img
                      src={!photoUrl ? vehicleDefault : photoUrl}
                      className='img-size'
                      alt='van_login'
                    />
                    <div className='city-type-vehicles  bg-light rounded shadow '>
                      <p className='mt-3'>
                        {item.name} <br />
                        <span className='color-subtitle'>
                          {item.location}
                        </span>
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
