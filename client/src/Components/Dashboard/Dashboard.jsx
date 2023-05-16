import React from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./DashBoard.module.css";
import Mentor from "./Mentor";
import Student from "./Student";
function Dashboard(props) {
  console.log(props);
  return (
    <Flex className={Classes.Dashboard}>
      <div className={Classes.Setting_icon}>
        <i className="fas fa-cog"></i>
      </div>
      {props.User?.length !== 0 && (
        <div>
          <div className={Classes.ImageBox}>
            <img
              src={
                "http://localhost:8080/public/Images/png/" +
                props.User[0].ProfilePhoto
              }
              alt="ProfileImage"
              className={Classes.profilePicture}
            />
            <div>{props.User[0].Name}</div>
            <div>{props.User[0].Email}</div>
            <div>{props.User[0].AccountType}</div>
          </div>
          {props.User[0].AccountType === "Mentor" && (
            <Mentor data={props.User} />
          )}
          {props.User[0].AccountType === "Student" && (
            <Student data={props.User} />
          )}
        </div>
      )}
    </Flex>
  );
}

export default Dashboard;
