import React from "react";
import Classes from "../Forum/Forum.module.css";
import Flex from "../Ui/Flex/Flex";
function DisplayComments(props) {
  return (
    <Flex className={Classes.Comment}>
      <div className={Classes.ImageBox_Comment}>
        <img
          src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="ProfileImage"
        />
      </div>
      <div className={Classes.Name_Comment}>Pulkit : </div>
      <div>{props.comment.Comment}</div>
    </Flex>
  );
}

export default DisplayComments;
