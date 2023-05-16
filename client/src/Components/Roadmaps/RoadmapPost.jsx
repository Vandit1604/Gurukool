import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Roadmap.module.css";
import Image from "../Assets/backend.png";
function RoadmapPost(props) {
  return (
    <Flex className={Classes.Post} onClick={props.onClick}>
      <img src={Image} alt="PostImage" className={Classes.Post_Image} />
      <div className={Classes.Title}>Post Title</div>
      <div className={Classes.Labels}>
        <div style={{ backgroundColor: "purple" }}>Label</div>
      </div>
      <div className={Classes.Post_Desc}>
        This is a sample desc for the postThis is a sample desc for the postThis
        is a sample desc for the postThis is a sample desc for the postThis is a
        sample desc for the postThis is a sample desc for the postThis is a
        sample desc for the postThis is a sample desc for the postThis is a
        sample desc for the postThis is a sample desc for the post
      </div>
    </Flex>
  );
}

export default RoadmapPost;
