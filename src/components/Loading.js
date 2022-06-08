import React from "react";

const Loading = () => {
  return (
    <>
      <div className="app__container">
        <div className="loading__text">Loading</div>
        <div className="gif__container">
          <img
            src="https://i.gifer.com/VgI.gif"
            className="loading__gif noselect"
            alt="loading-gif"
          ></img>
        </div>
      </div>
    </>
  );
};

export default Loading;
