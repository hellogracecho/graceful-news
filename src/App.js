import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  NavLink,
} from "react-router-dom";
import "./App.scss";
import PropTypes from "prop-types";

import Home from "./components/home/Home";
import About from "./components/about/About";
import Error from "./components/error/Error";

const API_KEY = "41c3a691c6064f018a7a27d285276ce6";
const BASE_URL =
  "https://newsapi.org/v2/top-headlines?country=ca&apiKey=" + API_KEY;

function App() {
  const [news, setNews] = useState([]);

  const getNews = () => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Router>
      <NavLink
        exact={true}
        to="/"
        activeClassName="active"
        className="nav-link"
      >
        HOME
      </NavLink>
      <NavLink to="/about" activeClassName="active" className="nav-link">
        ABOUT
      </NavLink>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/*">
          <Error />
        </Route>
      </Switch>
      {/* TODO: Add PropTypes */}
      {news.map((item) => {
        const { autor, title, description, url, urlToImage } = item;
        return <div key={url}>{title}</div>;
      })}
    </Router>
  );
}

export default App;
