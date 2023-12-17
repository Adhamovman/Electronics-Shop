const sidebar = document.querySelector("aside");
const sidebarToggle = document.querySelector(".hamburger");
const fullName = document.querySelector(".avatar span");
const logout = document.querySelector(".logout");

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

const body = document.body;
const aside = document.getElementById("aside");

const modeToggle = document.querySelector(".switch");

modeToggle.addEventListener("click", () => {
  const card = document.querySelectorAll(".card");
  body.classList.toggle("dark");
  aside.classList.toggle("half-dark");
  if (card) {
    for (let i = 0; i < card.length; i++) {
      card[i].classList.toggle("card-dark");
    }
  }
});


async function get() {
  let token = localStorage.getItem("token");
  if (!token) window.location.href = '/';
  let data = (await fetch('/users/confirm/' + token));
  data = await data.json()
  if ([200, 201, 202, 204].includes(data.status)) {
    const username = document.querySelector(".username");
    const avatar = document.querySelector(".avatar");
    username.innerText = data.data.username;
    avatar.src = data.data.avatar;

  }
  else {
    localStorage.removeItem("token")
    window.location.href = '/';
  }
}
get()

logout.addEventListener("click", function () {
  localStorage.removeItem("token");
  location.href = "/";
});
