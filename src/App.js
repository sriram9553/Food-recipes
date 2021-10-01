import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';

const App = () =>{

const APP_ID = "a71faa37";
const APP_KEY = "7b1d0bb78650acd87454d78da58933e5";
const [recipes,setRecipes] = useState([]);
const [search,setSearch] = useState('');
const [query,setquery] = useState('chiken');
useEffect(() => {
  getRecipes()
}, [query])
 
const getRecipes = async () =>{
  const Response = await fetch(`http://www.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await Response.json();
  setRecipes(data.hits);

}

const updateSearch = (e) =>{
  setSearch(e.target.value)
}

const getSearch = (e) =>{
  e.preventDefault();
  setquery(search);
}

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange = {updateSearch} />
        <button className="search-button" type="sudmit" >Search</button>
      </form >
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe
        key = {recipe.recipe.label} 
        title = {recipe.recipe.label} 
        calories = {recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients = {recipe.recipe.ingredients}  />
      ))}
      </div>
    </div>
  );
}

export default App;
