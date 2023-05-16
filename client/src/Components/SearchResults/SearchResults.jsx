import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./SearchResults.module.css";
function SearchResults(props) {
  return (
    <Flex className={props.className + " " + Classes.Results}>
      {props.Results?.length === 0 && <div>No User Found</div>}
      {props.Results?.length !== 0 &&
        props.Results?.map((User, index) => (
          <Flex
            className={Classes.ResultBox}
            onClick={() => {
              props.StartConversation(
                User.RouteId,
                User.Name,
                User.ProfilePhoto
              );
            }}
          >
            <div className={Classes.ImageBox}>
              <img src={User.ProfilePhoto} alt="UserPhoto" />
            </div>
            <div className={Classes.Name}>{User.Name}</div>
          </Flex>
        ))}
    </Flex>
  );
}

export default SearchResults;
