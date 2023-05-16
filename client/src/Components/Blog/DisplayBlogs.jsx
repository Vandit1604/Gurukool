import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Blog.module.css";
import BlogPosts from "./BlogPost";
import Loader from "../Loader/Loader";
function DisplayBlogs() {
  const [Results, updateResults] = useState([]);
  const { Request, Data, Loading } = useApi();
  useEffect(() => {
    Request("/Blog/", "GET");
    // eslint-disable-next-line
  }, []);
  // eslint-disable-next-line
  useEffect(() => {
    if (Data.Status === "Success" && Data.length !== 0) {
      updateResults(Data.Blogs);
    }
  });
  return (
    <Flex className={Classes.BlogBox}>
      {Loading && <Loader />}
      {Results.length !== 0 &&
        Results.map((blog, index) => {
          const date = new Date(blog.createdAt);
          return (
            <BlogPosts
              Link={blog._id}
              Image={blog.Image}
              title={blog.Title}
              caption={blog.Caption}
              Article={blog.Article}
              date={date.toDateString()}
              key={index}
              Labels={blog.Labels}
            />
          );
        })}
    </Flex>
  );
}

export default DisplayBlogs;
