// import React from 'react';
// import './App.css';
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./pages/LandingPage";
import Politics from "./pages/PoliticsPage";
import Tech from "./pages/TechPage";
import Sports from "./pages/SportsPage";
import Login from "./pages/LoginPage";
import NewsPage from "./pages/NewsPage";
import NavBar from "./NavBar"

// STYLES
const background = {
  backgroundColor: '#FBFAFB',
  height: '100%',
  width: '100%'
}

class App extends Component {
  render() {
    return (
      <Router>
        <div  style={background}>
          <NavBar />
          <br/>
          {/* the path is a query string for the database, not for login though */}
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/politics" component={Politics}/>
            <Route path="/sports" component={Sports}/>
            <Route path="/technology" component={Tech}/>
            <Route path="/articles/:article_id" component={NewsPage}/>
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
