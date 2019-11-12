import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import '../Header/Header.css'
import Logo from '../../assets/img/logo.png'




class Header extends Component {
    
    reloadPage = () => {
        window.location.reload();
    }

    render(){
        return (
                <div className="row header-app">
                    <div className="col-md-auto align-self-center">
                        <NavLink to='/' onClick={this.reloadPage}><img className="img-cesar" src={Logo} alt="Jules Cesar Calculator"></img></NavLink>
                    </div>
                </div>
        )
    }
}

export default Header;