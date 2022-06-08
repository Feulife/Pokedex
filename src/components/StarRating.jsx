import React, { useEffect, useState } from "react";
import { useStar } from "./StarProvider";
import {rateStar} from './StarProvider';
import Star from "./Star";

const createArray = (lenght) => [...Array(lenght)];

const StarRating = ({
  totalStars = 5,
  selectedStars = 0,
  onRate = f => f
}) => {
  useEffect(() => {
    rateStar(numberID, i)
  })
  return (
  <>
    {createArray(totalStars).map((n, i) => (
    <Star
      key={i}
      selected={selectedStars > i}
      onSelect={() => onRate(i + 1)}
      // onSelect={() => setSelectedStars(i + 1)}      
    />
    ))}
  </>
  )
};

export default StarRating;
