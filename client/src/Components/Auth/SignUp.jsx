import React, { useContext, useEffect, useState } from "react";
import MessageContext from "../../Context/Messages/MessageContext";
import useApi from "../../Hooks/useApi";
import Button from "../Ui/Button/Button";
import Flex from "../Ui/Flex/Flex";
import Form from "../Ui/Form/Form";
import Input from "../Ui/Input/Input";
import Classes from "./Auth.module.css";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
function SignUp(props) {
  const Navigate = useNavigate();
  const Message = useContext(MessageContext);
  const { Request, Data, Loading } = useApi();
  const [Name, updateName] = useState("");
  const [AccountType, updateAccountType] = useState("Student");
  const [Email, updateEmail] = useState("");
  const [Password, updatePassword] = useState("");
  const [ConfirmPassword, updateConfirmPassword] = useState("");
  const handelChange = (event) => {
    switch (event.target.name) {
      case "Name":
        updateName(event.target.value);
        break;
      case "Email":
        updateEmail(event.target.value);
        break;
      case "Password":
        updatePassword(event.target.value);
        break;
      case "ConfirmPassword":
        updateConfirmPassword(event.target.value);
        break;
      case "AccountType":
        updateAccountType(event.target.value);
        break;
      default:
        Message.Add_Message("Error", "Something went wrong !!!");
    }
  };
  const handleSubmit = () => {
    const data = {
      Name: Name,
      AccountType: AccountType,
      Email: Email.toLowerCase(),
      Password: Password,
    };
    Password === ConfirmPassword
      ? Request("/Auth/Register", "POST", data).catch(() =>
          Message.Add_Message(
            "Error",
            "Cannot Register ,Please try with different credentials"
          )
        )
      : Message.Add_Message("Error", "Confirm Password doesn't matched");
  };
  useEffect(() => {
    if (Data.length !== 0) {
      Message.Add_Message(Data.Status, Data.Message);
      Data.Status === "Success" && Navigate("/Auth/SignIn");
    }
    // eslint-disable-next-line
  }, [Data]);
  return (
    <Flex className={Classes.Form}>
      <h1>Sign Up</h1>
      <Form className={Classes.Form} onSubmit={handleSubmit}>
        <Input
          name="Name"
          onChange={handelChange}
          type="text"
          placeholder="Name"
          value={Name}
          required={true}
          autoFocus={true}
        />
        <Flex className={Classes.FormBox}>
          <div className={Classes.Label}>Account Type</div>
          <Flex className={Classes.Input}>
            <div>
              <input
                type="radio"
                id="Student"
                value="Student"
                name="AccountType"
                defaultChecked
                onChange={handelChange}
              />
              <label htmlFor="Student">Student</label>
            </div>
            <div>
              <input
                type="radio"
                id="Mentor"
                value="Mentor"
                name="AccountType"
                onChange={handelChange}
              />
              <label htmlFor="Mentor">Mentor</label>
            </div>
          </Flex>
        </Flex>
        <Input
          name="Email"
          onChange={handelChange}
          type="email"
          placeholder="example@gmail.com "
          value={Email}
          required={true}
        />
        <Input
          name="Password"
          onChange={handelChange}
          type="password"
          placeholder="Password(min: 8 characters)"
          value={Password}
          required={true}
        />
        <Input
          name="ConfirmPassword"
          onChange={handelChange}
          type="password"
          placeholder="ConfirmPassword"
          value={ConfirmPassword}
          required={true}
        />
        {Loading && <Loader />}
        {!Loading && <Button type="submit">Sign Up</Button>}
      </Form>
    </Flex>
  );
}

export default SignUp;
