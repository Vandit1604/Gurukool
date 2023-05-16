import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Dashboard from "../Components/Dashboard/Dashboard";
import AuthContext from "../Context/Auth/AuthContext";
import MessageContext from "../Context/Messages/MessageContext";
import useApi from "../Hooks/useApi";
import Classes from "./Pages.module.css";
import Loader from "../Components/Loader/Loader";
import Flex from "../Components/Ui/Flex/Flex";
function Profile() {
  const [UserData, updateUserData] = useState([]);
  const [isAdmin, setAdmin] = useState(false);

  const Auth = useContext(AuthContext);
  const Message = useContext(MessageContext);
  const params = useParams();
  const { UserRequest, Data, Loading } = useApi();
  useEffect(() => {
    UserRequest("/User/Find?UserName=" + params.UserName, "GET");
    // eslint-disable-next-line
  }, [params.UserName]);
  useEffect(() => {
    if (Data.length !== 0) {
      if (Data.Status === "Success" && Data.length !== 0) {
        updateUserData(Data.User);
        if (params.UserName === Auth.User.UserName) {
          setAdmin(true);
        }
      } else {
        Message.Add_Message("Error", "No User found");
      }
    } // eslint-disable-next-line
  }, [Data]);
  return (
    <Flex className={Classes.Section}>
      {Loading && <Loader />}
      {!Loading && <Dashboard User={UserData} isAdmin={isAdmin} />}
    </Flex>
  );
}

export default Profile;
