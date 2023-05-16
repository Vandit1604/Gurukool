import React from "react";
import Flex from "../Flex/Flex";
import Classes from "./Input.module.css";
function Input(props) {
  return (
    <Flex className={Classes.InputBox}>
      <label htmlFor={props.id} className={Classes.Labels}>
        {props.name}
      </label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onChange={props.onChange}
        placeholder={props.placeholder}
        className={props.className + " " + Classes.Input}
        required={props.required}
        minLength={props.minLength}
        autoFocus={props.autoFocus}
        ref={props.ref}
      ></input>
    </Flex>
  );
}

export default Input;
