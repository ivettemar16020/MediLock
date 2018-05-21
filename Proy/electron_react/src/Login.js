import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadScreen';


var apiBaseUrl = "http://localhost:4000/api/";
class Login extends Component {
  constructor(props){
    super(props);
    var localloginComponent=[];
    localloginComponent.push(
      <MuiThemeProvider>
        <div>
         <TextField
           hintText="Ingresa tu nombre de usuario"
           floatingLabelText="ID Paciente"
           onChange = {(event,newValue)=>this.setState({username:newValue})}
           />
         <br/>
           <TextField
             type="Contraseña"
             hintText="Ingresa tu contraseña"
             floatingLabelText="Contraseña"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Ingresar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )
    this.state={
      username:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'paciente'
    }
  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
  if(this.props.role != undefined){
    if(this.props.role == 'paciente'){
      console.log("in paciente componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Ingresa tu nombre de usuario"
             floatingLabelText="ID Paciente"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="Contraseña"
               hintText="Ingresa tu contraseña"
               floatingLabelText="Contraseña"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Ingresar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'student'})
    }
    else if(this.props.role == 'medico'){
      console.log("in medico componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Ingresa tu nombre de usuario"
             floatingLabelText="ID médico"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="Contraseña"
               hintText="Ingresa tu contraseña"
               floatingLabelText="Contraseña"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Ingresar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'teacher'})
    }
  }
  }
  handleClick(event){
    var self = this;
    var payload={
      "userid":this.state.username,
      "password":this.state.password,
      "role":this.state.loginRole
    }
    axios.post(apiBaseUrl+'login', payload)
   .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("Login successfull");
       var uploadScreen=[];
       uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
       self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.data.code == 204){
       console.log("Username password do not match");
       alert(response.data.success)
     }
     else{
       console.log("Username does not exists");
       alert("El nombre de usuario no existe");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }
  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value==1){
      var localloginComponent=[];
      loginRole='paciente';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Ingresa tu nombre de usuario"
             floatingLabelText="ID Paciente"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="Contraseña"
               hintText="Ingresa tu contraseña"
               floatingLabelText="Contraseña"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Ingresar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    else if(value == 2){
      var localloginComponent=[];
      loginRole='medico';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             hintText="Ingresa tu nombre de usuario"
             floatingLabelText="ID médico"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="Contraseña"
               hintText="Ingresa tu contraseña"
               floatingLabelText="Contraseña"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Ingresar" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
        <AppBar
             title="Login"
           />
        </MuiThemeProvider>
        <MuiThemeProvider>
        <div>
        <p>Inicia sesión como:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="Paciente" />
          <MenuItem value={2} primaryText="Médico" />
          <MenuItem value={3} primaryText="Secretaria" />
        </DropDownMenu>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;