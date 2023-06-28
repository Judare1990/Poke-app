import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Shared/Header";
import "./styles/pokeInfo.css";
import "./styles/loading.css";
import "./styles/returnGoTopButton.css";

const PokeInfo = () => {
  const { id } = useParams();
  const [hasError, setHasError] = useState(false);
  const [poke, setPoke] = useState();
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
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setPoke(res.data);
        setHasError(false);
      })
      .catch((err) => {
        setHasError(true);
        console.log(err);
      })
      .finally(
        setTimeout(() => {
          setIsLoading(false);
        }, 2200)
      );
  }, [id]);

  console.log(poke);

  if (hasError) {
    return (
      <div className="not_found-img">
        <h1 className="poke_not-found">
          🥵I am sorry, the pokemon with name "{id}" was not found🥵
        </h1>
        <button className="return__button" onClick={handleBackClick}>
          Back
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <Header />
        {isLoading ? (
          <div className="container_gif">
            <img className="gif" src="/images/pokeball.gif" alt="" />
          </div>
        ) : (
          <div className="poke_info-container">
            <header className={`info_poke img-${poke?.types[0].type.name}`}>
              <img
                className="poke_info-img"
                src={poke?.sprites.other["official-artwork"].front_default}
                alt=""
              />
            </header>
            <h1 className="poke_info-name">{poke?.name}</h1>
            <div className="container_poke-info">
              <div className="characteristics">
                <div className="poke_weight-height">
                  <div className="poke_characteristics">
                    <span>Weight</span>

                    <p>{poke?.weight}</p>
                  </div>
                  <div className="poke_characteristics">
                    <span>Height</span>
                    <p>{poke?.height}</p>
                  </div>
                </div>
              </div>

              <div className="type_ability">
                <div className="box_title">
                  <h2>Types</h2>
                  <div className="types_abilities">
                    {poke?.types.map((type) => (
                      <span
                        className={`type-${poke?.types[0].type.name}`}
                        key={type.type.url}
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="box_title">
                  <h2>Abilities</h2>
                  <div className="types_abilities">
                    {poke?.abilities.map((ability) => (
                      <span key={ability.ability.url}>
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="stats">
                <h1 className="stats_title">Stats</h1>
                {poke?.stats.map((stat) => (
                  <div className="bar_stats" key={stat.stat.url}>
                    <div className="bar_stat-text">
                      <span>{stat.stat.name}</span>
                      <p>{stat.base_stat}/150</p>
                    </div>
                    <div
                      className="bar"
                      style={{
                        background: `linear-gradient(90deg, #E6901E 0, #FCD676 ${stat.base_stat}%, rgb(231, 231, 231) ${stat.base_stat}% 100%)`,
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              <header>
                <h1 className="move_title">Movements</h1>
              </header>
              <section className="moves_container">
                <ul className="movements">
                  {poke?.moves.slice(0, 25).map((move) => (
                    <li className="movements_info" key={move.move.url}>
                      {move.move.name}
                    </li>
                  ))}
                </ul>
              </section>
              <footer className="poke__info-footer">
                <button className="return__button" onClick={handleBackClick}>
                  Back
                </button>
                <button className="scroll__button" onClick={handleScrollToTop}>
                  Go top
                </button>
              </footer>
            </div>
          </div>
        )}
      </div>
    );
  }
};
export default PokeInfo;
