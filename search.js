// Function to handle the search action
function searchProducts() {
    // Get the search input value and convert it to lowercase
    const searchInput = document.getElementById("search-input").value.toLowerCase();

    // Redirect to the searchresults.html page with the search query as a URL parameter
    window.location.href = `searchresults.html?query=${searchInput}`;
}
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
      searchProducts();
  }
});
// Add an event listener to the search button
document.getElementById("search-button").addEventListener("click", searchProducts);
