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
            correoValido:false,
            contrasena:'',
            contrasenaCom:'',
            telefono:'',
            departamento:'',
            domicilio:'',
            sexo:'Masculino',
            codigoIngresado:'',
            codigoEnviado:'',
            pantallaSignIn:1,
            errorTextNombre:'',
            errorTextApellido:'',
            errorTextCorreo:'',
            errorTextUsername:'',
            errorTextContrasena:'',
            errorTextContrasenaCom:'',
            errorTextTelefono:''
        }

        this.handleRegistrarmeButton = this.handleRegistrarmeButton.bind(this);
        this.handleReturnFromPantallaUno = this.handleReturnFromPantallaUno.bind(this);
        this.handleReturnFromPantallaDos = this.handleReturnFromPantallaDos.bind(this);
        this.handleVerificarButton = this.handleVerificarButton.bind(this, this.codigoEnviado);
    }

    /* Regresa a la pantalla uno cuando se presiona la flecha de regreso en pantalla dos */
    handleReturnFromPantallaDos(){
        this.setState({pantallaSignIn:1});
    }

    /* Regresa a la pantalla de Login si se presiona la felcha de regreso en pantalla uno */
    handleReturnFromPantallaUno(){
        this.props.onCambiarView('login');
    }

    /* Escribe los datos del nuevo usuario en la base de datos */
    
    agregarUsuario(rol, ape, nom, contra, co, user){
        let usuario_data = {
            id_rol: rol,
            apellido: ape,
            contrasena: contra,
            nombre: nom,
            username: user,
            correo: co
        };
        //xmlhttprequest()          
        fetch('http://localhost:3000/api/usuarioNuevo', {
            method: 'POST',
            headers: {'Acept':'aplication/json, text/plain, */*', 'Content-Type': 'application/json'},
            body: JSON.stringify(usuario_data)
        })
        .then(function(response){
            console.log(response)
            response.json()
                .then(function(data){
            })
        })
        .catch(function(err){
            console.log(err)
        });
    }
    
    /* Verifica que los campos obligatorios de la segunda pantalla de registro esten llenos */
    handleRegistrarmeButton(){
        console.log("entro1");
        const error = 'Este campo es obligatorio'; //Mensaje de error si hay un campo obligatorio no lleno
        const errorEmail = 'El correo ingresado no es válido';
        var puedeRegistrar = 0; //Verificador todos los campos obligatorios estan llenos
        var valid = false;

        while(puedeRegistrar < 7){

            /* Verifica que el campo de nombre este lleno */
            if(this.state.nombre === ''){
                this.setState({errorTextNombre:error});
            } else {
                this.setState({errorTextNombre:''});
                puedeRegistrar++;
            }

            /* Verifica que el campo de apellido este lleno */
            if(this.state.apellido === ''){
                this.setState({errorTextApellido:error});
            } else {
                this.setState({errorTextApellido:''});
                puedeRegistrar++;
            }

            /* Verifica que el campo de correo este lleno */
            if(this.state.correo === ''){
                this.setState({errorTextCorreo:error});
            } else {
                this.setState({errorTextCorreo:''});
                if (this.state.correo.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)){
                    console.log('correo valido');
                    puedeRegistrar++;
                    this.setState({errorTextCorreo:''});
                }
                else{
                    this.setState({errorTextCorreo:errorEmail});
                }
            }

            /* Verifica que el campo de username este lleno */
            if(this.state.username === ''){
                this.setState({errorTextUsername:error});
            } else {
                this.setState({errorTextUsername:''});
                puedeRegistrar++;
            }

            /* Verifica que el campo de contraseña este lleno */
            if(this.state.contrasena === ''){
                this.setState({errorTextContrasena:error});
            } else {
                this.setState({errorTextContrasena:''});
                puedeRegistrar++;
            }

            /* Verifica que el campo de contraseña este lleno */
            if(this.state.contrasenaCom === ''){
                this.setState({errorTextContrasenaCom:error});
            } else {
                this.setState({errorTextContrasenaCom:''});
                puedeRegistrar++;
            }

            /* Verifica si el campo de telefono se encuentra lleno */
            if(this.state.telefono === ''){
                this.setState({errorTextTelefono:error});
            }else{
                this.setState({errorTextTelefono:''});
                puedeRegistrar++;
            }
        }
        /* Si todos los campos obligatorios estan llenos tiene el permiso para registrar */
        if(puedeRegistrar === 7){
            console.log("Entro")
            /* Quita todos los mensajes de errores que se encontraron */
            this.setState({errorTextNombre:'', errorTextApellido:'', errorTextCorreo:'', errorTextUsername:'', errorTextContrasena:'', errorTextContrasenaCom:'', errorTextTelefono:''})
            //this.props.onCambiarView('login');


        // Generar codigo
        var num = Math.floor((Math.random() * 9999) + 999);
        
        var code = num.toString();
        var largo = code.length;
        
       

        // Enviar codigo a numero de telefono
        const Nexmo = require('nexmo');
        const nexmo = new Nexmo({
            apiKey: '7430017c',
            apiSecret: 'cYL1PoQcxiapwqcm'
        });
        
        const from = 'MediLock'
        const to = 50242897293
        const text = 'Codigo de verificacion de cuenta: ' + code
        //nexmo.message.sendSms(from, to, text)
        
        nexmo.message.sendSms(from, to, text, (error, response) => {
          if(error) {
            throw error;
          } else if(response.messages[0].status != '0') {
            console.error(response);
            throw 'Nexmo returned back a non-zero status';
          } else {
            console.log(response);
          }
        });
                
        this.codigoEnviado = code;
                
         
        }
        
        /* TODO: CODIGO PARA REGISTRAR AL USUARIO */
         let usuario_data = {
            id_rol: this.props.role,
            apellido: this.state.apellido,
            contrasena: this.state.contrasena,
            nombre: this.state.nombre,
            username: this.state.username,
            correo: this.state.correo
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
            })
        })
        .catch(function(err){
            console.log(err)
        });

    }

    handleVerificarButton(codigoEnvi) {
    // Ver si el usuario ingresa el codigo correcto
    if (this.state.codigoIngresado == codigoEnvi) {
        this.props.onCambiarView('login')
        }
    }

    render(){
        //console.log("props",this.props);
        console.log(this.props.role);
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
                                floatingLabelText="Nombre de usuario"
                                onChange = {(event,newValue) => this.setState({username:newValue})}
                                style={styleText}
                                value={this.state.username}
                                errorText={this.state.errorTextUsername}
                            />
                            <br/>

                            <TextField
                                type="password"
                                floatingLabelText="Contraseña *"
                                onChange = {(event,newValue) => this.setState({contrasena:newValue})}
                                style={styleText}
                                value={this.state.contrasena}
                                errorText={this.state.errorTextContrasena}
                            />
                            <br/>

                             
                            <TextField
                                type="password"
                                floatingLabelText="Confirme su contraseña *"
                                onChange = {(event,newValue) => this.setState({contrasenaCom:newValue})}
                                style={styleText}
                                value={this.state.contrasenaCom}
                                errorText={this.state.errorTextContrasenaCom}
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
                                floatingLabelText="Teléfono *"
                                onChange = {(event,newValue) => this.setState({telefono:newValue})}
                                style={styleText}
                                value={this.state.telefono}
                                errorText={this.state.errorTextTelefono}
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
                            
                            <RaisedButton 
                                label="Registrarme"
                                primary={true} 
                                style={styleButton} 
                                onClick={this.handleRegistrarmeButton}
                            />
                            
                            <TextField
                                floatingLabelText="Codigo de verificacion de cuenta"
                                onChange={(event, newValue) => this.setState({ codigo: newValue })}
                                style={styleText}
                                value={this.state.codigo}
                            />
                            <br />

                            <RaisedButton
                                label="Verificar"
                                primary={true}
                                style={styleButton}
                                onClick={this.handleVerificarButton}
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