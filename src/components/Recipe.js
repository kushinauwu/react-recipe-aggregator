import { useParams } from "react-router-dom";
import { useState } from "react";
import useFetchData from "../hooks/useFetchData";

function Recipe() {
  const params = useParams();
  const recipeName = params.id;
  const [checked, setChecked] = useState(new Array(20).fill(false));
  const { loading, data, error } = useFetchData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeName}`
  );

  const renderInstructions = () => {
    const recipe = data["meals"][0];
    let instructions = recipe.strInstructions.split("\r\n");
    instructions = instructions.filter((item) => item !== "");

    return (
      <ol className="recipe-instructions">
        {instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    );
  };

  const toggleChecked = (currentIndex) => {
    const updateChecked = checked.map((value, index) =>
      currentIndex === index ? !value : value
    );
    setChecked(updateChecked);
  };

  const renderIngredients = () => {
    const recipe = data["meals"][0];
    let ingredients = [];

    for (let i = 1; i <= 20; i++) {
      let ingredientExists = Object.keys(recipe).indexOf(`strIngredient${i}`),
        ingredientObject = {},
        currentIngredient =
          ingredientExists &&
          recipe[`strIngredient${i}`] !== "" &&
          recipe[`strIngredient${i}`] !== null;

      if (currentIngredient) {
        currentIngredient = recipe[`strIngredient${i}`];
        ingredientObject.name = currentIngredient;
        ingredientObject.quantity = recipe[`strMeasure${i}`];
        ingredients.push(ingredientObject);
      }
    }

    return (
      <ul className="ingredients-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <label
              htmlFor={ingredient.name}
              onClick={(e) => toggleChecked(index)}
              className={`ingredient-label ${checked[index] ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                id={index}
                name={ingredient.name}
                value={ingredient.quantity}
              />
              <span className="ingredient-text">
                {ingredient.quantity} of {ingredient.name}
              </span>
            </label>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      {loading && <div className="loader"></div>}
      {error && <h1>Sorry! Couldn't find recipes</h1>}

      {data &&
        data["meals"].map((recipe) => {
          return (
            <div className="recipe-wrapper" key={recipe.idMeal}>
              <div className="recipe-info">
                <div className="recipe-summary">
                  <h1 className="title recipe-title">
                    {recipe && `${recipe.strMeal}`}
                  </h1>
                  <h2 className="recipe-origin">Origin: {recipe.strArea}</h2>
                  <h2 className="recipe-category">
                    Category: {recipe.strCategory}
                  </h2>
                  {recipe.strTags && (
                    <div className="recipe-tags">
                      {recipe.strTags.split(",").map((tag, index) => (
                        <span className="tag" key={index}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="recipe-image"
                />
              </div>

              <div className="recipe-text">
                <div className="recipe-ingredients-wrapper">
                  <h3 className="subheading">Ingredients</h3>
                  {renderIngredients()}
                </div>
                <div className="recipe-directions-wrapper">
                  <h3 className="subheading">Directions</h3>
                  {renderInstructions()}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Recipe;
