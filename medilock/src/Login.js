import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import React, { Component}  from 'react';
import { IconButton } from 'material-ui';
class Login extends Component {
    constructor(props){
    super(props);
    this.state={
    username:'',
    password:''
    }
    }
    render() {
        return (
        <div>
            <MuiThemeProvider>
            <div>
            <AppBar
                title="Login"
                iconElementLeft = {<IconButton></IconButton>}
            />
            <TextField 
                floatingLabelText="Usuario"
                onChange = {(event,newValue) => this.setState({username:newValue})}
                style={styleText}
                />
            <br/>
                <TextField
                type="password"
                floatingLabelText="Contraseña"
                onChange = {(event,newValue) => this.setState({password:newValue})}
                style={styleText}
                />
                <br/>
                <RaisedButton label="Entrar" primary={true} style={styleButton} />
            </div>
            </MuiThemeProvider>
        </div>
        );
    }
}
const styleText = {
    marginLeft: 280,
};

const styleButton = {
    margin: 15,
    marginLeft: 365,
};
export default Login;