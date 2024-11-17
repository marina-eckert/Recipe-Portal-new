import React from "react";

class Home extends React.Component{
    render(){
        return (
        <main>
        <section id="featured-recipes">
            <h2>Featured Recipes</h2>
            <div class="recipe-grid">
                <div class="recipe-card">Recipe 1 (Image Placeholder)</div>
                <div class="recipe-card">Recipe 2 (Image Placeholder)</div>
                <div class="recipe-card">Recipe 3 (Image Placeholder)</div>
            </div>
        </section>

        <section id="recipe-categories">
            <h2>Recipe Categories</h2>
            <ul>
                <li><a href="#">Vegan</a></li>
                <li><a href="#">Desserts</a></li>
                <li><a href="#">Quick Meals</a></li>
                <li><a href="#">Healthy Options</a></li>
            </ul>
        </section>

        <section id="call-to-action">
            <h2>Join RecipePortal</h2>
            <p>Create an account to save your favorite recipes and share your own.</p>
            <button type="button">Sign Up Now</button>
        </section>
    </main>
        )
    }
}

export default Home;