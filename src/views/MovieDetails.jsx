import React, { Component } from 'react';
import { connect } from 'react-redux';
import utilService from '../services/utilService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faLongArrowAltLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


class MovieDetails extends Component {
    state = {
        rndMovies: [],
        currSlider: 0
    }

    componentDidMount() {
        const { currMovie, movies } = this.props;
        const rndMovies = utilService.shuffle(movies).slice(0, 9);

        rndMovies.forEach((movie, idx) => {
            if (movie._id === currMovie._id) rndMovies.splice(idx, 1);
        })

        rndMovies.unshift(currMovie);

        this.setState((prevState) => {
            return {
                rndMovies: [...prevState.rndMovies, ...rndMovies]
            }
        })

    }



    setCurrSlide = (idx) => {
        this.setState({
            currSlider: idx
        })
    }

    setCurrSlideByFactor = (factor) => {
        const len = this.state.rndMovies.length;
        this.setState((prevState) => {
            let num = prevState.currSlider + factor;
            if (num < 0) num = len - 1;
            else if (num > len - 1) num = 0;
            return {
                currSlider: num
            }
        })
    }

    toggleMovieInfo = (idx) => {
        const elSlide = document.querySelector(`.slide-${idx}`);
        elSlide.classList.toggle('flip');
    }

    render() {
        const { rndMovies, currSlider } = this.state;

        //Movies Gallery
        const elMoviesList = rndMovies.map((movie, idx, rndMovies) => {
            let activeClass = '';

            if (currSlider === idx) activeClass = 'active';
            if (currSlider + 1 === idx) activeClass = 'next';
            if (currSlider - 1 === idx) activeClass = 'prev';

            //Check IF the curr slide prev / next should
            if (currSlider === 0 && rndMovies.length - 1 === idx) activeClass = 'prev';
            if (currSlider === rndMovies.length - 1 && idx === 0) activeClass = 'next';


            const elTopRated = (movie.isTopRated) ? (<h4>Top</h4>) : null;
            const elInfoIcon = (idx === currSlider) ? (<div onClick={() => { this.toggleMovieInfo(idx) }} className="info-wrapper flex row center">
                <FontAwesomeIcon icon={faInfoCircle} />
            </div>) : null;

            const elCategories = (movie.categories) ? movie.categories.map((categorey,idx) => {
                return (
                    <span key={idx}>
                        {categorey}
                    </span>
                )
            }) : null

            return (
                <div key={idx} className={`slide slide-${idx} fade ${activeClass}`} style={{ backgroundImage: `url(${movie.imgUrl})` }}>
                    <div className="slide-screen">
                        <h3>{movie.name}</h3>
                        <h6>
                            <span>{'Date : ' + movie['release-date'].split('-').reverse().join('-') + ' ,'}</span>
                            <span>{movie.runtime + ' Minutes'}</span>
                        </h6>
                        <p>{movie.storyline}</p>
                        <div className="categorey-wrapper flex row center justify-start wrap">
                            {elCategories}
                        </div>
                    </div>
                    {elTopRated}
                    {elInfoIcon}
                </div>
            )
        })

        //Bullets 

        const elBullets = rndMovies.map((movie, idx) => {
            let activeClass = (idx === currSlider) ? 'active-dot' : '';
            return (
                <span key={idx} onClick={() => { this.setCurrSlide(idx) }} className={`dot ${activeClass}`}></span>
            )
        })

        return (
            <div  className="movie-details-container"  >
                <div className="bullets-container">
                    {elBullets}
                </div>
                <div className="gallery-wrapper">
                    {elMoviesList}
                </div>
                <div className="arrow arrow-left flex row center" onClick={() => { this.setCurrSlideByFactor(-1) }} >
                    <span>
                        <FontAwesomeIcon icon={faLongArrowAltLeft} />
                    </span>
                    <span className="text">
                        Back
                    </span>
                </div>
                <div className="arrow arrow-right flex row center" onClick={() => { this.setCurrSlideByFactor(1) }} >
                    <span className="text"> Next </span>
                    <span>
                        <FontAwesomeIcon icon={faLongArrowAltRight} />
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { _id } = ownProps.match.params;
    const currMovie = state.movie.movies.find((movie) => {
        return movie._id === +_id;
    })
    const { movies } = state.movie;
    return {
        currMovie,
        movies
    }
}

export default connect(mapStateToProps)(MovieDetails);
