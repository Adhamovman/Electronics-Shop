const exact_products_row = document.querySelector("#exact-products-row");

let cat_id = localStorage.getItem("category");

(async function getProducts() {
  let products = await fetch("/products");
  products = await products.json();
  for (el of products) {
    if (cat_id == el.cat_ref_id) {
      exact_products_row.innerHTML += getCard(
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
})()

async function cat() {
  let category = await fetch("/categories/" + cat_id);
  category = await category.json()
  let this_category =  document.querySelectorAll(".this-product");
  for(el of this_category) {
    el.innerHTML = category.cat_name
  }
}
cat()