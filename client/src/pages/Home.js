import { React, useState, useEffect } from "react";
import "./Home.css";

const Home = () => {
  let seed = Math.floor(Math.random() * 1000) + 1;
  const [botImgList, setBotImgList] = useState([]);
  useEffect(() => {
    fetch("/products")
      .then((r) => r.json())
      .then((products) => {
        setBotImgList(products);
      });
  }, []);

  let imgBots = botImgList.map((bot) => {
    return <img className="bot-image floating pulse " src={bot.image} />;
  });
  return (
    <div id="container">
      <h1 className="home-header ">BOT.IO</h1>
      <p className="home-p vibrate-1">check the bot market!</p>
      <div className="photobanner">{imgBots}</div>
    </div>
  );
};

export default Home;
