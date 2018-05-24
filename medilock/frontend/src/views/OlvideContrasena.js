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
            correo: '',
            errorTextCorreo:''
        }

        this.handleReturnToLogin = this.handleReturnToLogin.bind(this);
        this.handleEnviarmeCorreo = this.handleEnviarmeCorreo.bind(this);
    }

    /* Regresa a la pantalla de Login si presiona la flecha de regreso */
    handleReturnToLogin(){
        this.props.onCambiarView('login');
    }

    handleEnviarmeCorreo(){
        const error = 'Este campo es obligatorio';
        var puedeEnviarCorreo = true;

        if(this.state.correo === ''){
            this.setState({errorTextCorreo:error});
            puedeEnviarCorreo = false;
        }

        if(puedeEnviarCorreo){
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
                            title="Olvide contraseña"
                            iconElementLeft = {<IconButton><NavigationReturn/></IconButton>}
                            onLeftIconButtonClick={this.handleReturnToLogin}
                        />
                        <img src={require("../images/logoMedilock.jpg")} style={{marginLeft: 220, marginTop: 20}}/>

                        <TextField 
                            floatingLabelText="Correo electrónico"
                            onChange = {(event,newValue) => this.setState({correo:newValue})}
                            style={styleText}
                            errorText={this.state.errorTextCorreo}
                            />
                        <br/>
                        
                        <RaisedButton 
                            label="Enviarme correo" 
                            onClick={this.handleEnviarmeCorreo}
                            primary={true} 
                            style={styleEnviarCorreoButton} 
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

const styleEnviarCorreoButton = {
    margin: 15,
    marginLeft: 320
};

export default OlvideContrasena;