import React from 'react';

class Maintenance extends React.Component {
    render(){
        return(
            <main>
      <h3 className="maintenance__header">Maintenance Page</h3>
      <div className="maintenance__links">
        <ul>
          <li><a href="/add-user">Add New User</a></li>
          <li><a href="/add-recipe">Add New Recipe</a></li>
          <li><a href="/add-favorite">Add Recipe to Favorites</a></li>
          <li><a href="/search">Find a user's favorite recipe</a></li>
        </ul>
      </div>
      <div className="back__button">
        <a href="/">Back to Home Page</a>
      </div>
    </main>
        )
    }
}

export default Maintenance;