import ReactDOM from "react-dom";
import "./index.css";
import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";

const postURL = "https://exercise.10uplabs.com/wp-json/wp/v2/posts";

const maxWidth = {
  width: 680,
  margin: "0 auto",
  maxWidth: "90%"
};

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await (await fetch(postURL)).json();
      setData(data);
      console.log(data);
    }
    fetchData();
  }, []);
  if (!data) return null;
  const selectedID = window.location.pathname.slice(1);
  const selectedPost = data.filter(post => post.slug === selectedID)[0];
  console.log(selectedID, selectedPost);
  return (
    <div className="App">
      <h1 style={{ fontSize: "4rem", paddingTop: "4rem", ...maxWidth }}>
        10up
        <div style={{ fontSize: "2rem" }}>
          {selectedPost && (
            <a href="/" style={{ textDecoration: "none" }}>
              {" "}
              ← back
            </a>
          )}
        </div>
      </h1>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          height: "320px",
          backgroundImage: "url(10up.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          marginBottom: "4rem"
        }}
      />
      <div
        style={{
          ...maxWidth,
          marginBottom: "25vh"
        }}
      >
        {selectedPost && (
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: selectedPost.content.rendered
              }}
            ></div>
          </div>
        )}
        {!selectedPost &&
          data.map(post => {
            return (
              <a
                href={`./${post.slug}`}
                style={{ textDecoration: "none", color: "#333" }}
              >
                <div style={{ fontSize: "2rem" }}>{post.title.rendered}</div>
                <div style={{ marginBottom: "2rem" }}>
                  <TimeAgo date={post.date} />
                </div>
              </a>
            );
          })}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
