import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../Context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
import Button from "../Ui/Button/Button";
import Classes from "./Navbar.module.css";
import Loader from "../Loader/Loader";
import MessageContext from "../../Context/Messages/MessageContext";
function LogOut() {
  const Message = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  const { UserRequest, Loading } = useApi();
  const Navigate = useNavigate();
  const HandelLogOut = async () => {
    Navigate("/");
    Auth.LogOut();
    await UserRequest("/User/LogOut", "GET");
    Message.Add_Message("Success", "Logged Out");
  };

  return (
    <React.Fragment>
      {!Loading && (
        <Button className={Classes.Button} onClick={HandelLogOut}>
          LogOut
        </Button>
      )}
      {Loading && <Loader />}
    </React.Fragment>
  );
}

export default LogOut;
