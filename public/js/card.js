
function getCard(
  pro_name,
  brand_name,
  pro_desc,
  price,
  rating,
  discount,
  link,
  _id
) {
  return ` 
    <div class="card-head">  <img src= ${link} class="card-img-top" alt=${pro_name}>
     <img onclick="addProductToFavourite('${_id}')" class="like" src="/image/${favourite.find((el) => el?._id == _id) ? "like.png" : "likedd.svg"
    }" alt="">
    ${discount ? `<p class="product-discount m-0">
    -${discount.disc_percent}% 
     </p>`: ""}
     
    </div>
      <div class="card-body p-2">
      <div class="product-info d-flex justify-content-between align-items-center">
      <div class="cost-info">  <h5 class="huge-p m-0">${price} UZS</h5>
        <p class="little-p m-0">
        С картой
        </p></div>
        <p class="category-p">${brand_name}</p>
      </div>
               <h5 class="card-title">${pro_name}</h5>
     <div class="product-desc">   <p class="card-text"> ${pro_desc}</p>
     </div>
        <div class="stars-row mb-1">
          ${getRating(rating)}
        </div>
        <button onclick="addProductToCart('${_id}')" id="${pro_name}" class="btn btn-primary w-100 btn-main">${cart.find((el) => el._id == _id) ? "Delete from cart" : "Add to cart"}</button>
      </div>
  `;
}

function getRating(rating) {
  let res = "";
  let star_count = 0;
  let full_star = parseInt(rating);
  let rest_star = rating - full_star;
  star_count = full_star;
  res = Array(full_star)
    .fill(`<img src="/image/ful-star.png" alt="">`)
    .join("");
  if (0.25 <= rest_star && rest_star <= 0.5) {
    star_count++;
    res += `<img src="/image/half-star.png" alt="">`;
  }
  if (0.5 < rest_star) {
    star_count++;
    res += `<img src="/image/ful-star.png" alt="">`;
  }
  free_star = 5 - star_count;
  res += Array(free_star)
    .fill(`<img src="/image/empty-starr.png" alt="">`)
    .join("");
  return res;
}


function addProductToCart(_id) {
  (async function getProducts() {
    let products = await fetch("/products");
    products = await products.json();
    let product = products.find((product) => product._id === _id);
    if (cart.find((el) => el._id == _id)) {
      cart = cart.filter((el) => el._id != _id)
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    setCart();
    window.location.reload();
  })()
}

function addProductToFavourite(_id) {
  (async function getProducts() {
    let products = await fetch("/products");
    products = await products.json();
    let product = products.find((product) => product?._id == _id);
    if (favourite.find((el) => el?._id == _id)) {
      favourite = favourite.filter((el) => el?._id != _id);
    } else {
      favourite.push(product);
    }
    setFavouriteCart();
    window.location.reload();
  })()
}
