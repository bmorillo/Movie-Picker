// Your API key from TMDb
const apiKey = "50cc16a94438d47c3e061d1a50822165";

document.addEventListener("DOMContentLoaded", function () {
  // The base URL for TMDb API
  const apiUrl = `https://api.themoviedb.org/3/`;

  //fetches list of genres that TMDB contains and adds them to the website
  fetch(`${apiUrl}genre/movie/list?api_key=${apiKey}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      let genres = data.genres;  //assigns returned data to the genre 
      
      //creates checklist for all genres
      for (let value of genres) {
        let label = `<label for="${value.name}">${value.name}:</label>`
        let input = `<input type="checkbox" value="${value.id}" id="${value.name}" name="genre-indiv"> `
        document.getElementById("genre-options").innerHTML += `<span> ` + label + input + `</span>`;
      }
    });
    
  //reads information from form when submitted
  const form = document.getElementById("filter-search");
  let ranAtLeastOnce = false; //checks if the user has made any searches yet
  form.addEventListener("submit", (event) => {
      event.preventDefault(); //prevents refresh
      const data = new FormData(form); //creates form object

      /**
       * I am currently unable to filter the search results at all based on the title or keywords that the user puts.
       * I am using the discover feature to do advanced filtering, but it doesn't have an option for queries like "search/movie" does.
       * As a result, the title option is completely not functional. There is an option to filter by keywords, but you need to know
       * the associated ID number of each keyword. Furthermore, there are multiple types of keywords for any one word.
       */
      let title = data.get("title"); //gets the title

      let startDate = new Date(data.get("start-date")).getTime(); //gets the date filters
      let endDate = new Date(data.get("end-date")).getTime();

      if (endDate < startDate) {
          alert("End date must be after start date.");    //validates dates
          return;
      }

      /**
       * I am not sure if this is worth implementing, since TMDB only has options to include adult movies or not.
       * There is no way to separate PG from PG-13 as far as I know. Furthermore, some films (ex. Saw) have been
       * incorrectly tagged in the database itself as not containing adult content even though they are rated R.
       */
      //gets the age filters
      let ratedR = document.getElementById("rated-r");
      let adult = false;
      if (ratedR.checked == true) {
        adult = true;
      }
      
      //gets the genre filters and creates a string with their ids
      let inputs = document.getElementsByName("genre-indiv");
      let genreIds = ``;
      for (let i = 0; i < inputs.length; i++) {

          if(inputs[i].checked == true) {
              genreIds += `${inputs[i].value}`;
              if (i != inputs.length-1) {
                  genreIds += `|`;  //uses pipes to separate each genre. so it will search up "Comedy" OR "Action"
              }
          }

      }

      //assembles the url with all the specified filters
      let url = `${apiUrl}discover/movie?api_key=${apiKey}&with_genres=${genreIds}&primary_release_date.gte=${data.get("start-date")}&primary_release_date.lte=${data.get("end-date")}&include_adult=${adult}&language=en-US&sort_by=popularity.desc`;

      //makes the api call
      fetch(url).then((response) => response.json()).then((data) => {
        let newDiv = document.getElementById("filter-results");
        if (ranAtLeastOnce == true) {
            newDiv.innerHTML = "";  //if a search has already been made, the previous results are erased
        }
        //iterates through each movie result and displays the corresponding image
        data.results.forEach((movie) => {
            newDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}"/>`;
        });
        ranAtLeastOnce = true;  //indicates that a search has been made
    });
  });
});

// Function for the search box to display results
$(document).ready(function() {
  $('#searchInput').on('keyup', function() {
      var query = $(this).val();
      if (query.length > 2) { // Only search if query is at least 3 characters long
          $.ajax({
              url: 'https://api.themoviedb.org/3/search/movie',
              data: {
                  api_key: '50cc16a94438d47c3e061d1a50822165',
                  query: query
              },
              success: function(response) {
                  var html = '';
                  response.results.slice(0, 5).forEach(function(movie) { // Only take the first 5 results
                      html += '<li>' + movie.title + '</li>';
                  });
                  $('#results').html(html);
              }
          });
      } else {
          $('#results').html(''); // Clear results when query is too short
      }
  });
});