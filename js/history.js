document.addEventListener("DOMContentLoaded", function () {
    // Function to save a movie ID to the search history
    function saveToHistory(movieId, movieTitle) {
        const historyList = JSON.parse(localStorage.getItem("searchHistory")) || [];
        historyList.push({ id: movieId, title: movieTitle });
        localStorage.setItem("searchHistory", JSON.stringify(historyList));
        updateHistoryList();
    }

    // Function to update the displayed search history list
    function updateHistoryList() {
        const historyList = JSON.parse(localStorage.getItem("searchHistory")) || [];
        const historyListElement = document.getElementById("historyList");

        historyListElement.innerHTML = "";

        for (const entry of historyList) {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `details.html?id=${entry.id}`; // Link to movie details
            link.textContent = entry.title;
            listItem.appendChild(link);
            historyListElement.appendChild(listItem);
        }
    }

    // Check for movie ID and title in the URL parameters
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("movieId");
    const movieTitle = params.get("movieTitle");

    if (movieId && movieTitle) {
        saveToHistory(movieId, movieTitle);
    }

    // Initial update of the search history list
    updateHistoryList();

    // Handle the "Clear History" button click event
    const clearHistoryButton = document.getElementById("clearHistory");
    clearHistoryButton.addEventListener("click", function () {
        localStorage.removeItem("searchHistory");
        updateHistoryList();
    });
});

