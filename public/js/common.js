const cart_length = document.querySelector(".cart");
const cartLength = document.querySelector(".phoneCart");
const cart_local = localStorage.getItem("cart");
const cart_parse = JSON.parse(cart_local);
const favourite_parse = JSON.parse(localStorage.getItem("favourite"));

let cart = cart_parse || [];
let favourite = favourite_parse || [];

// function getCartLength() {
//   let cart_local = localStorage.getItem("cart");
//   let cart_parse = JSON.parse(cart_local);
//   cartLength.innerHTML = cart_parse ? cart_parse.length : 0;
//   cart_length.innerHTML = cart_parse ? cart_parse.length : 0;
// }

// getCartLength();

function setCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function setFavouriteCart() {
  localStorage.setItem("favourite", JSON.stringify(favourite));
}

