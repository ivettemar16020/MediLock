import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { IconButton } from 'material-ui';
import NavigationReturn from 'material-ui/svg-icons/navigation/arrow-back';
import React, { Component}  from 'react';

class OlvideContrasena extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            errorTextUsername:'',
            telefono:'',
            errorTelefono:''
        }

        this.handleReturnToLogin = this.handleReturnToLogin.bind(this);
        this.handleEnviarmePin = this.handleEnviarmePin.bind(this);
    }

    /* Regresa a la pantalla de Login si presiona la flecha de regreso */
    handleReturnToLogin(){
        this.props.onCambiarView('login');
    }

    handleEnviarmePin(){
        const error = 'Este campo es obligatorio';
        var puedeEnviarPin = true;

        if(this.state.username === ''){
            this.setState({errorTextUsername:error});
            puedeEnviarPin = false;
        }

        if(this.state.telefono === ''){
            this.setState({errorTelefono:error});
            puedeEnviarPin = false;
        }

        if(puedeEnviarPin){
            /* TODO: Codigo para enviar correo de cambio de contraseña */
            /* El valor del correo se encuentra con 'this.state.correo' */
        }
    }

    render(){
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Olvidé mi contraseña"
                            iconElementLeft = {<IconButton><NavigationReturn/></IconButton>}
                            onLeftIconButtonClick={this.handleReturnToLogin}
                        />
                        <img src={require("../images/logoMedilock.jpg")} style={{marginLeft: 220, marginTop: 20}}/>

                        <TextField 
                            floatingLabelText="Nombre de usuario"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                            style={styleText}
                            errorText={this.state.errorTextUsername}
                            />
                        <br/>

                        <TextField 
                            floatingLabelText="Número de teléfono"
                            onChange = {(event,newValue) => this.setState({telefono:newValue})}
                            style={styleText}
                            errorText={this.state.errorTelefono}
                            />
                        <br/>
                        
                        <RaisedButton 
                            label="Enviarme pin" 
                            onClick={this.handleEnviarmePin}
                            primary={true} 
                            style={styleEnviarPinButton} 
                        />
                            
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const styleText = {
    marginLeft: 280,
};

const styleEnviarPinButton = {
    margin: 15,
    marginLeft: 350
};

export default OlvideContrasena;