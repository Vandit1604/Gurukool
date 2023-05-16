import React from "react";
import Classes from "./Home.module.css";
import EventImg from "../Assets/Event.png";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
function Event() {
  return (
    <Flex className={Classes.Home_Section}>
      <Flex className={Classes.Box}>
        <h1>Event Section</h1>
        <p>
          The special section where the mentors can post the new event details
          and mentee can easily enroll into them and also has the recording of
          previous events
        </p>
        <Button>Event Section</Button>
      </Flex>
      <img
        src={EventImg}
        className={Classes.Image}
        style={{ float: "right" }}
        alt="SectionImage"
      />
    </Flex>
  );
}

export default Event;
