export function redcuer (state, {rate, payload}) {
  const indexStar = state.findIndex((ratingItem) => ratingItem.nuberID === payload.nuberID);

  return {
    ...state,
    
  }
}