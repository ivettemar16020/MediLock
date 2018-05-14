import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./Login"

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      loginscreen:[]
    }
  }

  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    this.setState({
                  loginscreen:loginscreen
                    })
  }

  render() {
    return(
      <div className="loginscreen">
        {this.state.loginscreen}
      </div>
    );
  }
}

export default App;
