import { useReducer, createContext } from "react";
import {reducer} from "./reducer";

export const RateContext = createContext();

const initialState = {
  rate: []
};

export const ContextProvider = ({children}) => {
  const [value, dispatch] = useReducer(reducer, initialState);

  value.changeRating = (item) => {
    dispatch({payload: item})
  };
};