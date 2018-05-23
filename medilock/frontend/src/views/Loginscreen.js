import React, { Component}  from 'react';
import Login from "./Login"
import OlvideContrasena from "./OlvideContrasena"
import Registrarme from "./Registrarme"

class Loginscreen extends Component{
    constructor(props){
        super(props);
        this.state={
            view:'login',
            role:1
        }

        this.cambiarView = this.cambiarView.bind(this);
        this.cambiarRole = this.cambiarRole.bind(this);
    }

    cambiarView(nombreView){
        this.setState({view:nombreView});
    }
    
    cambiarRole(roleACambiar){
        this.setState({role:roleACambiar});
    }

    render(){
        if(this.state.view == 'login'){
            return(
                <div>
                    <Login onCambiarView={this.cambiarView} onCambiarRole={this.cambiarRole}/>
                </div>
            )
        } else if (this.state.view == 'olvideContrasena'){
            return(
                <div>
                    <OlvideContrasena onCambiarView={this.cambiarView} />
                </div>
            )
        } else if(this.state.view == 'registrarme'){
            return(
                <div>
                    <Registrarme onCambiarView={this.cambiarView} role={this.state.role}/>
                </div>
            )
        }
    }
}

export default Loginscreen;