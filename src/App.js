import { Routes, Route, Link } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Landing from "./components/Landing";
import Category from "./components/Category";
import Recipe from "./components/Recipe";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-wrapper">
          <h1>
            <Link to="/react-recipe-aggregator">CHEFY</Link>
          </h1>
          <SearchBar />
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/react-recipe-aggregator" element={<Landing />}></Route>
          <Route path="/react-recipe-aggregator/category/:id" element={<Category />}></Route>
          <Route path="/react-recipe-aggregator/recipe/:id" element={<Recipe />}></Route>
          <Route path="/react-recipe-aggregator/search/:id" element={<Search />}></Route>
        </Routes>
      </main>
      <footer>
        <p>Built with React by <a href="https://github.com/kushinauwu" target="_blank" rel="noreferrer">Deepashree</a></p>
        <p>
          API credits : <a href="https://www.themealdb.com/api.php" target="_blank" rel="noreferrer">TheMealDB</a>
        </p>
        <p>Favicon generated using <a href="https://favicon.io" target="_blank" rel="noreferrer">favicon.io</a></p>
      </footer>
    </div>
  );
}

export default App;
