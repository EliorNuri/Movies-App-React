import React from 'react'
import utilService from '../services/utilService';

function hero({ movies, directors, actors }) {
    //Movie
    const shuffleMovies = utilService.shuffle(movies);
    const movie = shuffleMovies[0];
    
    //Directort - single director 
    const movieDir = directors.find((dirName) => {
        var regex = new RegExp(`${dirName}`, 'ig');
        return regex.test(movie.directors);
    })
    const elMovieDir = (movieDir) ? (<div className="profile-img" style={{ backgroundImage: `url(${movieDir.imgUrl})` }}></div>) : null;

    //Actors - multiple actors

    const movieActors = (movie) ? movie.actors.map((actor) => {
        var regex = new RegExp(`${actor}`, 'ig');
        var currActor = actors.find((a) => {
            return regex.test(a.name);
        })
        return currActor || null;
    }) : [];


    const elActorsList = movieActors.map((actor) => {
        return (actor) ? (<div className="profile-img" style={{ backgroundImage: `url(${actor.imgUrl})` }} key={actor.name}> </div>) : null
    })

    return (
        <div className="hero flex row center space-between">
            <div className="content">
                <h2 className="movie-title">{shuffleMovies.length ? movie.name : ''}</h2>
                <h6 className="movie-info">
                    <span>{shuffleMovies.length ? 'Date : ' + movie['release-date'].split('-').reverse().join('-') + ' ,' : ''}</span>
                    <span>{shuffleMovies.length ? movie.runtime + ' Minutes' : ''}</span>
                </h6>
                <p className="movie-storyline">{shuffleMovies.length ? movie.storyline : ''}</p>
                <h6> Directors : </h6>
                <div className="flex row center justify-start">
                    {elMovieDir}
                </div>
                <h6> Cast : </h6>
                <div className="flex row center justify-start">
                    {elActorsList}
                </div>

                <div className="hero-btns-container flex row center justify-start">
                    <div>Play Now</div>
                    <div>Watch Later</div>
                </div>
            </div>
            <div className="img" style={{ backgroundImage: shuffleMovies.length ? `url(${movie.imgUrl})` : '' }}>
                <div className="fade-screen fade-left"></div>
                <div className="fade-screen fade-bottom"></div>
            </div>
        </div>
    )
}

export default hero;
