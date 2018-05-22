import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { IconButton } from 'material-ui';
import NavigationReturn from 'material-ui/svg-icons/navigation/arrow-back';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import React, { Component}  from 'react';


class Registrarme extends Component{
    constructor(props){
        super(props);
        this.state = {
            nombre:'',
            apellido:'',
            username:'',
            correo:'',
            contrasena:'',
            telefono:'',
            departamento:'',
            domicilio:'',
            sexo:'Masculino',
            peso:'',
            pantallaSignIn:1,
            errorTextNombre:'',
            errorTextApellido:'',
            errorTextCorreo:'',
            errorTextUsername:'',
            errorTextContrasena:'',
            errorTextTelefono:''
        }

        this.handleSiguienteButton = this.handleSiguienteButton.bind(this);
        this.handleRegistrarmeButton = this.handleRegistrarmeButton.bind(this);
        this.handleReturnFromPantallaUno = this.handleReturnFromPantallaUno.bind(this);
        this.handleReturnFromPantallaDos = this.handleReturnFromPantallaDos.bind(this);
    }

    /* Regresa a la pantalla uno cuando se presiona la flecha de regreso en pantalla dos */
    handleReturnFromPantallaDos(){
        this.setState({pantallaSignIn:1});
    }

    /* Regresa a la pantalla de Login si se presiona la felcha de regreso en pantalla uno */
    handleReturnFromPantallaUno(){
        this.props.onCambiarView('login');
    }

    /* Verifica que los campos obligatorios de la primera pantalla de registro esten llenos */
    handleSiguienteButton(){
        const error = 'Este campo es obligatorio'; //Mensaje de error
        var puedePasarSiguiente = 0; //Conteo para ver cuantos campos se encuentran llenos

        /* Verifica que el campo de nombre este lleno */
        if(this.state.nombre === ''){
            this.setState({errorTextNombre:error});
        } else {
            puedePasarSiguiente++;
        }

        /* Verifica que el campo de apellido este lleno */
        if(this.state.apellido === ''){
            this.setState({errorTextApellido:error});
        } else {
            puedePasarSiguiente++;
        }

        /* Verifica que el campo de correo este lleno */
        if(this.state.correo === ''){
            this.setState({errorTextCorreo:error});
        } else {
            puedePasarSiguiente++;
        }

        /* Verifica que el campo de username este lleno */
        if(this.state.username === ''){
            this.setState({errorTextUsername:error});
        } else {
            puedePasarSiguiente++;
        }

        /* Verifica que el campo de contraseña este lleno */
        if(this.state.contrasena === ''){
            this.setState({errorTextContrasena:error});
        } else {
            puedePasarSiguiente++;
        }

        /* Si todos los campos estan llenos tiene el permiso de pasar a la siguiente pantalla */
        if(puedePasarSiguiente === 5){
            this.setState({pantallaSignIn:2});

            /* Quita todos los mensajes de errores que se encontraron */
            this.setState({errorTextNombre:'', errorTextApellido:'', errorTextCorreo:'', errorTextUsername:'', errorTextContrasena:''})
        }
    }

    /* Verifica que los campos obligatorios de la segunda pantalla de registro esten llenos */
    handleRegistrarmeButton(){
        const error = 'Este campo es obligatorio' //Mensaje de error si hay un campo obligatorio no lleno
        var puedeRegistrar = true; //Verificador todos los campos obligatorios estan llenos

        /* Verifica si el campo de telefono se encuentra lleno */
        if(this.state.telefono === ''){
            this.setState({errorTextTelefono:error});
            puedeRegistrar = false;
        }

        /* Si todos los campos obligatorios estan llenos tiene el permiso para registrar */
        if(puedeRegistrar){
            /* Quita el mensaje de error del telefono */
            this.setState({errorTextTelefono:''});

            /* TODO: CODIGO PARA REGISTRAR AL USUARIO */


        }
    }


    render(){
        if(this.state.pantallaSignIn ==1){
            return(
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Registrarme"
                                iconElementLeft = {<IconButton><NavigationReturn/></IconButton>}
                                onLeftIconButtonClick={this.handleReturnFromPantallaUno}
                            />

                            <TextField 
                                floatingLabelText="Nombre *"
                                onChange = {(event,newValue) => this.setState({nombre:newValue})}
                                style={styleText}
                                value={this.state.nombre}
                                errorText={this.state.errorTextNombre}
                                />
                            <br/>
                            <TextField
                                floatingLabelText="Apellido *"
                                onChange = {(event,newValue) => this.setState({apellido:newValue})}
                                style={styleText}
                                value={this.state.apellido}
                                errorText={this.state.errorTextApellido}
                            />
                            <br/>

                            <TextField
                                floatingLabelText="Correo *"
                                onChange = {(event,newValue) => this.setState({correo:newValue})}
                                style={styleText}
                                value={this.state.correo}
                                errorText={this.state.errorTextCorreo}
                            />
                            <br/>

                            <TextField
                                floatingLabelText="Username *"
                                onChange = {(event,newValue) => this.setState({username:newValue})}
                                style={styleText}
                                value={this.state.username}
                                errorText={this.state.errorTextUsername}
                            />
                            <br/>

                            <TextField
                                floatingLabelText="Contraseña *"
                                onChange = {(event,newValue) => this.setState({contrasena:newValue})}
                                style={styleText}
                                value={this.state.contrasena}
                                errorText={this.state.errorTextContrasena}
                            />
                            <br/>
                            
                            <FlatButton 
                                label="Siguiente"
                                primary={true} 
                                style={styleButton}
                                onClick={this.handleSiguienteButton}
                            />

                                
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        } else {
            return (
                <div>
                    <MuiThemeProvider>
                        <div>
                            <AppBar
                                title="Registrarme"
                                iconElementLeft = {<IconButton><NavigationReturn/></IconButton>}
                                onLeftIconButtonClick={this.handleReturnFromPantallaDos}
                            />
            
                            <TextField 
                                floatingLabelText="Telefono *"
                                onChange = {(event,newValue) => this.setState({telefono:newValue})}
                                style={styleText}
                                value={this.state.telefono}
                                errorText={this.state.errorTextTelefono}
                                />
                            <br/>
                            <TextField
                                floatingLabelText="Departamento"
                                onChange = {(event,newValue) => this.setState({departamento:newValue})}
                                style={styleText}
                                value={this.state.departamento}
                            />
                            <br/>
            
                            <TextField
                                floatingLabelText="Domicilio"
                                onChange = {(event,newValue) => this.setState({domicilio:newValue})}
                                style={styleText}
                                value={this.state.domicilio}
                            />
                            <br/>
            
                            <SelectField
                                floatingLabelText="Sexo"
                                value={this.state.sexo}
                                onChange = {(event, index, value) => this.setState({sexo:value})}
                                style={styleText}
                            >
                                <MenuItem value={'Masculino'} primaryText="Masculino"/>
                                <MenuItem value={'Femenino'} primaryText="Femenino"/>
                            </SelectField>
                            <br/>
            
                            <TextField
                                floatingLabelText="Peso"
                                onChange = {(event,newValue) => this.setState({peso:newValue})}
                                style={styleText}
                                value={this.state.peso}
                            />
                            <br/>
                            
                            <RaisedButton 
                                label="Registrarme"
                                primary={true} 
                                style={styleButton} 
                                onClick={this.handleRegistrarmeButton}
                            />
            
                                
                        </div>
                    </MuiThemeProvider>
                </div>
            );
        }
    }
}

const styleText = {
    marginLeft: 280,
};

const styleButton = {
    fontSize: '5px', 
    margin: 15,
    marginLeft: 350,
};

export default Registrarme;