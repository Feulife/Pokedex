import React, { useState } from "react";
import StarRating from "./StarRating";
import { useStar } from "./StarProvider";

export default function RateStar({ id, rating }) {
  const { rateStar } = useStar();
  return (
    <StarRating
      selectedStars={rating}
      onRate={(rating) => rateStar(id, rating)}
    />
  );
}
