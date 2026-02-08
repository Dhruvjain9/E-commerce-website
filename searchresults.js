function getSearchQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("query");

    if (query) {
        return query.replace(/%20/ , ' ');
    } else {
        return null;
    }
}

function performSearch(searchQuery) {
    const productBlocks = document.querySelectorAll(".product-block");
    document.getElementById("search-query").textContent="Search Results for " + searchQuery
    productBlocks.forEach((productBlock) => {
        const productName = productBlock.querySelector("h3").innerText.toLowerCase();
        if (productName.includes(searchQuery)) {
            productBlock.style.display = "block";
        } else {
            productBlock.style.display = "none";
        }
    });
}

// Handle search when the search button is clicked
const searchButton = document.querySelector("button[type='submit']");
searchButton.addEventListener("click", performSearch);

// Handle search when the Enter key is pressed
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        performSearch();
    }
});
const checksearchQuery = getSearchQuery();
if (checksearchQuery !== null){
    const searchQuery = checksearchQuery.toLowerCase();
    if (searchQuery === "t shirt"||searchQuery === "t shirts"||searchQuery === "t-shirts"){
        performSearch("t-shirt");
    } else {
        performSearch(searchQuery);
    }
} else {
    document.getElementById("search-query-container").style.display = "none"
}