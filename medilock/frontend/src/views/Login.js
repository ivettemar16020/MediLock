import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import React, { Component}  from 'react';
import { IconButton } from 'material-ui';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            contrasena:'',
            role:'Paciente',
            floatinTextUsername:'Correo del Paciente',
            errorTextUsername:'',
            errorTextContrasena:'',
            usuariosdb: []
        }
        
        this.handleCambiarAOlvideContrasenaView = this.handleCambiarAOlvideContrasenaView.bind(this);
        this.handleCambiarARegstrarmeView = this.handleCambiarARegstrarmeView.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.handleRegistrar = this.handleRegistrar.bind(this);
    }
    
    // Make ajax calls here
	componentWillMount() {
		console.log('component has mounted');
        var that = this
		fetch('http://localhost:3000/api/usuarios')
			.then(function(response){
				//console.log(that.medicos)
				response.json()
					.then(function(data){
						console.log(data);
						that.setState({
							usuariosdb: data
						});
					})		
			});
	}
    
    
    /* Cambia el valor de 'view' en la clase de Loginscreen para ir a la pantalla de 'Olvide Contraseña' */
    handleCambiarAOlvideContrasenaView(){
        this.props.onCambiarView('olvideContrasena');
    }

    /* Cambia el valor de 'view' en la clase de Loginscreen para ir a la pantalla de 'Olvide Contraseña' */
    handleCambiarARegstrarmeView(){
        this.props.onCambiarView('registrarme')
    }
    
    handleRegistrar(){
        if(this.state.role == "Médico"){
            this.props.onCambiarRole(1);
        }
        if(this.state.role == "Secretarias"){
            this.props.onCambiarRole(2);
        }
        if(this.state.role == "Paciente"){
            this.props.onCambiarRole(3);
        }
        console.log("rol" , this.state.role);
        this.handleCambiarARegstrarmeView();
    }

    /* Funcion que se llama al presionar el boton de 'Entrar' */
    handleLogin(){
        const errorCampoObligatorio = 'Este campo es obligatorio';
        const errorUsernameInvalido = 'Este usuario es inválido';
        const errorContrasenaInvalida = 'Esta contraseña es inválida';

        var camposLlenos = 0;

        /* Verifica si el campo de usuario esta lleno */
        if(this.state.username === ''){
            this.setState({errorTextUsername:errorCampoObligatorio});
        } else {
            camposLlenos++;
        }

        /* Verifica si el campo de contrasena esta lleno */
        if(this.state.contrasena === ''){
            this.setState({errorTextContrasena:errorCampoObligatorio});
        } else {
            camposLlenos++;
        }

        /* Si ambos campos estan llenos */
        if(camposLlenos===2){
            this.setState({errorTextUsername:'',errorTextContrasena:''});
            /*console.log('hola')
            for (var i = 0; i < this.state.usuariosdb.length; i++){
                var texto = this.state.usuariosdb[i];
                var obj = JSON.parse(texto);
                console.log(obj);
            }*/
                
            
            /* TODO: Verificar si los datos son correctos o no */
            const usernameExiste = true;
            const contrasenaCorrecta = true;

            
            if(!usernameExiste){ /* Si el usuario es invalido */
                this.setState({errorTextUsername:errorUsernameInvalido,errorTextContrasena:'', contrasena:''});
            } else if(!contrasenaCorrecta){ /* Si la contrasena es invalida */
                this.setState({errorTextUsername:'', errorTextContrasena:errorContrasenaInvalida});
            } else { /* Si ambos campos son validos */
                this.setState({errorTextUsername:'',errorTextContrasena:''});

                /* TODO: Dirigirse a la siguiente pantalla si los datos son validos */

            }
        }
        /* TODO: Codigo para el Login */
        /* El valor del usuario y contraseña se obtiene 'this.state.username' y 'this.state.contrasena' respectivamente */
    /*
        let usuario_data = {
            correo: this.state.username,
            contrasena: this.state.contrasena
        };
        //xmlhttprequest()          
        fetch('http://localhost:3000/api/usuarioNuevo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(usuario_data)
        })
        .then(function(response){
            console.log(response)
            response.json()
                .then(function(data){
                    console.log(data);
                    /*this,setState({
                        valido: data
                    })
                    *//*
            })
        })
        .catch(function(err){
            console.log(err)
        });
    */
    
    }

    /* Funcion que se llama al hacer cambio de Rol */
    handleRoleChange(value){
        var floatingTextUser = 'Correo del ' + value;
        this.setState({role:value});
        this.setState({floatinTextUsername:floatingTextUser});
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Inicio de sesión"
                            iconElementLeft = {<IconButton></IconButton>}
                        />
                        <img src={require("../images/logoMedilock.jpg")} style={{marginLeft: 220, marginTop: 20}}/>

                        <SelectField
                                floatingLabelText="Rol"
                                value={this.state.role}
                                onChange = {(event, index, value) => this.handleRoleChange(value)}
                                style={styleText}
                            >
                                <MenuItem value={'Paciente'} primaryText="Paciente"/>
                                <MenuItem value={'Médico'} primaryText="Médico"/>
                                <MenuItem value={'Secretaria'} primaryText="Secretaria"/>
                            </SelectField>
                            <br/>

                        <TextField 
                            floatingLabelText={this.state.floatinTextUsername}
                            hintText='Correo electrónico'
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                            value={this.state.username}
                            style={styleText}
                            errorText={this.state.errorTextUsername}
                            />
                        <br/>
                        <TextField
                            type="password"
                            floatingLabelText="Contraseña"
                            hintText='Ingresa tu contraseña'
                            onChange = {(event,newValue) => this.setState({contrasena:newValue})}
                            value={this.state.contrasena}
                            style={styleText}
                            errorText={this.state.errorTextContrasena}
                        />
                        <br/>
                        <FlatButton 
                            label="Olvidé mi Contraseña" 
                            onClick={this.handleCambiarAOlvideContrasenaView} 
                            primary={true} 
                            style={styleOlvideContrasenaButton} 
                        />
                        <RaisedButton 
                            label="Entrar" 
                            onClick={this.handleLogin}
                            primary={true} 
                            style={styleEntrarButton} 
                        />
                        <FlatButton 
                            label="Registrarme" 
                            onClick={this.handleRegistrar} 
                            secondary={true} 
                            style={styleRegistrarmeButton} 
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

const styleEntrarButton = {
    margin: 15,
    marginLeft: 20,
};

const styleOlvideContrasenaButton = {
    fontSize: '5px', 
    marginLeft: 250,
};

const styleRegistrarmeButton = {
    fontSize: '5px',
    marginLeft: 350
};

export default Login;