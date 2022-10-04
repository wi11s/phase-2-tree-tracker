import React from 'react';
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom';

function Header() {
    return(
        <header className='header'>
            <nav className='nav'>
                <NavLink to='/' exact><img src={logo} alt='logo' /></NavLink>              
                <ul className='menu'>
                    <li>
                        <NavLink to='/' exact className='link' activeStyle={{borderBottom: '1.5px solid #3d4637', paddingBottom:"5px"}}>
                        Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/map' exact className='link' activeStyle={{borderBottom: '1.5px solid #3d4637', paddingBottom:"5px"}}>
                        Map
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/form' exact className='link' activeStyle={{borderBottom: '1.5px solid #3d4637', paddingBottom:"5px"}}>
                        Add Tree
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;