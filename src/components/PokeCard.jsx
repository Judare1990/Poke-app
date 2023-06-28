import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pokecard.css";

const PokeCard = ({ pokemon }) => {
  const [poke, setPoke] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(pokemon.url)
      .then((res) => setPoke(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = () => {
    navigate(`/pokedex/${poke.id}`);
  };
  return (
    <article
      onClick={handleClick}
      className={`cards border-${poke?.types[0].type.name}`}
    >
      <header className={`poke_header bg-${poke?.types[0].type.name}`}>
        <img
          className="poke_img"
          src={poke?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </header>
      <h2 className={`poke_name color-${poke?.types[0].type.name}`}>
        {poke?.name}
      </h2>
      <ul className="poke_type">
        {poke?.types.map((type) => (
          <li className="poke_li" key={type.type.name}>
            {type.type.name}
          </li>
        ))}
      </ul>
      <hr className="poke_hr" />
      <ul className="poke_info">
        {poke?.stats.map((stat) => (
          <li className="poke_info-li" key={stat.stat.url}>
            <span className="poke_info-span">{stat.stat.name}</span>
            <span
              className={`card_stat-number color-${poke?.types[0].type.name}`}
            >
              {stat.base_stat}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default PokeCard;
