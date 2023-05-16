import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../Context/Auth/AuthContext";
import useApi from "../../../Hooks/useApi";
import Classes from "./Message.module.css";
function Message({ sender, Message }) {
  const { Request, Data, Loading } = useApi();
  const scrollRef = useRef();
  const Auth = useContext(AuthContext);
  const [Type, setType] = useState("Receiver");
  const [Image, updateImage] = useState("");
  useEffect(() => {
    Request("/User/" + sender);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (Data.length !== 0) {
      if (Data.User?.RouteId === Auth.User.RouteId) {
        setType("Sender");
      } else {
        setType("Receiver");
      }
      updateImage(Data.User?.ProfilePhoto);
    }
    // eslint-disable-next-line
  }, [Data]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollRef]);
  return (
    <React.Fragment>
      {!Loading && Data.User && (
        <div
          ref={scrollRef}
          style={{
            float: Type === "Receiver" ? "left" : "right",
            clear: "both",
            flexDirection: Type === "Receiver" ? "row" : "row-reverse",
          }}
          className={Classes.MessageBox}
        >
          <span className={Classes.ImageBox}>
            <img src={Image} alt="UserImage" />
          </span>
          <p
            style={{
              backgroundColor: Type === "Sender" && "#305dbf",
            }}
            className={Classes.Message}
          >
            {Message}
          </p>
        </div>
      )}
    </React.Fragment>
  );
}

export default Message;
