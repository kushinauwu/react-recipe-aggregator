import { Link } from "react-router-dom";

function Card({ path, name, image, description = null }) {
  return (
    <div className="card-wrapper" id={name}>
      <Link
        to={{
          pathname: `/react-recipe-aggregator${path}`,
        }}
      >
        <div className={`card-info ${description ? "" : "no-overlay"}`}>
          <img className="card-thumbnail" src={image} alt={name} />
          {description && (
            <div className="card-description">
              <p>{description.split(".")[0]}</p>
            </div>
          )}
        </div>
        <h1 className="card-heading">{name}</h1>
      </Link>
    </div>
  );
}

export default Card;
