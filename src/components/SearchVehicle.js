import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultImage from "../assets/images/vehicle-default.jpg";
import { searchVehicleHomeApi } from "../utils/https/vehicles";
import Loading from "../components/Loading/Loading.js";

function SearchVehicle(props) {
  const [result, setResult] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isDataNull, setIsDataNull] = useState(false);
  console.log("PROPS", props);

  // const url = useLocation();

  useEffect(() => {
    searchVehicleHomeApi(
      props.dataSearch.keyword,
      props.dataSearch.location,
      props.dataSearch.category
    )
      .then((res) => {
        setResult(res.data.result);
        setIsloading(false);
        setIsDataNull(false);
        return window.scrollTo({
          top: 850,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log("ERROR: ", err.response.data.result.data);
        setIsloading(false);
        setIsDataNull(true);
      });
  }, [props.dataSearch]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isDataNull ? (
            <div className="text-center p-5">
              <p className="p-5 text-no-vehicle">There is no vehicle</p>
            </div>
          ) : (
            <div className="row position-relative mb-lg-5 wrapper-card mt-5">
              {result.map((item, idx) => {
                const photos = item.photo;
                const photo = JSON.parse(photos);
                const photoUrl =
                  photo !== null
                    ? process.env.REACT_APP_HOST + photo[0]
                    : defaultImage;

                return (
                  <div key={idx} className="col-lg-3 col-md-6 card  ">
                    <Link
                      to={`vehicles/bike/detail/${item.id}`}
                      className="wrapper-img-home">
                      <img
                        src={photoUrl}
                        className="img-size"
                        alt="van_login"
                      />
                      <div className="city-type-vehicles  bg-light rounded shadow ">
                        <p className="mt-3">
                          {item.name} <br />
                          <span className="color-subtitle">
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
        </>
      )}
    </>
  );
}

export default SearchVehicle;
