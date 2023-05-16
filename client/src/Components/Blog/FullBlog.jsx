import React, { useEffect, useState } from "react";
import useApi from "../../Hooks/useApi";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Blog.module.css";
import Loader from "../Loader/Loader";
import Author from "./Author";
function FullBlog(props) {
  const [BlogData, updateBlogData] = useState({});
  const { Request, Data, Loading } = useApi();
  const [Image, setImage] = useState("");
  useEffect(() => {
    Request("/Blog?id=" + props.id, "GET");
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (Data.length !== 0 && Data.Blogs) {
      updateBlogData(Data.Blogs[0]);
      setImage(Data.Blogs[0].Image);
    }
  }, [Data]);
  return (
    <Flex className={Classes.Main_Box}>
      {Loading && <Loader />}
      {!Loading && BlogData !== {} && (
        <Flex className={Classes.Blog}>
          <Flex className={Classes.Main_Box_Image}>
            <img
              src={`http://localhost:8080/public/Images/${
                Image?.split(".")[1]
              }/${Image}`}
              alt="TheBlogImage"
            />
          </Flex>
          <div className={Classes.Main_Title}>{BlogData.Title}</div>

          <Flex className={Classes.Main_Detail}>
            <Author UserId={BlogData.UserId} BlogId={BlogData._id} />
            <div>Date : {BlogData.createdAt}</div>
          </Flex>
          {BlogData.Labels?.length !== 0 && (
            <Flex
              className={Classes.LabelBox}
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "flex-start",
                borderTop: "1px solid black",
                borderBottom: "1px solid black",
                padding: "20px 0px",
              }}
            >
              {BlogData.Labels?.map((label, index) => {
                return (
                  <Flex
                    className={Classes.Label}
                    style={{ backgroundColor: label.color }}
                    key={index}
                  >
                    {label.Label}
                  </Flex>
                );
              })}
            </Flex>
          )}
          <p>{BlogData.Article}</p>
        </Flex>
      )}
    </Flex>
  );
}

export default FullBlog;
