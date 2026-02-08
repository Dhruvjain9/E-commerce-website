document.addEventListener("DOMContentLoaded", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const priceRange = document.getElementById('price-range');
    const priceDisplay = document.getElementById('price-display');
    const productTypeFilter = document.getElementById('product-type-filter');
    const colorCheckboxes = document.querySelectorAll('input[name="color"]');
    const productBlocks = document.querySelectorAll('.product-block');
    const noProductsMessage = document.getElementById('no-products-message');

    // Hide the loading screen when the page loads
    loadingScreen.style.display = "none";
    function performSearch() {
        const searchInput = document.querySelector("input[type='text']");
        const searchTerm = searchInput.value.toLowerCase();
        const productBlocks = document.querySelectorAll(".product-block");

        productBlocks.forEach((productBlock) => {
            const productName = productBlock.querySelector("h3").innerText.toLowerCase();
            if (productName.includes(searchTerm)) {
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
    // Add an input event listener to the price range input
    priceRange.addEventListener('input', () => {
        priceDisplay.textContent = `Max Price: $${priceRange.value}`;
    });

    // Add an event listener to the "Apply" button
    document.getElementById('apply-button').addEventListener('click', filterAndDisplayProducts);

    // Function to filter and display products
    function filterAndDisplayProducts() {
        const searchResults = document.getElementById("search-query-container");
        if (searchResults){
            searchResults.style.display = "none";
        }

        const productBlocks = document.querySelectorAll('.product-block');
        productBlocks.forEach(productBlock => {
            const selectedProductType = document.getElementById('product-type-filter').value;
            const checkboxes = document.querySelectorAll('input[name="color"]');
            const selectedColors = [];
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedColors.push(checkbox.value);
                }
            });
            const maxPrice = parseInt(document.getElementById('price-range').value);
            const productType = productBlock.dataset.productType;
            const color = productBlock.dataset.color;
            const priceElement = productBlock.querySelector('.product-price');
            const priceText = priceElement.innerText;
            const priceMatch = priceText.match(/\$\d+/);
            const price = priceMatch ? parseInt(priceMatch[0].slice(1)) : 0;
            const isProductTypeMatch = selectedProductType === 'all' || selectedProductType === productType;
            let isColorMatch = selectedColors.includes('all') || selectedColors.includes(color);
            if (selectedColors.includes('all')||selectedColors.length===0){
                isColorMatch=true
            };

            const isPriceMatch = price <= maxPrice;
            if (isProductTypeMatch && isColorMatch && isPriceMatch) {
                productBlock.style.display = 'block';
            } else {
                productBlock.style.display = 'none';
            }
        });
    
        // Show a message if no products match the criteria
        const productsToShow = document.querySelectorAll('.product-block[style*="display: block"]').length;
        if (productsToShow === 0) {
            document.getElementById("noproductsToShow").style.display = "block";
        } else {
            document.getElementById("noproductsToShow").style.display = "none";
        }
    }
    
    const addToCartButtons = document.querySelectorAll(".add-to-cart-button");


});

function openSidebar() {
    document.querySelector(".sidebar.right").style.width = "250px";
    document.querySelector(".sidebar.right").style.right = "0";
    document.getElementById("open-sidebar").style.visibility = "hidden";

}

function closeSidebar() {
    document.querySelector(".sidebar.right").style.width = "0";
    document.querySelector(".sidebar.right").style.right = "-250px";
    document.getElementById("open-sidebar").style.visibility = "visible";

}


