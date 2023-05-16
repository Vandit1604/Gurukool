import React, { useContext } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Blog.module.css";
import Button from "../Ui/Button/Button";
import { Link } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
function TopBar(props) {
  const Auth = useContext(AuthContext);

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
      {!props.isNew && (
        <Link to="/Explore?tab=newblog">
          <Button>New Blog</Button>
        </Link>
      )}
      {props.isNew && (
        <Link to="/Explore">
          <Button>Read Blogs</Button>
        </Link>
      )}
    </Flex>
  );
}

export default TopBar;
