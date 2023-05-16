import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/Auth/AuthContext";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Forum.module.css";
import QuestionTab from "./QuestionTab";
import TopBar from "./TopBar";
import { useLocation } from "react-router-dom";
import NewQuestion from "./NewQuestion";
function Forum() {
  const [Questiontab, setQuestiontab] = useState(false);
  const Auth = useContext(AuthContext);
  const location = useLocation();
  const search = location.search.split("=")[1];
  useEffect(() => {
    if (search === "newdoubt") setQuestiontab(true);
    else setQuestiontab(false);
  }, [search]);
  return (
    <Flex className={Classes.Forum}>
      {Auth.isUser && Auth.User !== null && (
        <TopBar isQuestiontab={Questiontab} />
      )}
      {search === undefined && <QuestionTab />}
      {search === "newdoubt" && <NewQuestion />}
    </Flex>
  );
}

export default Forum;
