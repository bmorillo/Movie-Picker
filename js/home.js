document.addEventListener("DOMContentLoaded", function () {
    // Your API key from TMDb
    const apiKey = "50cc16a94438d47c3e061d1a50822165";
    // The base URL for TMDb API
    const apiUrl = `https://api.themoviedb.org/3/`;

    // Get popular movies from TMDb API
    fetch(`${apiUrl}movie/popular?api_key=${apiKey}&language=en-US&page=1`)
        .then((response) => response.json())
        .then((data) => {
            const slideshow = document.getElementById("slideshow");

            // Iterate through the popular movies and create slides
            data.results.forEach((movie) => {
                const slide = document.createElement("div");
                slide.classList.add("slide");
                const img = document.createElement("img");
                img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                img.alt = movie.title;
                slide.appendChild(img);
                slideshow.appendChild(slide);
            });

            // Initialize the slideshow using any library or custom JavaScript code
            initializeSlideshow();
        })
        .catch((error) => console.error("Error fetching popular movies:", error));
});

function initializeSlideshow() {
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    function showSlide(slideIndex) {
        slides.forEach((slide) => (slide.style.transform = `translateX(${slideIndex * -100}%)`)); /* Slide to the selected group of movies */
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length - 1) { /* Adjust to show three movies at a time */
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, 5000);
}