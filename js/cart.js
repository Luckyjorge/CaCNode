document.addEventListener("DOMContentLoaded", displayCartItems);

function displayCartItems() {
  const items = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.querySelector(".cart-items");
  cartItemsContainer.innerHTML = "";

  if (items.length === 0) {
    cartItemsContainer.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  items.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart_item";
    cartItem.innerHTML = `
      <p class="cart_id">${item.id}</p>
      <p class="cart_title">${item.title}</p>
      <img src="${item.image}" alt="${item.title}" class="cart_img" />
      <p class="cart_price">${item.price}</p>
      <button class="cart_delete" data-index="${index}">Delete</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  document.querySelectorAll(".cart_delete").forEach(button => {
    button.addEventListener("click", removeFromCart);
  });
}

function removeFromCart(event) {
  const index = event.target.getAttribute("data-index");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
}
