import React from "react";

const Filters = (props) => {
  return (
    <>
      <div className="filter__container noselect">
        <div className="filter__items">
          <div>Region</div>
          <select
            value={props.valueregion}
            onChange={props.regionsSelect}
          >
            {props.regions.map((region) => (
              <option key={region.name} value={region.name}>
                {region.name}&nbsp;({region.offset + 1}-
                {region.limit + region.offset})
              </option>
            ))}
          </select>
        </div>
        <div className="filter__items">
          <div>Type</div>
          <select
            value={props.valuetype}
            onChange={props.typesSelect}
          >
            {props.types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__items">
          <div>Sort by</div>
          <select value={props.sorttype} onChange={props.sortSelect}>
            {props.sortby.map((sort) => (
              <option key={sort} value={sort}>
                {sort}
              </option>
            ))}
          </select>
        </div>
        <div className="filter__items">
          <label>Search</label>
          <input
            type="text"
            value={props.valuesearch}
            onChange={props.searchChange}
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
