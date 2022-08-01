import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();

  const searchHandler = (e) => {
    let currentValue = document.getElementById("search").value;
    e.preventDefault();

    if (currentValue.trim()) {
      navigate(`react-recipe-aggregator/search/${currentValue}`);
    } else {
      navigate("react-recipe-aggregator");
    }
  };

  return (
    <form onSubmit={searchHandler}>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Recipe name"
      />
      <button
        type="submit"
        id="searchButton">
        Find
      </button>
    </form>
  );
}

export default SearchBar;
