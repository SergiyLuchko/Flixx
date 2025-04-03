const global = { curerntPage: window.location.pathname };

async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
 
  <a href="movie-details.html?id=${movie.id}">
${
  movie.poster_path
    ? `
  <img
  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
  class="card-img-top"
  alt="${movie.title}"
/>`
    : `
<img
src="images/no-image.jpg"
class="card-img-top"
alt="${movie.title}"
/>`
}
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${movie.release_date}</small>
    </p>
  </div>

  `;
  document.querySelector('#popular-movies').appendChild(div)
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  const API_KEY = '08c958a916b9bfbd52fe259928df0168';
  const API_URL = `https://api.themoviedb.org/3/`;
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data;
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.curerntPage) {
      link.classList.add('active');
    }
  });
}

// Init app
function init() {
  switch (global.curerntPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      console.log('home');
      break;
    case '/shows.html':
      console.log('shows');
      break;
    case '/movie-details.html':
      console.log('movie-details');
      break;
    case '/tv-details.html':
      console.log('tv-details');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
