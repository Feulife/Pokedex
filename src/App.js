import React, { useState, useEffect, createContext } from "react";
import Pokemon from "./components/Pokemon";
import InfoDialog from "./components/InfoDialog";
import StarList from "./components/StarList";
import StarProvider from "./components/StarProvider";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import Filters from "./components/Filters";
import { motion } from "framer-motion";

const list = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.35,
      delayChildren: 0.75,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};

const items = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -150 },
};

function App(props) {
  const [allPokemons, setAllPokemons] = useState([]);
  const [searchPokemons, setSearchPokemons] = useState([]);
  const [filterPokemons, setFilterPokemons] = useState([]);
  const [evoChain, setEvoChain] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [category, setCategory] = useState([]);
  const [stats, setStats] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [pokeName, setPokeName] = useState("");
  const [pokeNumber, setPokeNumber] = useState("");
  const [genderRate, setGenderRate] = useState("");
  const [genera, setGenera] = useState("");
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  // const [searchString, setSearchString] = useState("");
  const [description, setDescription] = useState("");
  const [showLoading, setShowLoading] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [noDataFound, setNoDataFound] = useState(false);
  const [limit, setLimit] = useState(151);
  const [offset, setOffset] = useState(0);
  // const [isChecked, setIsChecked] = useState(false);
  // const [evolID, setEvoID] = useState("");
  // const [evolName, setEvolName] = useState("");
  // const [evolTypes, setEvolTypes] = useState([]);
  // const [evolImgURL, setEvolImgURL] = useState("");
  const [regions, setRegions] = useState([
    {
      name: "Kanto",
      limit: 151,
      offset: 0,
    },
    {
      name: "Johto",
      limit: 100,
      offset: 151,
    },
    {
      name: "Hoenn",
      limit: 135,
      offset: 251,
    },
    {
      name: "Sinnoh",
      limit: 108,
      offset: 386,
    },
    {
      name: "Unova",
      limit: 155,
      offset: 494,
    },
    {
      name: "Kalos",
      limit: 72,
      offset: 649,
    },
    {
      name: "Alola",
      limit: 88,
      offset: 721,
    },
    {
      name: "Galar",
      limit: 89,
      offset: 809,
    },
  ]);
  const [types, setTypes] = useState([
    "all types",
    "grass",
    "bug",
    "dark",
    "dragon",
    "electric",
    "fairy",
    "fighting",
    "fire",
    "flying",
    "ghost",
    "ground",
    "ice",
    "normal",
    "poison",
    "psychic",
    "rock",
    "steel",
    "water",
  ]);
  const [sortby, setSortby] = useState(["ID", "Name"]);

  const [valueregion, setValueregion] = useState("");
  const [valuetype, setValuetype] = useState("");
  const [sorttype, setSorttype] = useState("");
  const [valuesearch, setValuesearch] = useState("");

    
    const getAllPokemons = async (offset, limit) => {
      const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log("Error:", err));
      getPokemonData(response.data.results);
    };
    
    useEffect(() => {
      getAllPokemons(offset, limit);
    }, []);

  const getPokemonData = async (result) => {
    // debugger

    const pokemonArr = [],
      filterArr = [];

    await Promise.all(
      result.map((pokemonItem) => {
        return axios
          .get(`https://pokeapi.co/api/v2/pokemon/${pokemonItem.name}`)
          .then((result) => {
            pokemonArr.push(result.data);
          });
      })
    );

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    if (isTypeSelected) {
      for (let i = 0; i < pokemonArr.length; i++) {
        for (let j = 0; j < pokemonArr[i].types.length; j++) {
          if (selectedType === pokemonArr[i].types[j].type.name) {
            filterArr.push(pokemonArr[i]);
          }
        }
      }

      setIsFilter(true);
      setFilterPokemons(filterArr);
      setAllPokemons(pokemonArr);
      setShowLoading(false);
    } else {
      setIsFilter(false);
      setAllPokemons(pokemonArr);
      setShowLoading(false);
    }

    // console.log("allPokes");
    // console.log(this.state.allPokemons);
  };

  const closeDialog = () => {
    setShowInfo(false);
  };

  const fetchEvoDetails = async (url) => {
    // debugger
    const response = await axios
      .get(url)
      .catch((err) => console.log("Error:", err));
    // console.log(response);

    const evoChain = [];
    let evoData = response.data.chain;
 
    do {
      const evoDetails = evoData["evolution_details"][0];

      evoChain.push({
        species_name: evoData.species.name,
        min_level: !evoDetails ? 1 : evoDetails.min_level,
        trigger_name: !evoDetails ? null : evoDetails.trigger.name,
        item: !evoDetails ? null : evoDetails.item,
      });

      evoData = evoData["evolves_to"][0];
    } while (!!evoData && evoData.hasOwnProperty("evolves_to"));

    // console.log("evochain");
    // console.log(evoChain);

    fetchEvoImages(evoChain);
  };

  const fetchEvoImages = async (evoChainArr) => {
    // debugger
    for (let i = 0; i < evoChainArr.length; i++) {
      const response = await axios
        .get(`https://pokeapi.co/api/v2/pokemon/${evoChainArr[i].species_name}`)
        .catch((err) => console.log("Error:", err));
      response.data.sprites.other.dream_world.front_default
        ? (evoChainArr[i]["image_url"] =
            response.data.sprites.other.dream_world.front_default)
        : (evoChainArr[i]["image_url"] =
            response.data.sprites.other["official-artwork"].front_default);
    }

    setEvoChain(evoChainArr);
  };

  const fetchPokemonData = async (number, pokemon, category, imageURL) => {
    // debugger

    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .catch((err) => console.log("Error:", err));
    // console.log(response);

    const statistics = [], abs = [];
    const id = response.data.id;

    for (let i = 0; i < response.data.abilities.length; i++) {
      abs.push(response.data.abilities[i].ability.name);
      // console.log(abs);
    }

    for (let j = 0; j < response.data.stats.length; j++) {
      const Obj = {};
      Obj["stat__name"] = response.data.stats[j].stat.name;
      Obj["stat__val"] = response.data.stats[j].base_stat;
      statistics.push(Obj);
    }

    setWeight(response.data.weight);
    setHeight(response.data.height);
    setCategory(category); // Not the same in original
    setPokeNumber(id);
    setImageURL(imageURL); // Not the same in original
    setPokeName(pokemon);
    setShowInfo(true);
    setStats(statistics);
    setAbilities(abs);

    setEvoChain([]);
    setGenderRate("");
    setGenera("");

    // fetchEvoChainURL(pokemon);
    fetchPokemonDescription(pokemon);
  };

  const fetchPokemonDescription = async (pokemon_name) => {
    // debugger

    const response = await axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_name}`)
      .catch((err) => console.log("Error:", err));
      fetchEvoDetails(response.data.evolution_chain.url);

    try {      
      for (let i = 0; i < response.data.flavor_text_entries.length - 1; i++) {
        if (response.data.flavor_text_entries[i].language.name === "en") {
          setDescription(response.data.flavor_text_entries[i].flavor_text);
          break;
        }
      }

      for (let j = 0; j < response.data.genera.length; j++) {
        if (response.data.genera[j].language.name === "en") {
          setGenera(response.data.genera[j].genus);
          break;
        }
      }

      setGenderRate(response.data.gender_rate);
    } catch (e) {
      setDescription("Description not found");
    }

    // console.log("description");
  };

  const handleChangeRegions = (event) => {
    // debugger

    for (let i = 0; i < regions.length; i++) {
      if (regions[i].name === event.target.value) {
        setValueregion(event.target.value);
        setSorttype("ID");
        setIsSearch(false);
        setIsFilter(false);
        setShowLoading(true);

        getAllPokemons(regions[i].offset, regions[i].limit);

        break;
      }
    }

    // console.log("limit");
    // console.log(event.target.value);
  };

  const handleChangeSearch = (event) => {
    // debugger
    if (event.target.value.length > 0) {
      setIsSearch(true);
      setValuetype("all types");
      setValuesearch(event.target.value);
    } else {
      setIsSearch(false);
      setIsFilter(false);
      setValuesearch(event.target.value);
    }

    let searchArr = [];

    for (let i = 0; i < allPokemons.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (
        allPokemons[i].name.includes(event.target.value.toLowerCase()) ||
        allPokemons[i].id.toString().includes(event.target.value)
      ) {
        searchArr.push(allPokemons[i]);
      }
    }

    if (searchArr.length === 0) {
      setNoDataFound(true);
      setSearchPokemons([]);
    } else {
      setNoDataFound(false);
      setSearchPokemons(searchArr);
    }
  };

  const handleChangeSort = (event) => {
    let sortArr;

    isFilter ? (sortArr = filterPokemons) : (sortArr = allPokemons);

    if (event.target.value === "ID") {
      sortArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
    } else {
      sortArr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
    }

    if (isFilter) {
      setFilterPokemons(sortArr);
      setSorttype(event.target.value);
    } else {
      setAllPokemons(sortArr);
      setSorttype(event.target.value);
    }
  };

  const handleChangeTypes = (event) => {
    // debugger

    if (event.target.value === "all types") {
      const allPoks = allPokemons;
      if (sortby === "Name") {
        allPoks.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );

        setIsFilter(false);
        setValuetype(event.target.value);
        setAllPokemons(allPoks);
        setIsTypeSelected(false);
      } else {
        allPoks.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

        setIsFilter(false);
        setValuetype(event.target.value);
        setAllPokemons(allPoks);
        setIsTypeSelected(false);
      }
      return;
    } else {
      setIsTypeSelected(true);
      setSelectedType(event.target.value);
    }

    let filterArr = [];

    for (let i = 0; i < allPokemons.length; i++) {
      for (let j = 0; j < allPokemons[i].types.length; j++) {
        if (event.target.value === allPokemons[i].types[j].type.name) {
          filterArr.push(allPokemons[i]);
        }
      }
    }

    sortby === "Name"
      ? filterArr.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        )
      : filterArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    setIsSearch(false);
    setValuesearch("");
    setIsFilter(true);
    setFilterPokemons(filterArr);
    setValuetype(event.target.value);

    filterArr.length === 0 ? setNoDataFound(true) : setNoDataFound(false);
  };

// const StarID = createContext();

  return (
    <>
      {showLoading && <Loading />}
      {!showLoading && (
        <div className="app__container">
          {/* <StarList></StarList> */}          
          {showInfo && (
            <InfoDialog
              open={showInfo}
              abilities={abilities}
              height={height}
              weight={weight}
              category={category}
              genera={genera}
              genderRate={genderRate}
              stats={stats}
              img={imageURL}
              name={pokeName}
              number={pokeNumber}
              description={description}
              evoChain={evoChain}
              cancel={() => closeDialog()}
              evolutionPokemon={fetchPokemonData}
            ></InfoDialog>
          )}
          <Header />
          <Filters
            valueregion={valueregion}
            regions={regions}
            valuetype={valuetype}
            sorttype={sorttype}
            valuesearch={valuesearch}
            types={types}
            sortby={sortby}
            regionsSelect={handleChangeRegions}
            typesSelect={handleChangeTypes}
            sortSelect={handleChangeSort}
            searchChange={handleChangeSearch}
          />
          <div className="pokemon__container">
            <div className="all__pokemons">
              {isSearch ? (
                Object.keys(searchPokemons).map((item) => (
                  <Pokemon
                    key={searchPokemons[item].id}
                    id={searchPokemons[item].id}
                    image={
                      searchPokemons[item].sprites.other.dream_world
                        .front_default
                        ? searchPokemons[item].sprites.other.dream_world
                            .front_default
                        : searchPokemons[item].sprites.other["official-artwork"]
                            .front_default
                    }
                    name={searchPokemons[item].name}
                    type={searchPokemons[item].types}
                    onElemClick={() =>
                      fetchPokemonData(
                        searchPokemons[item].id,
                        searchPokemons[item].name,
                        searchPokemons[item].types,
                        searchPokemons[item].sprites.other.dream_world
                          .front_default
                          ? searchPokemons[item].sprites.other.dream_world
                              .front_default
                          : searchPokemons[item].sprites.other[
                              "official-artwork"
                            ].front_default
                      )
                    }
                  />
                ))
              ) : !isFilter ? (
                <motion.ul
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    listStyleType: "none",
                    paddingInlineStart: "0px",
                    marginBlockStart: "0px",
                    marginBlockEnd: "0px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  initial="hidden"
                  animate="visible"
                  variants={list}
                >
                  {Object.keys(allPokemons).map((item) => (
                    <motion.li variants={items}>
                      <Pokemon
                        key={allPokemons[item].id}
                        id={allPokemons[item].id}
                        image={
                          allPokemons[item].sprites.other.dream_world
                            .front_default
                            ? allPokemons[item].sprites.other.dream_world
                                .front_default
                            : allPokemons[item].sprites.other[
                                "official-artwork"
                              ].front_default
                        }
                        name={allPokemons[item].name}
                        type={allPokemons[item].types}
                        onElemClick={() =>
                          fetchPokemonData(
                            allPokemons[item].id,
                            allPokemons[item].name,
                            allPokemons[item].types,
                            allPokemons[item].sprites.other.dream_world
                              .front_default
                              ? allPokemons[item].sprites.other.dream_world
                                  .front_default
                              : allPokemons[item].sprites.other[
                                  "official-artwork"
                                ].front_default
                          )
                        }
                      />
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                Object.keys(filterPokemons).map((item) => (
                  <Pokemon
                    key={filterPokemons[item].id}
                    id={filterPokemons[item].id}
                    image={
                      filterPokemons[item].sprites.other.dream_world
                        .front_default
                        ? filterPokemons[item].sprites.other.dream_world
                            .front_default
                        : filterPokemons[item].sprites.other["official-artwork"]
                            .front_default
                    }
                    name={filterPokemons[item].name}
                    type={filterPokemons[item].types}
                    onElemClick={() =>
                      fetchPokemonData(
                        filterPokemons[item].id,
                        filterPokemons[item].name,
                        filterPokemons[item].types,
                        filterPokemons[item].sprites.other.dream_world
                          .front_default
                          ? filterPokemons[item].sprites.other.dream_world
                              .front_default
                          : filterPokemons[item].sprites.other[
                              "official-artwork"
                            ].front_default
                      )
                    }
                  />
                ))
              )}
            </div>
          </div>
          {noDataFound && (
            <div className="no__data noselect">
              No such Pokémon in this region
            </div>
          )}
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
