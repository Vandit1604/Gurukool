import React, { useState } from "react";
import Button from "../Ui/Button/Button";
import Input from "../Ui/Input/Input";
import Form from "../Ui/Form/Form";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";
function AddComment(props) {
  const { UserRequest, Loading } = useApi();
  const [Comment, updateComments] = useState("");
  const HandelChange = (event) => {
    updateComments(event.target.value);
  };
  const HandelSubmit = async (event) => {
    await UserRequest(props.target, "PUT", {
      Comments: [{ Comment: Comment }, ...props.Comments],
    });
    props.AddedComment(Comment);
    updateComments("");
  };
  return (
    <Form style={{ width: "90%" }} onSubmit={HandelSubmit}>
      <Input
        type="text"
        placeholder="Comment..."
        name="Add Comment"
        value={Comment}
        onChange={HandelChange}
        required={true}
      />
      {Loading && <Loader />}
      {!Loading && (
        <Button
          style={{
            backgroundColor: "var(--secondary-color)",
            color: "white",
            width: "10%",
            fontSize: "15px",
          }}
        >
          Comment
        </Button>
      )}
    </Form>
  );
}

export default AddComment;
