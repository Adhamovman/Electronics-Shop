let results = document.querySelector(".results");
let allProductsRow = document.querySelector("#all-products-row");

(async function getProducts() {
  let products = await fetch("/products");
  products = await products.json();
  getAllProducts(products);
})()
function getAllProducts(products) {
  allProductsRow.innerHTML = "";
  for (el of products) {
    allProductsRow.innerHTML += getCard(
      el.pro_name,
      el.brand_ref_id.brand_name,
      el.pro_desc,
      el.price,
      el.rating,
      el.disc_ref_id,
      el.link,
      el._id
    );
  }
}


let notFound = document.querySelector("#not-found");
async function search(e) {
  (async function getProducts() {
    let products = await fetch("/products?search=" + e.target.value);
    products = await products.json();
  
    getAllProducts(products);
    results.innerHTML = products.length ? `${products.length} results found` : "";
    if (!products.length) {
      notFound.classList.remove("hide");
    } else {
      notFound.classList.add("hide");
    }
  })()
}

