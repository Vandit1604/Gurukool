import React, { useContext, useState } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import useApi from "../../Hooks/useApi";
import AddComment from "../Comments/AddComment";
import DisplayComments from "../Comments/DisplayComments";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Forum.module.css";
import Loader from "../Loader/Loader";
function QuestionCard(props) {
  const [Comments, updateComments] = useState(props.Question.Comments);
  const { Loading } = useApi();
  const Auth = useContext(AuthContext);
  const AddedComment = async (comment) => {
    await updateComments([{ Comment: comment }, ...Comments]);
  };
  return (
    <Flex className={Classes.QuestionCard}>
      <Flex className={Classes.Question_Top}>
        <Flex>
          <div className={Classes.ImageBox}>
            <img
              src="https://images.pexels.com/photos/1987301/pexels-photo-1987301.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="ProfileImage"
            />
          </div>
          <div className={Classes.Name}>Pulkit</div>
        </Flex>
        <div>
          <i className="fas fa-ellipsis-v"></i>
        </div>
      </Flex>

      <Flex className={Classes.Label_Box}>
        {props.Question.Labels.length !== 0 &&
          props.Question.Labels.map((label) => (
            <div
              className={Classes.Label}
              style={{ backgroundColor: label.color }}
            >
              {label.Label}
            </div>
          ))}
      </Flex>

      <Flex className={Classes.Question_Box}>{props.Question.Question}</Flex>
      {props.Question.Solutions.Solution && (
        <Flex>{props.Question.Solution.Solution}</Flex>
      )}
      {Comments.length !== 0 && (
        <Flex className={Classes.Question_Comments}>
          {Loading && <Loader />}
          {!Loading &&
            Comments.length !== 0 &&
            Comments.map(
              (comment, index) =>
                index < 3 && <DisplayComments comment={comment} />
            )}
        </Flex>
      )}
      {Auth.isUser && Auth.User !== null && (
        <Flex className={Classes.Question_AddComment}>
          <AddComment
            AddedComment={AddedComment}
            target={`/Forum/edit/${props.Question._id}`}
            Comments={Comments}
          />
        </Flex>
      )}
    </Flex>
  );
}

export default QuestionCard;
