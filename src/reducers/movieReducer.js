const INITIAL_STATE = {
    movies: [],
    geners: [],
    actors: [],
    directors: []
}

function movieReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case ('SET_STORE'):

            /**************  Init the Store with db object ! ****************/
            
            const { movies, people, geners } = action.db;
            return {
                ...state,
                movies,
                geners,
                actors: people.actors,
                directors: people.directors
            }

        default: return state;
    }
}

export default movieReducer;