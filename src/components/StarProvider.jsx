import React, { createContext, useState, useContext } from "react";
import starData from "./star-data.json";

const StarContext = createContext();
export const useStar = () => useContext(StarContext);

export default function StarProvider({ children }) {
  // const IdStars = useContext(StarID);
  const [stars, setStars] = useState(starData);
  console.log(stars);
  const changeRating = (numberID, rating) =>
    setStars([
      ...stars,
      {
        id: numberID,
        rating: rating
      }
    ]);

  const rateStar = (numberID, rating) =>
    setStars(
      stars.map(star => (star.id === numberID ? { ...star, rating } : star))
    );

  return (
    <StarContext.Provider value={{ stars, changeRating, rateStar }}>
      {children}
    </StarContext.Provider>
  );
}
