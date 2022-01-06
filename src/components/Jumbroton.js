import React from "react"
import { Link } from "react-router-dom"

function Jumbroton() {
  return (
    <div className="row bg-image p-5 jumbotron">
      <div className="col-lg-6 ">
        <div className="row mb-5 p-0">
          <div className="f-playfair mb-5">
            Explore and <br />
            Travel
          </div>
          <div className="f-nunito-vehicle-finder mt-5 mb-3">
            Vehicle Finder
          </div>
          <div className="line-jumbroton col-1 ms-3"></div>
        </div>

        <form className="row mb-5">
          {/* input Search */}
          <div className="col-lg-12 p-0">
            <input
              type="text"
              className="input-type mb-5 ms-1"
              placeholder="Type the vehicle (ex. motorbike"
            />
          </div>
          <div className="row d-flex justify-content-between p-0">
            {/* location */}
            <div className="col-lg-5 mb-5 p-0">
              <button
                className="input-select dropdown-toggle p-2 ms-3"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Location
              </button>
              <ul className="dropdown-menu p-2">
                <li className="link text-center">
                  <Link to="#">Jakarta</Link>
                </li>
                <li className="link text-center">
                  <Link to="#">Depok</Link>
                </li>
                <li className="link text-center">
                  <Link to="#">Bogor</Link>
                </li>
              </ul>
            </div>

            {/* Input Date */}
            <div className="col-lg-5 mb-5 p-0">
              <input
                type="date"
                className="input-date ms-3"
                placeholder="Date"
              />
            </div>
          </div>

          {/* Button Search */}
          <div className="col-12 p-0">
            <button className="btn-search" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Jumbroton
