import React from "react";
import logo from '../img/logo.png';

class Header extends React.Component {
    render() {
        return (
            <header>
                <div id="search-bar">
            <input type="text" placeholder="Search for recipes..." />
            <button type="button">Search</button>
        </div>
        <img src={logo} alt="RecipePortal Logo" id="logo" />
        <nav className="nav">
            <ul className="nav-elem">
                <li className="dropdown">
                    <a href="#">Profile</a>
                    <ul className="dropdown-menu">
                        <li><a href="#">Log In</a></li>
                        <li><a href="#">Upload a Recipe</a></li>
                        <li><a href="#">Favorites</a></li>
                    </ul>
                </li>
                <li><a href="/">Home</a></li>
                <li><a href="#recipes">Explore Recipes</a></li>
                <li><a href="/maintenance">Maintenance</a></li>
                
                
            </ul>
        </nav>
            </header>
        )
    }
}

export default Header;