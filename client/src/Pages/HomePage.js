import React from "react";
import Doubt from "../Components/Home/Doubt";
import Event from "../Components/Home/Event";
import Explore from "../Components/Home/Explore";
import Feed from "../Components/Home/Feed";
import Home from "../Components/Home/Home";
import Messenger from "../Components/Home/Messenger";
import Classes from "./Pages.module.css";
function HomePage() {
  return (
    <section className={Classes.Section + " " + Classes.HomePage}>
      <Home />
      <Doubt />
      <Explore />
      <Feed />
      <Event />
      <Messenger />
    </section>
  );
}

export default HomePage;
