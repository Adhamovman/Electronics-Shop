const Favourite_row = document.querySelector(".liked-row");

function addProductToFavourite(_id) {
  (async function getProducts() {
    let products = await fetch("/products");
    products = await products.json();
    let product = products.find((product) => product._id === _id);
    if (favourite.find((el) => el._id == _id)) {
      favourite = favourite.filter((el) => el._id != _id);
      window.location.reload();
    } else {
      favourite.push(product);
    }
    setFavouriteCart();
  })()
}

favourite.forEach((el) => {
  Favourite_row.innerHTML += getCard(
    el.pro_name,
    el.brand_ref_id.brand_name,
    el.pro_desc,
    el.price,
    el.rating,
    el.disc_ref_id,
    el.link,
    el._id.toString(),
  );
});

let notFound = document.querySelector("#not-found");
if (!favourite.length) {
  notFound.classList.remove("hide");
} else {
  notFound.classList.add("hide");
}
