document.addEventListener("DOMContentLoaded", function () {
    const formatCurrency = (value) => `₹${Number(value).toFixed(2)}`;
    const getNumericPrice = (value) => {
        const match = value.match(/(\d+(\.\d+)?)/);
        return match ? parseFloat(match[1]) : 0;
    };

    function addQuantityToCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        console.log(cartItems);
        for (let cartKey in cartItems){
            let cartItem=cartItems[cartKey];
            const productID = cartItem.id;
            let quantity=0
            for (let checkcartKey in cartItems){
                let checkcartItem=cartItems[checkcartKey];
                const checkproductID = checkcartItem.id;

                if(productID === checkproductID){
                    if (quantity>=1){
                        cartItems.splice(checkcartKey,1);
                    }
                    quantity+=1;
                }
            cartItem.quantity=quantity;
            }
        }
        localStorage.setItem('cart', JSON.stringify(cartItems));

    }
    
    
    
    //Example usage:
    addQuantityToCartItems();
    
    function transformCartData() {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartData = [];
        console.log(cartItems);
        if (cartItems.length >= 1) {
            console.log(cartItems);
            for (const cartItem of cartItems) {
                // Calculate the price based on the product price and quantity
                const unitPrice = Number(cartItem.price) || 0;
                console.log(unitPrice);
                // Create an object with the necessary properties
                const Data = {
                    productID: cartItem.id,
                    productName: cartItem.name,
                    quantity: cartItem.quantity,
                    price: unitPrice,
                };

                // Push the transformed item to the cartData array
                cartData.push(Data);
            }
        }

        return cartData;
    }


    // Function to display the cart
    function displayCart() {
        let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const cartContainer = document.getElementById('cart-items');

        // Clear the existing cart content
        cartContainer.innerHTML = '';

        let totalCost = 0; // Initialize the total cost
        if (cartItems.length !==0){
            // Iterate through the map to create elements for the cart items
            for (let cartKey in cartItems) {
                const cartItem = cartItems[cartKey];

                const productBlock = document.createElement("div");
                productBlock.className = "product-block cart-product";

                // Create the product image element
                const productImage = document.createElement("img");
                productImage.src = cartItem.img;
                productImage.alt = cartItem.name;
                productImage.className = "cart-product-image";

                // Create a container for the product description
                const descriptionContainer = document.createElement("div");
                descriptionContainer.className = "cart-product-details";
                // Create the product name element
                const productName = document.createElement("h3");
                productName.textContent = cartItem.name;

                // Create the product price element
                const productPrice = document.createElement("p");
                productPrice.className = "product-price";
                productPrice.textContent = `Price: ₹${parseInt(cartItem.price)}`;

                // Create the "Remove from Cart" button
                const removeFromCartButton = document.createElement("button");
                removeFromCartButton.className = "remove-from-cart-button";
                removeFromCartButton.textContent = "Remove from Cart";
                removeFromCartButton.setAttribute("data-product-id", cartItem.id);
                // Add a click event listener to the "Remove from Cart" button
                function removeFromCart(productId) {
                    // Retrieve the cart items from local storage
                    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

                    // Use Array.filter() to remove the item with the matching product ID
                    cartItems = cartItems.filter((item) => item.id !== productId);

                    // Update the cart in local storage
                    localStorage.setItem('cart', JSON.stringify(cartItems));

                    // Refresh the cart display
                    displayCart();
                }

                // ...

                // Add a click event listener to the "Remove from Cart" button
                removeFromCartButton.addEventListener('click', function () {
                    const productId = this.getAttribute('data-product-id');
                    removeFromCart(productId); // Call the removeFromCart function with the product ID
                });


                // Create the quantity element
                const quantityElement = document.createElement("p");
                quantityElement.className = "cart-product-quantity";
                quantityElement.textContent = `Quantity: ${cartItem.quantity}`;

                // Append elements to the description container
                descriptionContainer.appendChild(productName);
                descriptionContainer.appendChild(productPrice);
                descriptionContainer.appendChild(removeFromCartButton);
                descriptionContainer.appendChild(quantityElement);

                // Append the product image and description container to the product block
                productBlock.appendChild(productImage);
                productBlock.appendChild(descriptionContainer);

                // Add the product block to the cart container
                cartContainer.appendChild(productBlock);

                // Calculate and update the total cost
                totalCost += parseInt(cartItem.price) * cartItem.quantity;
            }
            const cartTotal = document.getElementById('cart-total');
            cartTotal.textContent = `Total Cost: ${formatCurrency(totalCost)}`;
        } else {
            const noproductsToShow = document.createElement("h3");
            noproductsToShow.textContent = "No Products added in the Cart! Try adding some products.";
            cartContainer.appendChild(noproductsToShow);
            const cartTotal = document.getElementById('cart-total');
            cartTotal.textContent = `Total Cost: ₹0`;
        }
    }

    // Initial display of cart items
    displayCart();

    // Function to update the receipt with delivery charge and total cost
    function updateReceipt() {
        // Get the selected delivery option
        const deliveryDateSelect = document.getElementById("delivery-date");
        const selectedDeliveryOption = deliveryDateSelect.options[deliveryDateSelect.selectedIndex].text;

        // Calculate the delivery charge based on the selected option
        let deliveryCharge = 0;
        if (selectedDeliveryOption.includes("Ultra Express Delivery")) {
            deliveryCharge = 10;
        } else if( selectedDeliveryOption.includes("Express Delivery") ){
            deliveryCharge = 5;
        }

        // Calculate the total cost
        const totalCostElement = document.getElementById("total-cost");
        const totalCost = calculateTotalCost(deliveryCharge);

        // Display the delivery charge and total cost
        const deliveryChargeElement = document.getElementById("delivery-charge");
        deliveryChargeElement.textContent = `Delivery Charge: ${formatCurrency(deliveryCharge)}`;
        totalCostElement.textContent = `Total Cost: ${formatCurrency(totalCost)}`;

        // After updating the receipt, you can make it visible
        const receiptContainer = document.getElementById("checkout-form-container");
        receiptContainer.style.display = "block";
    }

    // Function to calculate the total cost
    function calculateTotalCost(deliveryCharge) {
        // Retrieve the cart data from local storage
        const cartData = transformCartData();

        // Calculate the total cost by iterating through the cart items
        let totalCost = 0;

        cartData.forEach(item => {
            // Calculate the total cost for each item (product price * quantity)
            const itemTotal = item.price * item.quantity;
            totalCost += itemTotal;
        });

        // Add the delivery charge to the total cost
        totalCost += deliveryCharge;

        return totalCost;
    }

    // JavaScript to show/hide the checkout form
    function checkoutform() {
        const checkoutFormContainer = document.getElementById("checkout-form-container");
        const container=document.getElementById("order-confirmation");
        const placeOrderButton = document.getElementById("place-order");
        const deliveryDateSelect = document.getElementById("delivery-date");
        const deliveryCharge = document.getElementById("delivery-charge");
        const totalCost = document.getElementById("total-cost");

        container.style.display="none";

        placeOrderButton.addEventListener("click", () => {
            // Hide the checkout form and show order confirmation
            checkoutFormContainer.style.display="none";
            displayOrderConfirmation();
        });

        deliveryDateSelect.addEventListener("change", () => {
            const selectedOption = deliveryDateSelect.value;
            let charge = 0;

            if (selectedOption === "today") {
                charge = 10;
                deliveryCharge.textContent = "Ultra Express Delivery: " + formatCurrency(charge);
            } else if (selectedOption === "tomorrow") {
                charge = 5;
                deliveryCharge.textContent = "Express Delivery: " + formatCurrency(charge);
            } else {
                deliveryCharge.textContent = "Normal Delivery: " + formatCurrency(charge);
            }

            // Update the total cost
            const currentTotal = getNumericPrice(totalCost.textContent);
            totalCost.textContent = "Total Cost: " + formatCurrency(currentTotal + charge);
        });
        const paymentModeSelect = document.getElementById("payment-mode");
        const qrCodeContainer = document.getElementById("qr-code-container");
        
        paymentModeSelect.addEventListener("change", function () {
            const selectedOption = paymentModeSelect.value;
            if (selectedOption === "Online payment") {
                qrCodeContainer.style.display = "block";
            } else {
                qrCodeContainer.style.display = "none";
            }
        });
        // Function to display the order confirmation
        function displayOrderConfirmation(){
            const element=document.createElement("h3");
            element.textContent = "Your order has been placed!";
            element.style.fontWeight = "bold";
            element.style.marginTop = "10px";
            container.appendChild(element)
        };
    }

    function finalCheckout() {
        checkoutform();
        updateReceipt();

    }

    const proceedToCheckoutButton = document.getElementById("proceed-to-checkout");
    proceedToCheckoutButton.addEventListener("click", finalCheckout);

});

    
