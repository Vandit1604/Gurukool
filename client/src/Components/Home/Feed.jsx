import React from "react";
import Classes from "./Home.module.css";
import FeedImg from "../Assets/Feed.png";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
function Feed() {
  return (
    <Flex
      className={Classes.Home_Section}
      style={{ flexWrap: "wrap-reverse" }}
      alt="SectionImage"
    >
      <img src={FeedImg} className={Classes.Image} alt="SectionImage" />
      <Flex className={Classes.Box}>
        <h1>Feed Section</h1>
        <p>
          Our site have the Feed section where the latest Post and information
          about your interests are displayed.
        </p>
        <Button>Feed Section</Button>
      </Flex>
    </Flex>
  );
}

export default Feed;
