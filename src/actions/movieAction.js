import movieService from '../services/movieService';

export const loadMoviesDb = () => {
    return async (dispatch) => {
        const db = await movieService.query();
        console.log(db)
        return dispatch(_initStore(db))
    }
}

const _initStore = (db) => {
    return {
        type: 'SET_STORE',
        db
    }
}