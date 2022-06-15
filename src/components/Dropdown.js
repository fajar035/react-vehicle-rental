// using global css
import React, { useState, useEffect, useCallback } from "react";
import "../pages/Vehicles/Vehicles.css";

function Dropdown({ selected, setSelected, data }) {
  const [isActive, setisActive] = useState(false);
  const [values, setValues] = useState([]);

  const getValues = useCallback(() => {
    if (data.length !== 0) {
      let tempValue = [];
      data.map((item, idx) => {
        // console.log("LOOPING-DATA", Object.values(item)[1]);
        tempValue.push(Object.values(item)[1]);
        return tempValue;
      });

      // console.log("TEMPVALUE MASUK", dataTemp);
      if (tempValue.length !== 0) {
        setValues(tempValue);
      }
    }
  }, [data]);

  useEffect(() => {
    getValues();
  }, [getValues]);

  return (
    <div className='dropdown'>
      <div
        className='dropdown-btn'
        onClick={(e) => setisActive(!isActive)}
      >
        {selected}
        {isActive ? (
          <i className='fa-solid fa-chevron-up fs-4'></i>
        ) : (
          <i className='fa-solid fa-chevron-down fs-4'></i>
        )}
      </div>
      {isActive && (
        <div className='dropdown-content'>
          {values.length !== 0 &&
            values.map((value, idx) => {
              return (
                <div
                  className='dropdown-item'
                  onClick={(e) => {
                    setSelected(value);
                    setisActive(false);
                  }}
                  key={idx}
                >
                  {value}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
