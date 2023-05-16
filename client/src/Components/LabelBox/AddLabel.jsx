import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import useColor from "../../Hooks/useColor";
import Label from "../label/Label";
import Input from "../Ui/Input/Input";

function AddLabel(props) {
  const [InputLabel, updateInput] = useState("");
  const [Labels, updateLabels] = useState([]);
  const [FindLabels, updateResults] = useState([]);
  const { Request, Data } = useApi();
  const { GenColor, color } = useColor();
  useEffect(() => {
    Request("/Label", "GET");
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    updateLabels(Data.Label);
  }, [Data]);
  const handelChange = (event) => {
    updateInput(event.target.value);
    GenColor();
    updateResults([]);
    Labels?.map(
      (label) =>
        label.Label.toLowerCase() === event.target.value.toLowerCase() &&
        updateResults([...FindLabels, label])
    );
  };
  const handelClick = () => {
    props.AddLabel(InputLabel, color);
  };
  return (
    <React.Fragment>
      <Input
        name="Add label"
        value={InputLabel}
        type="search"
        placeholder="Search for a label here..."
        onChange={handelChange}
      />
      {InputLabel.trim() !== "" &&
        FindLabels?.length !== 0 &&
        FindLabels.map((label, index) => (
          <Label
            label={label.Label}
            color={label.Color}
            key={index}
            onClick={handelClick}
          />
        ))}
      {InputLabel.trim() !== "" && FindLabels.length === 0 && (
        <Label label={InputLabel} onClick={handelClick} color={color} />
      )}
    </React.Fragment>
  );
}

export default AddLabel;
