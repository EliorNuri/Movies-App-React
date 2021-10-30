import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { loadMoviesDb } from './actions/movieAction';

import { Switch, Route } from 'react-router-dom';
import Homepage from './views/Homepage';
import MovieDetails from './views/MovieDetails';
import AppHeader from './components/Header';



function App({ movies, loadMoviesDb }) {

  useEffect(() => {
    async function fetchData() {
      await loadMoviesDb();
    };
    fetchData();

  }, [loadMoviesDb])

  return (
    <div className="App">
      <AppHeader />
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route exact path="/movie/:_id" component={MovieDetails}></Route>
      </Switch>
    </div>
  );
}


const mapStateToProps = (state) => {
  const { movies } = state.movie;
  return {
    movies
  }
}

const mapDispatchToProps = {
  loadMoviesDb
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



