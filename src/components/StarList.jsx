import React from "react";
import RateStar from "./RateStar";
import { useStar } from "./StarProvider";
// import StarRating from "./StarRating";

function StarList(props) {
  console.log(useStar());
  
  const { stars } = useStar();
  // idNumber = {numberID};
  return (
    <>
      {stars.map((star) => (
        <RateStar key={star.id} {...star} />
      ))}
    </>
  );
}

export default StarList;
