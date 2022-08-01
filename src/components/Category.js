import { useParams } from "react-router-dom";
import Card from "../components/Card";
import useFetchData from "../hooks/useFetchData";

function Category() {
  const params = useParams();
  const categoryName = params.id;
  const { loading, data, error } = useFetchData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);

  return (
    <div>
      <h1 className="title">
        {loading && <div className="loader"></div>}
        {error && "Sorry! No recipes found"}
        {data && `${categoryName} Recipes`}
      </h1>

      <div className="card-section">
        {data &&
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
      </div>
    </div>
  );
}

export default Category;
