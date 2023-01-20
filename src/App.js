import "./App.css";
import { useEffect, useState, useRef } from "react";

function App() {
  const API_KEY = "6e185114baf7ff5f3d4bf6d0649aed1f";
  const APP_ID = "95747b2a";

  const [ingredientList, setIngredientList] = useState([]);
  const [loading, setLoading] = useState(false);

  // useRef -> can be used to reference a particular elemennt and you can do various things with it.
  const inputRef = useRef(null);

  const search = () => {
    console.log("input ref:", inputRef);
    searchForRecipe(inputRef.current.value);
    inputRef.current.value = "";
  };

  const searchForRecipe = (query) => {
    setLoading(true);
    let url = `search?q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log("final response::", res);
        setIngredientList(res.hits);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    searchForRecipe("chicken");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrapper">
          <input ref={inputRef} placeholder="Search for recipe" />
          <button onClick={search}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        <div className="wrapper">
          {ingredientList.map(function (item) {
            return (
              <div key={item.recipe.label} className="ingredient">
                <span>{item.recipe.label}</span>
                <img src={item.recipe.image} alt="ingredient" />
                <div className="steps">
                  {item.recipe.ingredientLines.map((step, index) => {
                    return <p key={index}>{step}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
