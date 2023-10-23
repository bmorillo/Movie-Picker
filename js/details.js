document.addEventListener("DOMContentLoaded", function () {
    // Your API key from TMDb
    const apiKey = "50cc16a94438d47c3e061d1a50822165";
    // The base URL for TMDb API
    const apiUrl = `https://api.themoviedb.org/3/`;
    // Function to fetch and display movie details
    function fetchMovieDetails(movieId) {
        $.ajax({
            url: `${apiUrl}movie/${movieId}?api_key=${apiKey}`,
            success: function (movie) {
                console.log("Movie data:", movie); // Debugging: Check if the movie data is retrieved
                var detailsHtml = `
                    <h2>${movie.title}</h2>
                    <p>Release Date: ${movie.release_date}</p>
                    <p>Overview: ${movie.overview}</p>
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
                `;
                document.getElementById('movieDetails').innerHTML = detailsHtml;
            }
        });
    }
    // Get the movie ID from the URL query string (e.g., ?id=123)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const movieId = urlParams.get("id");
    // Fetch and display movie details
    if (movieId) {
        fetchMovieDetails(movieId);
    }
});
