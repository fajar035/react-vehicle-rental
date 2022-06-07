import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { getVehiclesMotorBikeApi } from "../utils/https/vehicles";
import Loading from "../components/Loading/Loading.js";
import defaultImage from "../assets/images/vehicle-default.jpg";

function VehiclesMotorBike(props) {
  const role = useSelector((state) => state.auth.userData.role);
  const [VehiclesMotorBike, setVehiclesMotorBike] = useState([]);
  const [isOk, setIsOk] = useState(false);

  useEffect(() => {
    getVehiclesMotorBikeApi()
      .then((res) => {
        setVehiclesMotorBike(res.data.result);
        setIsOk(true);
      })
      .catch((err) => {
        console.log(err);
      });

    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {isOk ? (
        <main>
          <Header />

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

            {role === "3" ? (
              <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center rounded-3 mt-5 container-input">
                <button className="add-item">
                  Click item to see details and reservation
                </button>
              </div>
            ) : role === null && role === "2" ? (
              <div></div>
            ) : (
              <div></div>
            )}

            {/* Popular */}
            <h3 className="mb-5 mt-5 f-playfair-main">Motorbike</h3>

            {/* Card */}
            <div className="row position-relative d-flex justify-content-center">
              {VehiclesMotorBike.map((item, idx) => {
                const photos = item.photo;
                const photo = JSON.parse(photos);
                const photoUrl =
                  photo !== null
                    ? process.env.REACT_APP_HOST + photo[0]
                    : defaultImage;

                return (
                  // <div key={idx} className="col-lg-3 col-md-6 card  ">
                  //   <Link to={`motorbike/detail/${item.id}`}>
                  //     <img
                  //       src={photoUrl}
                  //       className="img-size"
                  //       alt="van_login"
                  //     />
                  //     <div className="city-type-vehicles  bg-light rounded shadow ">
                  //       <p className="mt-3">
                  //         {item.name} <br />
                  //         <span className="color-subtitle">
                  //           {item.location}
                  //         </span>
                  //       </p>
                  //     </div>
                  //   </Link>
                  // </div>

                  <div key={idx} className="col-lg-3 col-md-6 card  ">
                    <Link
                      to={`motorbike/detail/${item.id}`}
                      className="wrapper-img-home">
                      <img
                        src={photoUrl}
                        className="img-size "
                        alt="photo_vehicle"
                      />
                    </Link>
                    <div className="city-home col-9  shadow ">
                      <p className="m-0">
                        {item.name} <br />
                        <span className="color-subtitle">{item.location}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Footer />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default VehiclesMotorBike;
