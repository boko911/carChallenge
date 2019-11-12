import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Landing from './components/Landing/Landing.component'


class App extends Component {
    render() {
      return (
        <Router>
          <Route exact path="/" component={Landing}></Route>
        </Router>
      )
    }
}


export default App;
