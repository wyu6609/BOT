import React from "react";

const BotPage = ({ bot }) => {
  console.log(bot);
  return <div>{bot.title} </div>;
};

export default BotPage;
