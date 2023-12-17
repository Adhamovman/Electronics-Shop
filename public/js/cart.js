const cart_row = document.querySelector(".cart-row");

const array = localStorage.getItem("cart");
let selectedItems = JSON.parse(array) || [];

function remove(_id) {
  selectedItems = selectedItems.filter(el => el._id != _id);
  localStorage.setItem("cart", JSON.stringify(selectedItems));
  location.reload();
}

function productCount(selectedItems) {
  return selectedItems.length;
}

function productsSum(selectedItems) {
  let ProductsSum = 0;
  selectedItems.forEach((el) => {
    ProductsSum += el.price * el.quantity;
  });
  return Math.floor(ProductsSum);
}
productsSum(selectedItems);

function productsOff(selectedItems) {
  let discountSum = 0;
  selectedItems.forEach((el) => {
    if (el.disc_ref_id) {
      discountSum += (el.price * el.disc_ref_id.disc_percent * el.quantity) / 100;
    }
    else {
      discountSum += (el.price * el.quantity) / 100;
    }
  });
  return Math.floor(discountSum);
}
productsOff(selectedItems);

function productsAfterOff(selectedItems) {
  let discountSum = 0;
  selectedItems.forEach((el) => {
    if (el.disc_ref_id) {
      discountSum += (el.price * (100 - el.disc_ref_id.disc_percent) * el.quantity) / 100;
    }
    else {
      discountSum += (el.price * el.quantity);
    }
  });
  return Math.ceil(discountSum);
}
productsAfterOff(selectedItems);

function bonus(selectedItems) {
  let discountSum = 0;
  selectedItems.forEach((el) => {
    if (el.disc_ref_id) {
      discountSum += (el.price * (100 - el.disc_ref_id.disc_percent) * el.quantity) / 100;
    }
    else {
      discountSum += (el.price * el.quantity) / 100;

    }
  });
  return Math.floor(discountSum / 1000);
}
bonus(selectedItems);

let buy_desc = document.querySelector("#buy-desc");

function getItemCostDesc() {
  return `
   <div class="item">
  <div class="seperate-border">
  <div
                    class="all-item d-flex justify-content-between align-items-center"
                  >
                    <p class="main-p m-0">${productCount(selectedItems)}
                    товара</p>
                    <p class="main-p m-0">${productsSum(selectedItems)} UZS</p>
                    </div>
                    <div
                    class="all-item d-flex justify-content-between align-items-center"
                    >
                    <p class="main-p m-0">Скидка</p>
                    <p class="main-p off m-0">-${productsOff(
    selectedItems
  )} UZS</p>
                    </div>
                    </div>
                    <div
                    class="all-item d-flex justify-content-between align-items-center mt-3"
                    >
                    <p class="main-p m-0">Итог</p>
                    <h3 class="little-h m-0">${productsAfterOff(
    selectedItems
  )} UZS</h3>
                    </div>
                    <div
                    class="product-bonus d-flex justify-content-center align-items-center mt-2"
                    >
                    <img src="./image/bonus-icon.png" alt="" />
                    <p class="little-p m-0 ms-2 color-green">
                    Вы получяете ${bonus(selectedItems)} бонусов
                    </p>
                    </div>
                    <button id="order-btn" class="book-btn w-100 mt-4">Оформить заказ</button>
                    </div>
                    `;
}

buy_desc.innerHTML = getItemCostDesc();

function getOffCost(discount, price, quantity) {
  return `${Math.floor((price * quantity * (100 - discount.disc_percent)) / 100)}`;
}
function getProductCost(price, quantity) {
  return Math.floor(price * quantity);
}

function getCartProduct({
  pro_name,
  quantity,
  price,
  discount,
  link,
  _id }) {
  return `
  <div class="mt-3">
  <div class="card">
  <div class="d-flex flex-wrap">
  <div class="col-3 col-md-2 p-0 d-flex align-items-center">
  <img
  src=${link}
  class="card-img-top h-100 object-fit-contain"
  alt="..."
  />
  </div>
  <div class="col-9 col-md-5 p-1 ps-2 py-3">
  <div class="card-body p-0">
  <div
  class="d-flex justify-content-between align-items-center"
  >
            <h5 class="card-title">${pro_name}</h5>
          </div>

          <div class="d-flex align-items-center">
          <p class="card-text">
          ${price} UZS <p class = "little-p ms-2">за шт.</p>
          ${discount ? `<span class="product-discount"
          >${discount.disc_percent} %</span>` : ''} 
          </p>
          </div>
          </div>
          </div>
          <div class="res-view col-12 col-md-5 p-1 d-flex">  <div
          class="count-product col-6 d-flex p-1 align-items-center"
          >
          <button
          class="btn-left btn btn-primary"
          onclick="changeQuantity('-', '${_id}')"
          >
          -
          </button>
          <span>${quantity}</span>
          <button
          class="btn-right btn btn-primary"
          onclick="changeQuantity('+','${_id}')"
          >
          +
          </button>
          </div>
          <div class="col-6 p-1 d-flex flex-column justify-content-center">
          <div onclick="remove('${_id}')" class="cick">
          <i class="fa-solid fa-square-xmark" style="color: #ff5757;"></i>
        </div>        
          ${discount ? ` <p class="card-text huge-p text-end m-0">${getOffCost(
    discount,
    price,
    quantity
  )} UZS</p>
                    <p class="card-text text-end m-0 deleteCost">${getProductCost(
    price,
    quantity
  )} UZS</p>` : ""}
       
            </div>
            </div> 
            </div>
            </div>
            </div>
            `;
}

cart.forEach((el) => {
  cart_row.innerHTML += getCartProduct({
    pro_name: el.pro_name,
    price: el.price,
    quantity: el.quantity,
    discount: el.disc_ref_id,
    link: el.link,
    _id: el._id
  });
});


function changeQuantity(status, _id) {
  let product = cart.find((el) => el._id == _id);
  if (status == "-") {
    if (product.quantity == 1) {
      cart = cart.filter((el) => el._id != _id);
    }
  }
  cart = cart.map((el) => {
    if (el._id == _id) {
      status == "+" ? el.quantity++ : el.quantity--;
    }
    return el;
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}
const order_btn = document.getElementById("order-btn");
order_btn.onclick = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    let orders = [];
    let products = JSON.parse(localStorage.getItem("cart"));
    products.forEach(pro => {
      orders.push(pro._id);
    })
    if (orders.length > 0) {
      let data = await fetch("/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          orders
        })
      });
      data = await data.json()
      if ([200, 201, 204].includes(data.status)) {
        localStorage.removeItem("cart");
        window.location.reload();
      }
    }
    else {
      window.confirm("Please choose something before order!")
    }
  }
  else {
    window.confirm("Please Log into your account!")
  }
}

