import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const HeroCard = (props) => {
  const { id = null, name = null, thumbnail = {} } = props.hero || {};

  return (
    <div className="col-sm-6 col-md-6 hero-card">
      <div className="hero-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
        <div className="h-100 position-relative border-gray border-right bg-white rounded-left">
          <img
            src={`${thumbnail.path}.${thumbnail.extension}`}
            alt={name}
            width="100"
            height="100"
          />
        </div>

        <div className="px-3">
          <Link to={{ pathname: `/charactersList/${id}`, state: props.hero }}>
            <span className="hero-name text-dark d-block font-weight-bold">
              {name}
            </span>
          </Link>

          <span className="hero-id text-secondary text-uppercase">{`#${id}`}</span>
        </div>
      </div>
    </div>
  );
};

HeroCard.propTypes = {
  hero: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
      extension: PropTypes.string.isRequired,
    }).isRequired,
    comics: PropTypes.shape({
      available: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HeroCard;
