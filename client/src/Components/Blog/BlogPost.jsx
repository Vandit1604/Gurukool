import React from "react";
import { Link } from "react-router-dom";
import "./BlogPost.css";
function BlogPosts(props) {
  return (
    <div className="card-grid-space" style={{ margin: "50px 30px" }}>
      <Link
        to={"/Explore?blog=" + props.Link}
        className="card"
        style={{
          backgroundImage: `url(http://localhost:8080/public/Images/${
            props.Image.split(".")[1]
          }/${props.Image})`,
        }}
      >
        <div>
          <h1>{props.title}</h1>
          <p>{props.caption}</p>
          <div className="date">{props.date}</div>
          <div className="tags">
            {props.Labels.length !== 0 &&
              // eslint-disable-next-line
              props.Labels.map((label, index) => {
                if (index < 4) {
                  return (
                    <div
                      className="tag"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.Label}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default BlogPosts;
