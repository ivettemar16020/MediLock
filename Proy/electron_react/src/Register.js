import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }
  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }
  handleClick(event,role){
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0){
      var payload={
      "first_name": this.state.first_name,
      "last_name":this.state.last_name,
      "userid":this.state.email,
      "password":this.state.password,
      "role":role
      }
      axios.post(apiBaseUrl+'/register', payload)
     .then(function (response) {
       console.log(response);
       if(response.data.code === 200){
        //  console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "¿Aún no tienes cuenta? ¡Registrate ya!";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Registrarse",
         isLogin:true
          });
       }
       else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Debes completar todos los campos");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel;
    if(this.props.role === "paciente"){
      userhintText="Ingresa tu nombre de usuario",
      userLabel="ID Paciente"
    }
    else if(this.props.role === "médico") {
      userhintText="Ingresa tu nombre de usuario",
      userLabel="ID Médico"
    }
    else if(this.props.role === "secretaria") {
      userhintText="Ingresa tu nombre de usuario",
      userLabel="ID Secretaria"
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
             title="Registrate"
           />
           <TextField
             hintText="Ingresa tu nombre"
             floatingLabelText="Nombre"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Ingresa tu apellido"
             floatingLabelText="Apellido"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Enviar" primary={true} style={style} onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;