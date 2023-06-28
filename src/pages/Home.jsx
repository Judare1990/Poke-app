import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setNameTrainer } from "../store/slices/trainerName.slice";
import "./styles/home.css";

const Home = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNameTrainer(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  return (
    <article className="poke_home">
      <img className="poke_img-home" src="/images/Home.Image.png" alt="" />
      <h2 className="poke_greeting">Hi trainer</h2>
      <p>To start this pokedex, give me your name</p>
      <form onSubmit={handleSubmit}>
        <input
          className="input_home"
          placeholder="Your name"
          id="name"
          type="text"
        />
        <button className="button_home">Start</button>
      </form>
      <footer className="footer"></footer>
    </article>
  );
};

export default Home;
