import React from "react";
import Classes from "./Home.module.css";
import MsgImg from "../Assets/Msg.png";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";
function Messenger() {
  return (
    <Flex className={Classes.Home_Section} style={{ flexWrap: "wrap-reverse" }}>
      <img src={MsgImg} className={Classes.Image} alt="SectionImage" />
      <Flex className={Classes.Box}>
        <h1>Msg Section</h1>
        <p>
          Our main motive is to provide One on One and best mentoring to the
          talented student, So Mentee can message to his Mentor or Moderators
          and get the best guidance.
        </p>
        <Link to="/Messenger">
          <Button>Messenger</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Messenger;
