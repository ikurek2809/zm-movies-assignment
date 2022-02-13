import React from 'react'

import classes from './MovieCard.module.css'

function MovieCard(props) {
  const {movie} = props;

  return (
      <div onClick={() => props.onEditButtonClick(movie)} className={classes.movieCard}>
        {movie.attributes.poster.data && <img className={classes.image} src={movie.attributes.poster.data.attributes.url} alt=""/>}
        <div className={classes.movieInfo}>
          <h2 className={classes.movieTitle}>{movie.attributes.name}</h2>
          <p>{movie.attributes.publicationYear}</p>
        </div>
      </div>
  );

}

export default MovieCard;