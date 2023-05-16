import React, { useContext, useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import Classes from "./Messenger.module.css";
import MessengerLeft from "./Messenger_Left";
import MessengerMain from "./Messenger_Main";
import Backdrop from "../Navbar/BackDrop";
import Dialogue from "../Dialogue/Dialogue";
import Button from "../Ui/Button/Button";
import AuthContext from "../../Context/Auth/AuthContext";
function Messenger() {
  const Auth = useContext(AuthContext);
  const { UserRequest, Data } = useApi();
  const [ConId, updateConId] = useState("");
  const [Name, updateName] = useState("");
  const [Image, updateImage] = useState("");
  const [UserName, updateUserName] = useState("");
  const [UserPhoto, updateUserPhoto] = useState("");
  const [backdrop, setBackdrop] = useState(false);
  const [recieverId, updateId] = useState("");
  const ShowChats = (ConversationId, Name, Image) => {
    updateName(Name);
    updateImage(Image);
    updateConId(ConversationId);
  };
  const CancelNewCon = () => {
    setBackdrop(false);
  };
  const StartConversation = (newConversation, Name, Image) => {
    setBackdrop(true);
    updateUserPhoto(Image);
    updateUserName(Name);
    updateId(newConversation);
  };
  const HandelRequest = () => {
    const newPoints = {
      Points: Auth.User.UserPoints.Points - 10,
      RecentPointActivity: `Start newConversation with ${UserName}`,
    };
    UserRequest("/User/Update", "PUT", { UserPoints: newPoints });
    UserRequest("/Conversation", "POST", {
      senderId: Auth.User.RouteId,
      receiverId: recieverId,
    });
    CancelNewCon();
  };
  useEffect(() => {
    if (Data.length !== 0) {
      if (Data.User) {
        Auth.UpdateUser(Data.User);
      }
    }
    //eslint-disable-next-line
  }, [Data]);
  return (
    <div className={Classes.Messenger}>
      <MessengerLeft
        ShowChats={ShowChats}
        StartConversation={StartConversation}
      />
      <MessengerMain chats={ConId} Name={Name} Image={Image} />
      <Dialogue Show={backdrop}>
        <div className={Classes.Main_ImageBox}>
          <img src={UserPhoto} alt="ProfileImage" />
        </div>
        <div className={Classes.Main_Name}>{UserName}</div>
        <div>You want to start new Conversation with {UserName}</div>
        <div
          style={{ width: "400px", fontWeight: "bolder", textAlign: "center" }}
        >
          10 points will be deducted from your wallet to start conversation with{" "}
          {UserName}
        </div>
        <Button onClick={HandelRequest}>Start Conversation</Button>
      </Dialogue>
      <Backdrop Show={backdrop} onClick={CancelNewCon} />
    </div>
  );
}

export default Messenger;
