import { useParams } from "react-router-dom";
import Card from "./Card";
import useFetchData from "../hooks/useFetchData";

function Search() {
  const params = useParams();
  const searchName = params.id;
  const { loading, data, error } = useFetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`);

  return (
    <div>
      <h3 className="title">{`You searched for ${searchName}`}</h3>
      <div className="card-section">
        {loading && <div className="loader"></div>}
        {error && <h2 className="title">{error}</h2>}

        {data &&
          data["meals"] != null &&
          data["meals"].map((recipe) => {
            return (
              <Card
                path={`/recipe/${recipe.idMeal}`}
                name={recipe.strMeal}
                image={recipe.strMealThumb}
                key={recipe.idMeal}
              />
            );
          })}

        {data && data["meals"] === null && (
          <h2 className="title">Sorry, no recipes found!</h2>
        )}
      </div>
    </div>
  );
}

export default Search;
