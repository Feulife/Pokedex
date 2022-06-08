import React from "react";
import Pokedex from "../assets/images/pokedex.png";

const Header = () => {
  
  return (
    <>
      <div className="app__header">
        <div className="poke__logos noselect">
          <img src={Pokedex} alt="pokelogo" className="poke__logo" />
        </div>
      </div>
    </>
  );
};

export default Header;
