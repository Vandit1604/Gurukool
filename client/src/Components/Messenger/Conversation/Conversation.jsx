import React, { useContext, useEffect } from "react";
import Classes from "./Conversation.module.css";
import AuthContext from "../../../Context/Auth/AuthContext";
import useApi from "../../../Hooks/useApi";
import Loader from "../../Loader/Loader";
function Conversation({ id, Members, ShowChats }) {
  const { Request, Data, Loading } = useApi();
  const Auth = useContext(AuthContext);
  var UserId = Members[0];
  if (UserId === Auth.User.RouteId) {
    UserId = Members[1];
  }
  useEffect(() => {
    Request("/User/" + UserId);
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {Loading && <Loader />}
      {!Loading && Data.User && (
        <div
          className={Classes.Conversation}
          onClick={() => {
            ShowChats(id, Data.User.Name, Data.User.ProfilePhoto);
          }}
        >
          <div className={Classes.ImageBox}>
            <img src={Data.User.ProfilePhoto} alt="ProfileImage" />
          </div>
          <div className={Classes.Name}>{Data.User.Name}</div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Conversation;
