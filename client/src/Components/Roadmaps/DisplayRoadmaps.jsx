import React, { useState } from "react";
import RoadmapPost from "./RoadmapPost";
import Dialogue from "../Dialogue/Dialogue";
import Button from "../Ui/Button/Button";
import BackDrop from "../Navbar/BackDrop";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Roadmap.module.css";
function DisplayRoadmaps() {
  const [Show, setShow] = useState(false);
  const HandelClick = () => {
    console.log(Show);
    if (Show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <React.Fragment>
      <Flex className={Classes.Post_Box}>
        <RoadmapPost onClick={HandelClick} />
        <RoadmapPost onClick={HandelClick} />
        <RoadmapPost onClick={HandelClick} />
        <RoadmapPost onClick={HandelClick} />{" "}
        <RoadmapPost onClick={HandelClick} />
      </Flex>
      <BackDrop Show={Show} onClick={HandelClick} />
      <Dialogue Show={Show}>
        You want to get this Roadmap form this User
        <strong>10 Points will be deducted form your Wallet</strong>
        <Button onClick={HandelClick}>Get Roadmap</Button>
      </Dialogue>
    </React.Fragment>
  );
}

export default DisplayRoadmaps;
