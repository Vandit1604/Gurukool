import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import AuthContext from "../../Context/Auth/AuthContext";
import Flex from "../Ui/Flex/Flex";
import TopBar from "./TopBar";
import Classes from "./Roadmap.module.css";
import DisplayRoadmaps from "./DisplayRoadmaps";
import NewRoadmap from "./NewRoadmap";
function Roadmap() {
  const [isNew, setisNew] = useState(false);
  const Auth = useContext(AuthContext);
  const location = useLocation();
  const search = location.search.split("=")[1];
  useEffect(() => {
    if (search === "newRoadmap") setisNew(true);
    else setisNew(false);
  }, [search]);
  return (
    <Flex className={Classes.Roadmap}>
      {Auth.isUser && Auth.User !== null && <TopBar isNew={isNew} />}
      <div className={Classes.Roadmap_Container}>
        {search === undefined && <DisplayRoadmaps />}
        {search === "newRoadmap" && <NewRoadmap />}
      </div>
    </Flex>
  );
}

export default Roadmap;
