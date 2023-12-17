

const products_row = document.querySelector('.products-row');
let send = document.querySelector("#send");

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
     <div id=${_id} class="card w-100">
       <div class="card-head">  
        <img src= ${link} class="card-img-top" alt="...">
         ${discount ? `<p class="product-discount m-0">
         -${discount.disc_percent}% 
       </p>` : ""}
         <div class="edit-image">
              <form method="post" action="/upload/products/${_id}" enctype="multipart/form-data">
                     <input id='${_id}' type="file"  name="file" onchange="sup('${_id}')" class="select-image">
                    <button class='send-btn'><i class="fa-solid fa-repeat"></i> </button>
              </form>  
        </div> 
         <div id="edit" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editProduct('${_id}')"><i class="fa-solid fa-pen"></i>    </div> 
           <div id="delete" onclick="deleteProduct('${_id}')"><i class="fa-solid fa-trash"></i>    </div> 
        </div>
         <div class="card-body p-2">
             <div class="product-info d-flex justify-content-between align-items-center">
                <div class="cost-info">  
                     <h5 class="huge-p m-0">${price} UZS</h5>
                 </div>
             <p class="category-p">${brand_name}</p>
          </div>
                 <h5 class="card-title">${pro_name}</h5>
       <div class="product-desc">   <p class="card-text"> ${pro_desc}</p>
       </div>
          <div class="stars-row mb-1">
            ${getRating(rating)}
          </div>
         </div>
      </div>`;
}

async function clearModal() {
  let product_name = document.querySelector(".modal-title");
  let brand = document.getElementById('brand');
  let category = document.getElementById('category');
  let subcategory = document.getElementById('subcategory');
  let discount = document.getElementById('discount');
  const modal = document.querySelectorAll('.modal-body input');
  send.innerText = "Add"
  for (el of modal) {
    el.value = '';
  }
  product_name.innerText = 'Add Product';

  let categories = await fetch(`/categories`);
  categories = await categories.json();

  let subcategories = await fetch(`/subcategories`);
  subcategories = await subcategories.json();


  let brands = await fetch(`/brands`);
  brands = await brands.json();

  let discounts = await fetch(`/discounts`);
  discounts = await discounts.json();


  for (el of categories) {
    category.innerHTML += `<option value="${el._id}">${el.cat_name}</option>`;
  }
  for (el of subcategories) {
    subcategory.innerHTML += `<option   value="${el._id}">${el.sub_name}</option>`;
  }
  for (el of brands) {
    brand.innerHTML += `<option value="${el._id}">${el.brand_name}</option>`;
  }
  for (el of discounts) {
    discount.innerHTML += `<option  value="${el._id}">${el.disc_name} -${el.disc_percent}%</option>`;
  }
}
async function sup(id) {
  let input = document.querySelectorAll(".select-image");
  let btn = document.querySelectorAll(".send-btn");

  for (let i = 0; i < input.length; i++) {
    if (input[i].id == id) {
      input[i].style.display = "none";
      btn[i].innerHTML = `<i class="fa-solid fa-circle-check" style="color: #28b800;"></i>`
    }
  }
}



async function getProducts() {
  let products = await fetch('/products');
  products = await products.json();
  for (el of products) {
    products_row.innerHTML += getCard(
      el.pro_name,
      el.brand_ref_id.brand_name,
      el.pro_desc,
      el.price,
      el.rating,
      el.disc_ref_id,
      el.link,
      el._id.toString(),
    )
  }
}
getProducts();

async function deleteProduct(id) {
  let data = await fetch('/products/' + id, {
    method: 'DELETE',
  });
  data = await data.json();
  if ([200, 201, 204].includes(data.status)) {
    products_row.innerHTML = "";
    getProducts();
  }
}

async function editProduct(id) {
  let product_name = document.querySelector(".modal-title");
  let pro_name = document.getElementById('pro_name');
  let amount = document.getElementById('amount');
  let price = document.getElementById('price');
  let pro_desc = document.getElementById('pro_desc');
  let brand = document.getElementById('brand');
  let category = document.getElementById('category');
  let subcategory = document.getElementById('subcategory');
  let discount = document.getElementById('discount');
  localStorage.setItem('product_id', id);
  send.innerText = "Edit"
  
  let product = await fetch(`/products/` + id);
  product = await product.json();

  let categories = await fetch(`/categories`);
  categories = await categories.json();
  
  let subcategories = await fetch(`/subcategories`);
  subcategories = await subcategories.json();


  let brands = await fetch(`/brands`);
  brands = await brands.json();

  let discounts = await fetch(`/discounts`);
  discounts = await discounts.json();

  pro_desc.value = product.pro_desc;
  pro_name.value = product.pro_name;
  amount.value = product.amount;
  price.value = product.price;
  product_name.innerText = pro_name.value

  for (el of categories) {
    category.innerHTML += `<option ${el._id == product.cat_ref_id ? 'selected' : ""} value="${el._id}">${el.cat_name}</option>`;
  }
  for (el of subcategories) {
    subcategory.innerHTML += `<option  ${el._id == product.sub_ref_id ? 'selected' : null}  value="${el._id}">${el.sub_name}</option>`;
  }
  for (el of brands) {
    brand.innerHTML += `<option  ${el._id == product.brand_ref_id ? 'selected' : null}  value="${el._id}">${el.brand_name}</option>`;
  }
  for (el of discounts) {
    discount.innerHTML += `<option <option ${el._id == product.disc_ref_id ? 'selected' : null}  value="${el._id}">${el.disc_name} -${el.disc_percent}%</option>`;
  }
}


async function editPro() {
  let id = localStorage.getItem('product_id');
  let pro_name = document.getElementById('pro_name').value.trim();
  let amount = document.getElementById('amount').value.trim();
  let price = document.getElementById('price').value.trim();
  let pro_desc = document.getElementById('pro_desc').value.trim();
  let brand = document.getElementById('brand').value.trim();
  let category = document.getElementById('category').value.trim();
  let subcategory = document.getElementById('subcategory').value.trim();
  let discount = document.getElementById('discount').value.trim();
  let send = document.getElementById('send').innerHTML;


  let data = JSON.stringify({
    pro_name,
    amount,
    price,
    pro_desc,
    brand_ref_id: brand,
    cat_ref_id: category,
    sub_ref_id: subcategory,
    disc_ref_id: discount || null,
  });

  if (send == 'Add') {
    await fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data,
    })
  }
  else {
    await fetch('/products/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data
    })
  }
  location.reload()
}

async function search(e) {
  (async function getProducts() {
    products_row.innerHTML = "";
    let products = await fetch("/products?search=" + e.target.value);
    products = await products.json();
    for (el of products) {
      products_row.innerHTML += getCard(
        el.pro_name,
        el.brand_ref_id.brand_name,
        el.pro_desc,
        el.price,
        el.rating,
        el.disc_ref_id,
        el.link,
        el._id.toString(),
      )
    }
  })()
}