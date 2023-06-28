import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokeCard from "../components/PokeCard";
import Header from "../components/pokedex/Shared/Header";
import SelectTypes from "../components/SelectTypes";
import "./styles/pokedex.css";
import "./styles/loading.css";
import "./styles/returnGoTopButton.css";

const Pokedex = () => {
  const { nameTrainer } = useSelector((state) => state);

  const [pokemons, setPokemons] = useState();
  const [selectValue, setSelectValue] = useState("allpokemons");
  const [isLoading, setIsLoading] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleBackClick = () => {
    window.history.back();
  };

  useEffect(() => {
    if (selectValue === "allpokemons") {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=0";
      setIsLoading(true);
      axios
        .get(url)
        .then((res) => setPokemons(res.data))
        .catch((err) => console.log(err))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
          }, 1500)
        );
    } else {
      setIsLoading(true);
      axios
        .get(selectValue)
        .then((res) => {
          const results = res.data.pokemon.map((e) => e.pokemon);
          setPokemons({ results });
        })
        .catch((err) => console.log(err))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
          }, 2200)
        );
    }
  }, [selectValue]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.pokemon.value.trim().toLowerCase();
    navigate(`/pokedex/${inputValue}`);
    e.target.pokemon.value = "";
  };

  return (
    <div className="poke_main-container">
      <Header />
      {isLoading ? (
        <div className="container_gif">
          <img className="gif" src="/images/pokeball.gif" alt="" />
        </div>
      ) : (
        <div>
          <h1 className="poke_greeting-pokedex">
            <span className="poke_greeting-span">Hi {nameTrainer}</span>, here
            you can find your favourite pokemon.
          </h1>
          <form className="poke_container" onSubmit={handleSubmit}>
            <input
              className="poke_input"
              placeholder="search a pokemon"
              id="pokemon"
              type="text"
            />
            <button className="pokedex_search">Search</button>
          </form>
          <SelectTypes setSelectValue={setSelectValue} />
          <div className="poke_cards">
            {pokemons?.results.map((pokemon) => (
              <PokeCard key={pokemon.url} pokemon={pokemon} />
            ))}
          </div>
          <footer className="poke__info-footer">
            <button className="return__button" onClick={handleBackClick}>
              Back
            </button>
            <button className="scroll__button" onClick={handleScrollToTop}>
              Go top
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
