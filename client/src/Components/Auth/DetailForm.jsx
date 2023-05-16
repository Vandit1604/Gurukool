import Input from "../Ui/Input/Input";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import MessageContext from "../../Context/Messages/MessageContext";
import useApi from "../../Hooks/useApi";
import Classes from "./Auth.module.css";
import Loader from "../Loader/Loader";
import Flex from "../Ui/Flex/Flex";
import Form from "../Ui/Form/Form";
import Button from "../Ui/Button/Button";
import { useNavigate } from "react-router-dom";
function DetailForm(props) {
  const Navigate = useNavigate();
  const Auth = useContext(AuthContext);
  const Message = useContext(MessageContext);
  const [Name, updateName] = useState(Auth.User.Name);
  const [Address, updateAddress] = useState(Auth.User.Address);
  const [Education, updateEducation] = useState(Auth.User.Education);
  const [OneLiner, updateOneLiner] = useState(Auth.User.OneLiner);
  const [DOB, updateDOB] = useState(Auth.User.DOB);
  const [Gender, updateGender] = useState("Male");
  const [ProfileDescription, updateDescription] = useState(
    Auth.User.ProfileDesc
  );
  const { UserRequest, Data, Loading } = useApi();
  const HandelChange = (event) => {
    switch (event.target.name) {
      case "Date of Birth":
        updateDOB(event.target.value);
        break;
      case "Gender":
        updateGender(event.target.value);
        break;
      case "Profile Description":
        updateDescription(event.target.value);
        break;
      case "Address":
        updateAddress(event.target.value);
        break;
      case "Degree":
        updateEducation(event.target.value);
        break;
      case "One Line About Yourself":
        updateOneLiner(event.target.value);
        break;
      case "Name":
        updateName(event.target.value);
        break;
      default:
        console.log("error");
    }
  };
  const HandelSubmit = () => {
    const data = {
      newUser: false,
      Name: Name,
      DOB: DOB,
      Gender: Gender,
      Address: Address,
      Education: Education,
      ProfileDesc: ProfileDescription,
      OneLiner: OneLiner,
    };
    UserRequest(
      "/User/Update",
      "PUT",
      data,
      "Cannot Update Your Account"
    ).catch((error) => Message.Add_Message("Error", "Something Went wrong"));
  };
  useEffect(() => {
    if (Data.length !== 0) {
      if (Data.Status === "Success") {
        Auth.UpdateUser(Data.User);
        Message.Add_Message("Success", Data.Message);
        Navigate("/");
      } else {
        Message.Add_Message(
          "Error",
          Data.ErrorMessage || "Something went wrong!!"
        );
      }
    }
    // eslint-disable-next-line
  }, [Data]);
  return (
    <Flex className={Classes.Form}>
      <h1>Update Your Details</h1>
      <Form onSubmit={HandelSubmit} className={Classes.Form}>
        <Input
          type="text"
          name="Name"
          placeholder="Name"
          value={Name}
          onChange={HandelChange}
        />
        <Input
          name="Date of Birth"
          type="date"
          placeholder="Date of Birth"
          value={DOB}
          required={true}
          onChange={HandelChange}
        />
        <Flex className={Classes.FormBox}>
          <div className={Classes.Label}>Gender</div>
          <Flex className={Classes.Input}>
            <div>
              <input
                type="radio"
                id="Male"
                value="Male"
                name="Gender"
                defaultChecked
                onChange={HandelChange}
              />
              <label htmlFor="Male">Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="Female"
                value="Female"
                name="Gender"
                onChange={HandelChange}
              />
              <label htmlFor="Female">Female</label>
            </div>
          </Flex>
        </Flex>
        <Input
          type="text"
          name="Profile Description"
          placeholder="About Your Self"
          value={ProfileDescription}
          onChange={HandelChange}
        />
        <Input
          type="text"
          name="Address"
          placeholder="House Number , Street, City, Country"
          value={Address}
          onChange={HandelChange}
        />
        <Input
          type="text"
          name="Degree"
          value={Education}
          placeholder="B.tech,B.Sc,M.tech etc."
          onChange={HandelChange}
        />
        <Input
          type="text"
          name="One Line About Yourself"
          placeholder="One Liner"
          value={OneLiner}
          onChange={HandelChange}
        />
        {!Loading && <Button type="submit">Update</Button>}
        {Loading && <Loader />}
      </Form>
    </Flex>
  );
}

export default DetailForm;
