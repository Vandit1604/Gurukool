import React, { useContext, useEffect } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
import Conversation from "./Conversation/Conversation";
import Classes from "./Messenger.module.css";
import NewConversation from "./NewConversation";
function Messenger_Left(props) {
  const Auth = useContext(AuthContext);

  const { Request, Data, Loading } = useApi();
  useEffect(() => {
    Request("/Conversation/" + Auth.User.RouteId, "GET");
    // eslint-disable-next-line
  }, []);

  return (
    <div className={Classes.Messenger_Left}>
      <div className={Classes.Messenger_Left_Wrapper}>
        <div className={Classes.Messenger_Left_Top}>
          <NewConversation StartConversation={props.StartConversation} />
        </div>
        {Loading && Data?.length === 0 && <h3>Start a new Conversation</h3>}
        {!Loading &&
          Data.length !== 0 &&
          Data.Conversation.map((con, index) => {
            return (
              <Conversation
                key={index}
                id={con._id}
                Members={con.Members}
                ShowChats={props.ShowChats}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Messenger_Left;
