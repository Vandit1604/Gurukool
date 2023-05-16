import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Messages/Message";
import Classes from "./Messenger.module.css";
import Pusher from "pusher-js";
import AuthContext from "../../Context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
function Messenger_Main(props) {
  const { Request, Data, Loading } = useApi();
  const [chats, updateChats] = useState([]);
  const Auth = useContext(AuthContext);
  const message = useRef();
  useEffect(() => {
    props.chats !== "" && Request("/Message/" + props.chats, "GET");
    // eslint-disable-next-line
  }, [props.chats]);
  useEffect(() => {
    if (Data.MessageData) {
      updateChats(Data.MessageData);
    }
  }, [Data]);

  const handelSubmit = async (event) => {
    event.preventDefault();
    const data = {
      conversationId: props.chats,
      sender: Auth.User.RouteId,
      message: message.current.value,
    };
    Request("/Message/", "POST", data);
    message.current.value = "";
  };
  useEffect(() => {
    var pusher = new Pusher("2ef50e61b4881d2ae5d8", {
      cluster: "ap2",
    });

    var channel = pusher.subscribe("Messages");
    channel.bind("inserted", function (data) {
      data.conversationId === props.chats && updateChats([...chats, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    // eslint-disable-next-line
  }, [chats]);
  return (
    <div className={Classes.Messenger_Main}>
      {props.chats === "" && <h1>Start New chats</h1>}
      {props.chats !== "" && (
        <React.Fragment>
          <div className={Classes.Main_TopBar}>
            <div className={Classes.Main_ImageBox}>
              <img src={props.Image} alt="ProfileImage" />
            </div>
            <div className={Classes.Main_Name}>{props.Name}</div>
          </div>

          <div className={Classes.Chats}>
            {Loading ||
              (chats.length === 0 && (
                <React.Fragment>
                  <h3>Start conversation</h3>
                </React.Fragment>
              ))}
            {chats.length !== 0 && (
              <React.Fragment>
                {chats.map((msg, index) => {
                  return (
                    <Message
                      sender={msg.sender}
                      Message={msg.message}
                      key={index}
                    />
                  );
                })}
              </React.Fragment>
            )}
          </div>
          <form className={Classes.InputBox} onSubmit={handelSubmit}>
            <input ref={message} type="text" placeholder="Message ..." />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </React.Fragment>
      )}
    </div>
  );
}

export default Messenger_Main;
