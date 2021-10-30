import httpService from './httpService';

function query(){
    return httpService.fetchMoviesDb();
}

let exportedObj = {
    query
}

export default exportedObj;

