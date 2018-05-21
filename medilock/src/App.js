import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Loginscreen from "./views/Loginscreen"
import OlvideContrasena from "./views/OlvideContrasena"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return(
      <Loginscreen />
    )
    
  }
}

export default App;
