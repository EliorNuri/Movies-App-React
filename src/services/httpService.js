// Axios / Fetch calls for the moviesDb.json

const url = process.env === 'production' ? './moviesDb.json' : '../../moviesDb.json';

async function fetchMoviesDb() {
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => data);
}

let exportedObj = {
    fetchMoviesDb
}

export default exportedObj;

