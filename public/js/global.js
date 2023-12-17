const dropdown = document.getElementById("drop")
const logout = document.getElementById("logout");

function tooglePanel() {
  let catalogPanel = document.querySelector(".catalog-panel");
  catalogPanel.classList.toggle("d-none");
}

const open_btn = document.querySelector(".open-modal");
const open_phone_btn = document.querySelector(".open-phone-modal");

const close_btn = document.querySelector(".close-modal");
const modal = document.querySelector(".modall");
const modal_content = document.querySelector(".modal-content");

function modalShow() {
  modal.classList.add("modal-show");
  modal_content.classList.add("modal-content-show");
}

function modalHide() {
  modal.classList.remove("modal-show");
  modal_content.classList.remove("modal-content-show");
}
open_btn.addEventListener("click", function () {
  let token = localStorage.getItem("token");
  if (token) {
    dropdown.classList.toggle("d-none")
  }
  else {
    modalShow()
  }
});


open_phone_btn.addEventListener("click", function () {
  let token = localStorage.getItem("token");
  if (token) {
    dropdown.classList.toggle("d-none")

  }
  else {
    modalShow()
  }
});

close_btn.addEventListener("click", modalHide);

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modalHide();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    modalHide();
  }
});

logout.onclick = () => {
  localStorage.clear()
  window.location.reload()
}

(async function subs() {
  const likes = JSON.parse(localStorage.getItem('favourite')) || [];
  const carts = JSON.parse(localStorage.getItem('cart')) || [];

  const like = document.querySelectorAll('.likes');
  const cart = document.querySelectorAll('.cart');
  const subcategoriesList = document.querySelector(".catalog-list");
  let subcategories = await fetch('/subcategories');
  subcategories = await subcategories.json();
  subcategories.map(el => {
    subcategoriesList.innerHTML += `
    <a href="#" class="catalog-link"><img class="sub_img" src="${el.sub_img}" alt='${el.sub_name}'/>${el.sub_name}</a>
    `   })
  for (el of like) (el.innerText = likes.length);
  for (el of cart) (el.innerText = carts.length);
})()

const btn = document.getElementById('send');

btn.addEventListener('click', async () => {
  let email = document.getElementById('email').value.trim();
  let password = document.getElementById('password').value.trim();
  if (!email || !password) return;
  let data = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });
  data = await data.json();
  if ([200, 201, 204].includes(data.status)) {
    localStorage.setItem("token", data.data.token);
    if (data.data.position == "admin") {
      window.location.href = '/dashboard'
    }
    window.location.reload();
  }
  else {
    const hint = document.querySelector(".hint");
    hint.innerText = data.message;
  }
})
async function getUser() {
  let token = localStorage.getItem("token");
  if (token) {
    const avatar = document.querySelector('.user-img');
    const username = document.querySelector('.username');
    let data = await fetch('/users/confirm/' + token);
    data = await data.json();

    if ([200, 201, 204].includes(data.status)) {
      const orders = document.querySelectorAll('.order');
      if (data.data.pos_ref_id.pos_name == "admin") {
        window.location.href = '/dashboard'
      }
      for (i in orders) {
        orders[i].innerHTML = data.data.orders?.length || 0
      };
      avatar.src = data.data.avatar
      username.innerText = data.data.username

    }
  }
}
getUser();

