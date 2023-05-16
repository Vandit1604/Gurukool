import React, { useContext, useEffect, useState } from "react";
import MessageContext from "../../Context/Messages/MessageContext";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";
import Button from "../Ui/Button/Button";
import Flex from "../Ui/Flex/Flex";
import Form from "../Ui/Form/Form";
import Input from "../Ui/Input/Input";
import Classes from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auth/AuthContext";
function SignIn() {
  const Navigate = useNavigate();
  const { Request, Data, Loading } = useApi();
  const Message = useContext(MessageContext);
  const Auth = useContext(AuthContext);
  const [Email, updateEmail] = useState("");
  const [Password, updatePassword] = useState("");
  const HandelChange = (event) => {
    if (event.target.name === "Email") {
      updateEmail(event.target.value);
    } else {
      updatePassword(event.target.value);
    }
  };
  const handleSubmit = () => {
    const data = {
      Email: Email.toLowerCase(),
      Password: Password,
    };
    Request(
      "/Auth/SignIn",
      "POST",
      data,
      "Cannot Login Into Your Account!!"
    ).catch((error) =>
      Message.Add_Message("Error", "Cannot Login to your Account")
    );
  };
  useEffect(() => {
    if (Data.length !== 0 && Data.User) {
      Message.Add_Message(Data.Status, Data.Message);
      Auth.LogIn(Data.User, Data.AccessToken);
      if (Data.User.newUser) {
        Navigate("/Auth/Update");
      } else {
        Navigate("/");
      }
    }

    // eslint-disable-next-line
  }, [Data]);
  return (
    <Flex className={Classes.Form}>
      <h1>Sign In</h1>
      <Form className={Classes.Form} onSubmit={handleSubmit}>
        <Input
          name="Email"
          type="email"
          placeholder="Email"
          value={Email}
          onChange={HandelChange}
          required={true}
        />
        <Input
          name="Password"
          type="password"
          placeholder="Password"
          value={Password}
          onChange={HandelChange}
          required={true}
        />
        {Loading && <Loader />}
        {!Loading && <Button type="submit">Sign In</Button>}
      </Form>
    </Flex>
  );
}

export default SignIn;
