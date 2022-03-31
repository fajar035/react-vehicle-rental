import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import "./Payment.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import defaultImage from "../../assets/images/vehicle-default.jpg";
import {
  getVehicleApi,
  getVehiclePopularIdApi
} from "../../utils/https/vehicles";
import { getUserIdApi } from "../../utils/https/user";
import { addHistoryApi } from "../../utils/https/history";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

function Payment(props) {
  const token = useSelector((state) => state.auth.userData.token);
  const [vehicleBike, setVehicleBike] = useState([]);
  const [userData, setUserData] = useState({});
  const [photo, setPhoto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const idVehicle = props.location.state.dataForApi.id_vehicles;
  const isPopular = props.location.state.isPopular;
  const dataPayment = props.location.state.dataForApi;

  const getBike = useCallback(() => {
    if (isPopular) {
      getVehiclePopularIdApi(idVehicle)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setVehicleBike(res.data.result[0]);
            setPhoto(JSON.parse(res.data.result[0].photo));
            // setStock(parseInt(res.data.result[0].stock));
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(true);
        });
    } else {
      getVehicleApi(idVehicle)
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            setVehicleBike(res.data.result[0]);
            setPhoto(JSON.parse(res.data.result[0].photo));
            // setStock(parseInt(res.data.result[0].stock));
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err.response);
          setIsLoading(true);
        });
    }
  }, [idVehicle, isPopular]);

  const getUser = useCallback(() => {
    getUserIdApi(token)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setUserData(res.data.result);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(true);
      });
  }, [token]);

  const copyBookingCode = (bookingCode) => {
    navigator.clipboard.writeText(bookingCode);
    Swal.fire({
      title: "Booking code copied to clipboard",
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      icon: "success"
    });
  };
  const copyPaymentCode = (paymentCode) => {
    navigator.clipboard.writeText(paymentCode);
    Swal.fire({
      title: "Payment code copied to clipboard",
      position: "center",
      showConfirmButton: false,
      timer: 2000,
      icon: "success"
    });
  };

  const paymentCode = Math.ceil(Math.random() * 100000000);
  const bookingCode = Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, "")
    .slice(0, 8)
    .toUpperCase();

  const dateLocal = (iso8601) => {
    const date = new Date(iso8601).toString();
    const newDate = new Date(date);
    const day = ("0" + newDate.getDate()).slice(-2);
    const mnth = ("0" + (newDate.getMonth() + 1)).slice(-2);
    const year = newDate.getFullYear();
    return [day, mnth, year].join("-");
  };

  const reservationDate = (bookingDate, returnDate) => {
    const bookingDateNew = dateLocal(bookingDate);
    const returnDateNew = dateLocal(returnDate);
    const dateForReservation = {
      bookingDate: bookingDateNew,
      returnDate: returnDateNew
    };
    return dateForReservation;
  };

  useEffect(() => {
    getUser();
    getBike();
  }, [getBike, getUser]);

  const paymentNow = () => {
    console.log(dataPayment);
    const body = {
      id_users: dataPayment.id_users,
      id_vehicles: dataPayment.id_vehicles,
      qty: dataPayment.qty,
      start_date: dataPayment.start_date,
      return_date: dataPayment.return_date,
      total_price: dataPayment.price
    };

    // console.log(body);

    addHistoryApi(body)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          Swal.fire({
            title: "Payment Success",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
          return props.history.push("/history");
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Header />

      <div className="row mt-5 ms-lg-5 d-md-flex justify-content-md-center container-main mb-lg-5">
        <div className="col-lg-12 p-0 ">
          <div
            onClick={() => {
              return props.history.goBack();
            }}
            className="col-lg-4 mb-5 d-flex flex-row align-items-center wrapper-link-detail link-detail">
            <i className="fas fa-chevron-left fs-2 "></i>
            <p className="ms-4 link-detail">Payment</p>
          </div>
        </div>
      </div>

      <div className="container-fluid ps-lg-5 pe-lg-5 mb-5">
        <div className="row ">
          <div className="col-lg-4 d-flex justify-content-center">
            <div className="wrapper-image">
              <img
                src={
                  photo !== null && photo.length !== 0
                    ? process.env.REACT_APP_HOST + photo[0]
                    : defaultImage
                }
                alt="vehicle"
                className="image-vehicle"
              />
            </div>
          </div>

          <div className="col-lg-8 ps-lg-5 pb-5">
            <p className="name-vehicle">
              {isPopular ? vehicleBike.vehicle : vehicleBike.name}
            </p>
            <p className="location-vehicle">{vehicleBike.location}</p>
            <p className="status-vehicle">No Prepayment</p>
            <p className="code-booking">{bookingCode}</p>
            <div
              className="btn-copy-booking"
              onClick={() => copyBookingCode(bookingCode)}>
              <p>Copy Booking Code</p>
            </div>
          </div>

          <div className="col-lg-4 ps-5 pt-5 pb-3">
            <div className="wrapper-quantity">
              <p>
                Quantity : {isPopular ? vehicleBike.qty : dataPayment.qty}{" "}
                {vehicleBike.category === "Bike"
                  ? "Bikes"
                  : vehicleBike.category === "Motorbike"
                  ? "Motor Bikes"
                  : vehicleBike.category === "Cars"
                  ? "Cars"
                  : "Vehicles"}
              </p>
            </div>
          </div>

          <div className="col-lg-8 ps-5 pt-5 pb-3">
            <div className="wrapper-reservation-date">
              <div className="d-flex justify-content-around align-items-center w-50">
                <p className="title-payment">Reservation date : </p>
                <p className="value-payment">
                  {" "}
                  {isPopular
                    ? reservationDate(
                        vehicleBike.booking_date,
                        vehicleBike.return_date
                      ).bookingDate
                    : dataPayment.start_date}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 ps-5 pb-3">
            <div className="wrapper-order-detail">
              <p className="title-payment pb-3">Order Detail :</p>
              <p className="value-payment">
                {isPopular ? vehicleBike.qty : dataPayment.qty}{" "}
                {vehicleBike.category === "Bike"
                  ? "Bikes"
                  : vehicleBike.category === "MotorBike"
                  ? "MotorBikes"
                  : vehicleBike.category === "Cars"
                  ? "Cars"
                  : "Vehicles"}{" "}
                : Rp. {vehicleBike.price}
              </p>

              <p className="title-payment pt-5">
                Total : Rp. {dataPayment.price}
              </p>
            </div>
          </div>

          <div className="col-lg-8 ps-5 pb-3">
            <div className="wrapper-identity">
              <p className="title-payment pb-4">Identity : </p>
              <p className="value-payment">
                {userData.name} (
                {Object.values(userData)[6] !== null
                  ? userData.phone
                  : " No Telp :  ... "}
                ){" "}
              </p>
              <p className="value-payment">{userData.email}</p>
            </div>
          </div>

          <div className="row pt-3 p-0">
            <div className="col-lg-4 ps-5">
              <div className="wrapper-title-payment">
                <p>Payment Code :</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="wrapper-copy-code">
                <p>{paymentCode}</p>
                <div
                  className="btn-copy"
                  onClick={() => {
                    copyPaymentCode(paymentCode);
                  }}>
                  <p>copy</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 p-0">
              <select className="select-method">
                <option value="" disabled selected>
                  Select Payment Methods
                </option>
                <option value="1">Transfer</option>
                <option value="2">Cash</option>
              </select>
            </div>
          </div>

          <div className="col-lg-12 ps-5">
            <div className="btn-payment-now" onClick={paymentNow}>
              <div className="wrapper-text">
                <p className="title-btn-payment">Pay before :</p>
                <p className="time">59:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Payment;
