import React, { useState } from "react";
import axios from "axios";
import { Autocomplete, TextField } from "@mui/material";
import logo from "../img/logo.png";

const Header = () => {
    const [options, setOptions] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = async (event, value) => {
        console.log("User Input:", value);
        setSearchValue(value);

        if (value.trim()) {
            try {
                const response = await axios.get("http://localhost:5000/api/autocomplete", {
                    params: { query: value },
                });
                console.log("Autocomplete Suggestions Response:", response.data);

                setOptions(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error("Error fetching autocomplete suggestions:", error);
                setOptions([]); 
            }
        } else {
            setOptions([]);
        }
    };

    const handleSearchSubmit = () => {
        console.log("Searching for:", searchValue);
    };

    return (
        <header>
            <div id="search-bar">
                <Autocomplete
                    freeSolo
                    options={options.map((option) =>
                        typeof option === "object" && option.title ? option.title : option
                    )}
                    onInputChange={handleInputChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder="Search for recipes..."
                            variant="outlined"
                        />
                    )}
                />
                <button type="button" onClick={handleSearchSubmit}>
                    Search
                </button>
            </div>
            <img src={logo} alt="RecipePortal Logo" id="logo" />
            <nav className="nav">
                <ul className="nav-elem">
                    <li className="dropdown">
                        <a href="#">Profile</a>
                        <ul className="dropdown-menu">
                            <li><a href="/add-user">Register</a></li>
                            <li><a href="/add-recipe">Upload a Recipe</a></li>
                            <li><a href="/search">Favorites</a></li>
                        </ul>
                    </li>
                    <li><a href="/">Home</a></li>
                    <li><a href="/recipes-list">Explore Recipes</a></li>
                    <li><a href="/maintenance">Maintenance</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
