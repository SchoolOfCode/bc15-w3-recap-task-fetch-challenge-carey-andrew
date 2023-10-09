async function getAndDisplayMovies() {
  const movieData = await retrieveMovie();
  displayMovies(movieData);
}
//Timeout to check if the person is still there
function stillThere() {
  alert("Are you still there?");
}
setTimeout(stillThere, 100000);

// fetch data from API
async function retrieveMovie() {
  const response = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYTY3Nzc3NzRiNThkZGJiZmIxMjI1NzE5NmQwODEwZiIsInN1YiI6IjY1MTA0YWYxM2E0YTEyMDBlMjk0YmU0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.76x3Plq389jbB3cSwfP6M7ZkpcOCfPXzRUoKQ3gWJA4", // Replace with your actual API key
    },
  });
  // error handling
  if (!response.ok) {
    alert(
      `Movie data cannot be found.\nStatus: ${
        response.status
      }\nText: ${await response.text()}`
    );
  }
  // log data to check response
  const data = await response.json();
  // console.log(data);
  return data;
}
// Function to display movie data
function displayMovies(movieData) {
  const movies = movieData.results;

  // Get the parent element where you want to append the movie list
  const movieList = document.querySelector(".movie-name"); // Use querySelector to select the first element with class "movie-name"

  for (let movie of movies) {
    // Create a new list item for each movie
    const listItem = document.createElement("li");
    listItem.textContent = movie.title;
    // add element to display overview
    const overview = document.createElement("div");
    overview.className = "movie-description";
    overview.textContent = movie.overview;
    //appendChild to add to list
    listItem.appendChild(overview);

    //add eventListener to show on hover
    listItem.addEventListener("mouseover", () => {
      overview.style.display = "block";
    });

    //add eventListener to remove when hover finished
    listItem.addEventListener("mouseout", () => {
      overview.style.display = "none";
    });
    // Append the list item to the parent element
    movieList.appendChild(listItem); // Use appendChild to add the listItem to movieList
  }
}

// Wait for DOM to load before fetching and displaying movies
document.addEventListener("DOMContentLoaded", getAndDisplayMovies);

//addEventListener to div for movie title function to add new movie listing for each new movie in the returned array
