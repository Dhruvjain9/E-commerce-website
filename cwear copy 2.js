window.addEventListener("load", function () {
    document.getElementById("loading-screen").style.display = "none";
    const addedToCartOverlay = ensureAddedToCartOverlay();
    addedToCartOverlay.style.display="none";
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
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const getNumericPrice = (value) => {
    const match = value.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
};

function ensureAddedToCartOverlay() {
    let overlay = document.getElementById("added-to-cart");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "added-to-cart";
        const text = document.createElement("div");
        text.id = "added-to-cart-text";
        text.textContent = "Product has been added to Cart";
        overlay.appendChild(text);
        document.body.appendChild(overlay);
    }
    return overlay;
}

function showAddedToCart() {
    const addedToCartOverlay = ensureAddedToCartOverlay();
    addedToCartOverlay.style.display = "block";
    addedToCartOverlay.setAttribute("aria-live", "polite");
    setTimeout(() => {
        addedToCartOverlay.style.display = "none";
    }, 2500);
}

function addToCart(item) {
    cart.push(item);
    console.log(cart)
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a click event listener to each "Add to Cart" button
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

addToCartButtons.forEach((button) => {
    button.addEventListener('click', function () {
        // Extract product information from the clicked button's parent element
        const productElement = button.closest('.product-block');
        if (productElement) {
            const product = {
                id: productElement.getAttribute('data-product-id'),
                color: productElement.getAttribute('data-color'),
                type: productElement.getAttribute('data-product-type'),
                name: productElement.querySelector('h3').textContent,
                price: getNumericPrice(productElement.querySelector('.product-price').textContent),
                img: productElement.querySelector('img').getAttribute('src'),
            };

            // Add the product to the cart
            addToCart(product);
            console.log('Product added to cart:', product);
            showAddedToCart();
        }
    });
});

