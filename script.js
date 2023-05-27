function addToCart(image, name, description, price, quantityId) {
  var quantityInput = document.getElementById(quantityId);
  var quantity = parseInt(quantityInput.value);

  if (quantity > 0) {
    var cartItem = {
      image: image,
      name: name,
      description: description,
      price: price,
      quantity: quantity
    };

    try {
      // Retrieve existing cart items from localStorage or initialize an empty array
      var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

      // Add the new cart item
      cartItems.push(cartItem);

      // Store the updated cart items in localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      // Reset the quantity input
      quantityInput.value = '';

      // Show a confirmation message
      alert('Item added to cart successfully!');
    } catch (error) {
      console.log('An error occurred while accessing localStorage:', error);
      alert('Failed to add item to cart. Please try again.');
    }
  } else {
    alert('Please enter a valid quantity.');
  }
}

function displayCartItems() {
  // Retrieve cart items from localStorage
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Get the cart items container element
  var cartItemsContainer = document.getElementById('cart-items');

  // Clear previous content
  cartItemsContainer.innerHTML = '';

  // Generate the cart view
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    var totalPrice = 0;

    cartItems.forEach(function (cartItem, index) {
      var itemTotalPrice = cartItem.price * cartItem.quantity;
      totalPrice += itemTotalPrice;

      var cartItemHTML = document.createElement('div');
      cartItemHTML.classList.add('card');
      cartItemHTML.classList.add('card-width');

      cartItemHTML.innerHTML = `
          <img class="card-img-top" src="${cartItem.image}" alt="Product Image">
          <div class="card-body">
            <h5 class="card-title">${cartItem.name}</h5>
            <p class="card-text">${cartItem.description}</p>
            <p>Price: $${cartItem.price}</p>
            <p>Quantity: ${cartItem.quantity}</p>
            <p>Total: $${itemTotalPrice}</p>
            <br>
            <br>
            <button style='height: 50px !important' class="remove-btn" data-index="${index}">Remove from Cart</button>
          </div>
        `;

      cartItemsContainer.appendChild(cartItemHTML);
    });

    var totalPriceHTML = document.createElement('div');
    totalPriceHTML.classList.add('total-price');
    totalPriceHTML.textContent = `Total Price: $${totalPrice}`;
    cartItemsContainer.appendChild(totalPriceHTML);

    // Attach event listeners to remove buttons
    var removeButtons = document.getElementsByClassName('remove-btn');
    for (var i = 0; i < removeButtons.length; i++) {
      removeButtons[i].addEventListener('click', function () {
        var index = this.getAttribute('data-index');
        removeFromCart(index);
      });
    }
  }
}

function removeFromCart(index) {
  // Retrieve cart items from localStorage
  var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  // Remove the item at the specified index
  cartItems.splice(index, 1);

  // Store the updated cart items in localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Display the updated cart items
  displayCartItems();
}

// Call the function to display cart items
displayCartItems();

function addToCartOnClick() {
  var orderButtons = document.getElementsByClassName('order-btn');

  // Attach event listener to each order button
  for (var i = 0; i < orderButtons.length; i++) {
    orderButtons[i].addEventListener('click', function () {
      var card = this.closest('.card');
      var name = card.querySelector('.card-title').textContent;
      var description = card.querySelector('.card-text').textContent;
      var price = parseInt(card.querySelector('.list-group-item:first-child').textContent.replace('Price : ', '').replace('$', ''));
      var quantityId = card.querySelector('.list-group-item:last-child input').id;

      addToCart(name, description, price, quantityId);
    });
  }
}

// Call the function to add event listeners to order buttons
addToCartOnClick();

function goToCart() {
  window.location.href = "cart.html";
}



function sendMessage(event) {
  event.preventDefault(); // Prevent the default form action

  if (
    document.getElementById('name').value !== '' &&
    document.getElementById('email').value !== '' &&
    document.getElementById('message').value !== ''
  ) {
    let theMessage = document.getElementById('message-msg');
    let themessage = document.getElementById('message').value;
    theMessage.style.display = 'block';


    theMessage.innerHTML += `<h2>Your Message '${themessage}' has been sent successfully</h2>`;

  }
}





