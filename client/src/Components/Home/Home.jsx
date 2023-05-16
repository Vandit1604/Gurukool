import React from "react";
import Flex from "../Ui/Flex/Flex";
import Rise from "../Ui/Rise/Rise";
import Classes from "./Home.module.css";
import Picture from "../Assets/pic.png";
function Home() {
  return (
    <Flex className={Classes.Cover}>
      <Flex className={Classes.Heading}>
        GuruKool
        <span className={Classes.Cap}>
          <i className={Classes.Heading_icon + " fas fa-graduation-cap"}></i>
        </span>
      </Flex>
      <Flex className={Classes.ImageBox}>
        <Rise>
          <img src={Picture} alt="cover_picture" />
        </Rise>
      </Flex>
    </Flex>
  );
}

export default Home;
