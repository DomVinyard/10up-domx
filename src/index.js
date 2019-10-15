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

const Oneup = ({ totalVisible, setTotalVisible }) => {
  const [visible, setVisible] = useState(true);
  return (
    <img
      style={{ width: 122, margin: 8, opacity: visible ? 1 : 0 }}
      src="1up.png"
      onClick={() => {
        if (visible) {
          setVisible(false);
          setTotalVisible(totalVisible - 1);
        }
      }}
    />
  );
};

function App() {
  const [data, setData] = useState();
  const [totalVisible, setTotalVisible] = useState(10);
  useEffect(() => {
    async function fetchData() {
      const data = await (await fetch(postURL)).json();
      setData(data);
    }
    fetchData();
  }, []);
  if (!data) return null;
  if (!totalVisible)
    return (
      <div
        style={{
          background: "url(gameover.jpg)",
          backgroundSize: "cover",
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          width: "100vw",
          backgroundPosition: "center center"
        }}
      ></div>
    );
  return (
    <Router>
      <div className="App">
        <h1 style={{ fontSize: "4rem", paddingTop: "4rem", ...maxWidth }}>
          {totalVisible}up
          <div style={{ fontSize: "2rem" }}>
            <Route exact path="/:slug">
              <Link to="/" style={{ textDecoration: "none" }}>
                {" "}
                ← back
              </Link>
            </Route>
          </div>
        </h1>
        <div style={{ marginBottom: "4rem", marginTop: "1rem" }}>
          <Route exact path="/">
            <div style={{ textAlign: "center" }}>
              {Array(5)
                .fill(0)
                .map(_ => (
                  <Oneup
                    totalVisible={totalVisible}
                    setTotalVisible={setTotalVisible}
                  />
                ))}
            </div>
            <div style={{ textAlign: "center" }}>
              {Array(5)
                .fill(0)
                .map(_ => (
                  <Oneup
                    totalVisible={totalVisible}
                    setTotalVisible={setTotalVisible}
                  />
                ))}
            </div>
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
