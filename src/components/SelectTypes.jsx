import axios from "axios";
import React, { useEffect, useState } from "react";
import "./pokedex/selectTypes.css";

const SelectTypes = ({ setSelectValue }) => {
  const [types, setTypes] = useState();

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type";
    axios
      .get(url)
      .then((res) => setTypes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  };

  return (
    <select className="poke_select" onChange={handleChange}>
      <option className="all_pokemons" value="allpokemons">
        All Pokemons
      </option>
      {types?.results.map((type) => (
        <option key={type.url} value={type.url}>
          {type.name}
        </option>
      ))}
    </select>
  );
};

export default SelectTypes;
