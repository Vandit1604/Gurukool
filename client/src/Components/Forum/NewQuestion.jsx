import React, { useContext, useEffect, useRef, useState } from "react";
import Classes from "./Forum.module.css";
import AddLabel from "../LabelBox/AddLabel";
import Label from "../label/Label";
import Flex from "../Ui/Flex/Flex";
import Button from "../Ui/Button/Button";
import useApi from "../../Hooks/useApi";
import MessageContext from "../../Context/Messages/MessageContext";
import { useNavigate } from "react-router";
import Loader from "../Loader/Loader";
function NewQuestion() {
  const Navigate = useNavigate();
  const { UserRequest, Data, Loading } = useApi();
  const Message = useContext(MessageContext);
  const [Labels, updateLabels] = useState([]);
  const [AddedLabels, updatelabel] = useState([]);
  const Question = useRef();
  const newLabel = (Label, color) => {
    if (!AddedLabels.includes(Label)) {
      updatelabel([...AddedLabels, Label]);
      updateLabels([...Labels, { Label, color }]);
    }
  };

  const handelSubmit = () => {
    const data = {
      Question: Question.current.value,
      Labels,
    };
    Question.current.value.trim() !== "" &&
      UserRequest("/Forum/Add", "POST", data);
  };
  useEffect(() => {
    if (Data.Status === "Success") {
      Message.Add_Message("Success", "Doubt Open SuccessFully");
      Navigate("/Forum");
    }
    // eslint-disable-next-line
  }, [Data]);
  return (
    <Flex className={Classes.Form}>
      <label className={Classes.Label}>Explain Your Question here : </label>
      <textarea
        type="text"
        name="Name"
        placeholder="Name"
        className={Classes.TextArea}
        ref={Question}
        required={true}
      />
      {Labels?.length !== 0 && (
        <Flex className={Classes.LabelBox}>
          <h3>Added Labels</h3>
          <Flex className={Classes.Wrap}>
            {Labels?.map((label) => {
              return (
                <Label
                  label={label.Label}
                  color={label.color}
                  className={Classes.Label}
                />
              );
            })}
          </Flex>
        </Flex>
      )}
      <AddLabel AddLabel={newLabel} />
      {Loading && <Loader />}
      {!Loading && (
        <Button onClick={handelSubmit} className={Classes.Btn}>
          Open Doubt
        </Button>
      )}
    </Flex>
  );
}

export default NewQuestion;
