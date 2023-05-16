import React, { useEffect } from "react";
import useApi from "../../Hooks/useApi";
import Loader from "../Loader/Loader";
import QuestionCard from "./QuestionCard";
function QuestionTab() {
  const { Request, Data, Loading } = useApi();
  useEffect(() => {
    Request("/Forum", "GET");
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      {Loading && <Loader />}
      {!Loading &&
        Data?.length !== 0 &&
        Data.Questions.map((question) => {
          return <QuestionCard Question={question} />;
        })}
    </React.Fragment>
  );
}

export default QuestionTab;
