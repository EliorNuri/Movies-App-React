import React from 'react';
import { withRouter } from 'react-router-dom';
import utilService from '../services/utilService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';



function Row({ movies, isMainRow, children, genre , history }) {
    const moviesToShow = utilService.shuffle(movies).slice(0, 12);
    const elMoviesList = moviesToShow.map((movie) => {
        return (<div onClick={() => { handleMovieClicked(movie._id)}} className={'movie-img' + (isMainRow ? ' movie-poster' : '')}
            style={{
                backgroundImage: (isMainRow) ?
                    `url(${movie.posterUrl})` :
                    `url(${movie.imgUrl})`
            }}
            key={movie._id}>
        </div>)
    })

    function scrollList(val) {
        var elList = document.querySelector(`.movies-list-${genre}`);
        elList.scrollLeft += val;
    }

    function handleMovieClicked(id){
        history.push(`/movie/${id}`);
    }


    return (
        <div className="row-container flex column ">
            <h2>{children}</h2>
            <div className="movies-list-wrapper">
                <div className={`movies-list flex row center justify-start movies-list-${genre}`}>
                    <div className="flex row center block block-left" onClick={() => { scrollList(-150) }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                    <div className="flex row center block block-right" onClick={() => { scrollList(150) }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                    {elMoviesList}
                </div>
            </div>
        </div>
    )
}

export default withRouter(Row);
