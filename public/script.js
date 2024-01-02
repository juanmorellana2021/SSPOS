// Product catalog data
const productCatalog = {
    smoothie1: { name: 'Smoothie 1', price: 4.99, image: 'smoothie1.jpg' },
    smoothie2: { name: 'Smoothie 2', price: 5.99, image: 'smoothie2.jpg' },
    // Add more products as needed
};

// Function to populate product dropdown
function populateProductDropdown() {
    const dropdown = document.getElementById('item');
    
    // Clear existing options
    dropdown.innerHTML = '';

    // Populate dropdown with product options
    for (const productId in productCatalog) {
        const option = document.createElement('option');
        option.value = productId;
        option.textContent = productCatalog[productId].name;
        dropdown.appendChild(option);
    }
}

// Function to add item to the order
function addItem() {
    const selectedItem = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    if (quantity > 0) {
        const orderList = document.getElementById('order-list');
        const totalElement = document.getElementById('total');

        // Check if the item already exists in the order
        const existingItem = document.getElementById(selectedItem);
        if (existingItem) {
            const existingQuantity = parseInt(existingItem.dataset.quantity);
            existingItem.dataset.quantity = existingQuantity + quantity;
            existingItem.textContent = `${productCatalog[selectedItem].name} x${existingItem.dataset.quantity}`;
        } else {
            const newItem = document.createElement('li');
            newItem.id = selectedItem;
            newItem.dataset.quantity = quantity;
            newItem.textContent = `${productCatalog[selectedItem].name} x${quantity}`;

            // Add a remove button for each item
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = function() {
                removeItem(selectedItem);
            };

            newItem.appendChild(removeButton);
            orderList.appendChild(newItem);
        }

        // Update total amount
        const totalPrice = parseFloat(totalElement.textContent) + productCatalog[selectedItem].price * quantity;
        totalElement.textContent = totalPrice.toFixed(2);
    }
}

// Function to remove item from the order
function removeItem(item) {
    const orderList = document.getElementById('order-list');
    const totalElement = document.getElementById('total');
    
    const itemToRemove = document.getElementById(item);
    const itemPrice = productCatalog[item].price * parseInt(itemToRemove.dataset.quantity);
    
    // Update total amount
    const newTotal = parseFloat(totalElement.textContent) - itemPrice;
    totalElement.textContent = newTotal.toFixed(2);

    // Remove the item from the order list
    orderList.removeChild(itemToRemove);
}

// Sample initialization, replace with actual initialization logic
populateProductDropdown();
document.getElementById('item').selectedIndex = 0;
