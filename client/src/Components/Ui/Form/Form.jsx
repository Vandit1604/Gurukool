import React from "react";
import Classes from "./Form.module.css";
function Form(props) {
  return (
    <form
      className={props.className + " " + Classes.Form}
      onSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(event);
      }}
      onClick={props.onClick}
    >
      {props.children}
    </form>
  );
}

export default Form;
