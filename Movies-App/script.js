
const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=52fb33a77bdd7b6a71b286b985b3201e";
const IMAGEPATH = 'https://image.tmdb.org/t/p/w1280';
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=52fb33a77bdd7b6a71b286b985b3201e&query=";
;

getMovies(APIURL);
async function getMovies(url) {
    console.log('Inside getMovies');
    const resp = await fetch(url);
    console.log('feteched url');
    const respData = await resp.json();
    console.log('url to string');
    console.log(respData);    

    showMovies(respData.results);    
    console.log('called showMovies');
}

function showMovies(movies){
    //clear main
    main.innerHTML = '';
    console.log('Inside for each');
    movies.forEach(movie => {
       
        const {poster_path,title,vote_average,overview} = movie;
       
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
    
            <img src="https://image.tmdb.org/t/p/w1280/${IMAGEPATH + poster_path}" alt="img">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average}</span>
            </div>
            <div class="overview">
            <h3>Overview: </h3>
            ${overview}
        </div>
        
    `;
    
    main.appendChild(movieEl);

    });
    
    console.log('After for each');
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('Inside  event listner');
    const searchTerm = search.value;

    if(searchTerm){
        console.log('Inside seachTeam');
        getMovies(SEARCHAPI + searchTerm);
        console.log('getMovies called from eventlistner');
        search.value = '';
    }

});



