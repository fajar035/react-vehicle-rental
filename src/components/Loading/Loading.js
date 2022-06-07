import React from "react";

function Loading() {
  return (
    // <div className="body-spinner">
    //   <button className="btn-spinner">
    //     <span className="spinner"></span>
    //     <span className="btn-text">Loading...</span>
    //   </button>
    // </div>
    <div className="body-spinner">
      <div className="feeder">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loading;
