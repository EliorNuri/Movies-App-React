import React from 'react'
import { connect } from 'react-redux';
import Hero from '../components/Hero';
import Row from '../components/Row';
import utilService from '../services/utilService';

function homepage({ movies, directors, actors, geners }) {

    const topRatedMovies = movies.filter((movie) => {
        return movie.isTopRated
    })

    const genersToShow = utilService.shuffle(geners).slice(0, 5);

    const elRows = (genersToShow.length) ? genersToShow.map((genre, idx) => {

        const moviesByGenre = (movies.length) ? movies.filter((movie) => {
            const strGeners = (movie.categories.length) ? movie.categories.join(',') : '';
            const regex = new RegExp(`${genre}`, 'ig')
            return regex.test(strGeners);
        }) : [];

        return (
            <Row movies={moviesByGenre} key={idx} genre={genre}>{genre + ' Movies'}</Row>
        )
    }) : null;

    return (
        <div>
            <Hero movies={topRatedMovies} directors={directors} actors={actors} />
            <main className="movies-list-container flex column center align-start">
                <Row movies={movies} isMainRow={true} genre="top"> NETFLIX ORIGINALS </Row>
                <Row movies={movies} genre="trending"> Trending Now </Row>
                {elRows}
            </main>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { movies, directors, actors, geners } = state.movie;
    return {
        movies,
        directors,
        actors,
        geners
    }
}

export default connect(mapStateToProps)(homepage);

