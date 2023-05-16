import React from "react";
import { Link } from "react-router-dom";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button.js";
import Classes from "./Navbar.module.css";
function AuthButtons() {
  return (
    <Flex className={Classes.Auth_Buttons}>
      <Link to="/Auth/SignIn" className="Link">
        <Button
          className={Classes.Button}
          style={{
            background: "none",
            color: "white",
            border: "1px solid white",
          }}
        >
          Sign In
        </Button>
      </Link>
      <Link to="/Auth/SignUp">
        <Button className={Classes.Button}>Sign Up</Button>
      </Link>
    </Flex>
  );
}

export default AuthButtons;
