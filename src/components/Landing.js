import Card from "./Card";
import useFetchData from "../hooks/useFetchData";

function Landing() {
  const { loading, data, error } = useFetchData("https://www.themealdb.com/api/json/v1/1/categories.php");

  return (
    <div>
      <h1 className="title">
        {loading && <div className="loader"></div>}
        {error && "Sorry! No recipes found"}
      </h1>

      <div className="card-section">
        {data &&
          data["categories"].map((category) => {
            return (
              <Card
                path={`/category/${category.strCategory}`}
                name={category.strCategory}
                image={category.strCategoryThumb}
                description={category.strCategoryDescription}
                key={category.idCategory}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Landing;
