import React from "react";

function Mentor(props) {
  console.log(props);
  return <div>{props.data[0].UserName}</div>;
}

export default Mentor;
