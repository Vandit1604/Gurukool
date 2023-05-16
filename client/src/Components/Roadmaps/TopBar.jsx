import React, { useContext } from "react";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
import Classes from "./Roadmap.module.css";
function TopBar(props) {
  const Auth = useContext(AuthContext);
  console.log(Auth);
  return (
    <Flex className={Classes.TopBar}>
      <Flex>
        <div className={Classes.ImageBox}>
          <img
            src={`http://localhost:8080/public/Images/${
              Auth.User.ProfilePhoto.split(".")[1]
            }/${Auth.User.ProfilePhoto}`}
            alt="ProfileImage"
          />
        </div>
        <div className={Classes.Name}>{Auth.User.Name}</div>
      </Flex>
      {Auth.User.AccountType === "Mentor" && (
        <React.Fragment>
          {!props.isNew && (
            <Link to="/Roadmap?tab=newRoadmap">
              <Button>New Roadmap</Button>
            </Link>
          )}
          {props.isNew && (
            <Link to="/Roadmap">
              <Button>Explore Roadmaps</Button>
            </Link>
          )}
        </React.Fragment>
      )}
    </Flex>
  );
}

export default TopBar;
