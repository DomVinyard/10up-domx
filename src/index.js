import ReactDOM from "react-dom";
import "./index.css";
import React, { useState, useEffect } from "react";
import TimeAgo from "react-timeago";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const postURL =
  "https://cors-anywhere.herokuapp.com/https://exercise.10uplabs.com/wp-json/wp/v2/posts";

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
  return (
    <Router>
      <div className="App">
        <h1 style={{ fontSize: "4rem", paddingTop: "4rem", ...maxWidth }}>
          10up
          <div style={{ fontSize: "2rem" }}>
            <Route exact path="/:slug">
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
                ← back
              </Link>
            </Route>
          </div>
        </h1>
        <div style={{ marginBottom: "4rem" }}>
          <Route exact path="/">
            <div
              style={{
                maxWidth: 900,
                margin: "0 auto",
                height: "320px",
                backgroundImage: "url(10up.png)",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center"
              }}
            />
          </Route>
        </div>
        <Switch>
          <Route exact path="/">
            <div
              style={{
                ...maxWidth,
                marginBottom: "25vh"
              }}
            >
              {data.map(post => {
                return (
                  <Link
                    to={`./${post.slug}`}
                    style={{ textDecoration: "none", color: "#333" }}
                  >
                    <div style={{ fontSize: "2rem" }}>
                      {post.title.rendered}
                    </div>
                    <div style={{ marginBottom: "2rem" }}>
                      <TimeAgo date={post.date} />
                    </div>
                  </Link>
                );
              })}
              }
            </div>
          </Route>
          <Route
            path="/:slug"
            children={({
              match: {
                params: { slug }
              }
            }) => (
              <div
                style={{
                  ...maxWidth,
                  marginBottom: "25vh"
                }}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.filter(post => post.slug === slug)[0].content
                      .rendered
                  }}
                ></div>
              </div>
            )}
          ></Route>
        </Switch>
      </div>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
