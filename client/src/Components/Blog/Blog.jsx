import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import AuthContext from "../../Context/Auth/AuthContext";
import Flex from "../Ui/Flex/Flex";
import NewBlog from "./NewBlog";
import TopBar from "./TopBar";
import Classes from "./Blog.module.css";
import DisplayBlogs from "./DisplayBlogs";
import FullBlog from "./FullBlog";
function Blog() {
  const [isNew, setisNew] = useState(false);
  const Auth = useContext(AuthContext);
  const location = useLocation();
  const search = location.search.split("=")[1];
  useEffect(() => {
    if (search === "newblog") setisNew(true);
    else setisNew(false);
  }, [search]);
  return (
    <Flex className={Classes.Blog}>
      {Auth.isUser && Auth.User !== null && <TopBar isNew={isNew} />}
      {search === undefined && <DisplayBlogs />}
      {search === "newblog" && <NewBlog />}
      {search !== "newblog" && search !== undefined && <FullBlog id={search} />}
    </Flex>
  );
}

export default Blog;
