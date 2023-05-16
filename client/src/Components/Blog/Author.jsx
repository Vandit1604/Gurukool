import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import AuthContext from "../../Context/Auth/AuthContext";
import MessageContext from "../../Context/Messages/MessageContext";
import useApi from "../../Hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Blog.module.css";
function Author(props) {
  const Message = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  const Navigate = useNavigate();
  const { UserRequest, Request, Data } = useApi();
  useEffect(() => {
    Request("/User/GetUser/" + props.UserId, "GET");
    // eslint-disable-next-line
  }, []);
  const DeleteBlog = () => {
    UserRequest("/Blog/delete", "delete", { id: props.BlogId })
      .then(() => {
        Message.Add_Message("Success", "Successfully deleted your Blog Post");
        Navigate("/Explore");
      })
      .catch((error) =>
        Message.Add_Message("Error", "Cannot delete your blog post")
      );
  };
  return (
    <React.Fragment>
      {Data.User && (
        <Flex>
          <div className={Classes.ImageBox}>
            <img
              src={`http://localhost:8080/public/Images/${
                Data.User.ProfilePhoto.split(".")[1]
              }/${Data.User.ProfilePhoto}`}
              alt="ProfileImage"
            />
          </div>
          <div className={Classes.Name}>{Data.User.Name}</div>
          {Data.User.UserName === Auth.User.UserName && (
            <Flex className={Classes.EditBox}>
              <i className="fas fa-trash-alt" onClick={DeleteBlog}></i>
            </Flex>
          )}
        </Flex>
      )}
    </React.Fragment>
  );
}

export default Author;
