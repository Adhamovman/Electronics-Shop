const discount_row = document.querySelector("#discount_row");
const new_row = document.querySelector("#new_row");

(async function getProducts() {
  let products = await fetch("/products");
  products = await products.json();
  let count = 0;
  for (el of products) {
    if (el.disc_ref_id && count < 4) {
      discount_row.innerHTML += getCard(
        el.pro_name,
        el.brand_ref_id.brand_name,
        el.pro_desc,
        el.price,
        el.rating,
        el.disc_ref_id,
        el.link,
        el._id.toString(),
      );
      count++;
    }
  }
  count = 0;
  for (el of products) {
    if (count < 4) {
      new_row.innerHTML += getCard(
        el.pro_name,
        el.brand_ref_id.brand_name,
        el.pro_desc,
        el.price,
        el.rating,
        el.disc_ref_id,
        el.link,
        el._id.toString()
      );
      count++;
    }
  }
})()


const futures = [
  {
    heading: "Оформите карту «Северяночка»",
    description: "И получайте бонусы при покупке в магазинах и на сайте",
    image: "/image/cardd.png",
  },
  {
    heading: "Покупайте акционные товары",
    description: "И получайте вдвое больше бонусов",
    image: "/image/bascet.png",
  },
];
function getFutureCard(heading, description, image) {
  return `<div class="future-card d-flex ">
       <div class="future-card-desc ps-3 pt-3">
         <h2 class="little-h">${heading}</h2>
         <p class="main-p m-0">
           ${description}

         </p>
       </div>
       <div class="future-card-img">
         <img src=${image} alt="card-image" />
       </div>
     </div>`;
}
let future_cards_row = document.querySelector(".future-card-row");
for (el of futures) {
  future_cards_row.innerHTML += getFutureCard(
    el.heading,
    el.description,
    el.image
  );
}


let tabs = document.querySelectorAll(".tabs-toogle");
let contents = document.querySelectorAll(".tabs__content");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    contents.forEach((content) => {
      content.classList.remove("is-active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("is-active");
    });
    tabs[index].classList.add("is-active");

    contents[index].classList.add("is-active");
  });
});

const article = [
  {
    img: "/image/men-with-mask.png",
    date: "05.03.2021",
    heading: "Режим использования масок и перчаток на территории магазинов",
    paragraph:
      'Подробная информация о режимах использования масок и перчаток на территории магазинов "ЛЕНТА". Информация обновляется каждый будний день.',
  },
  {
    img: "/image/nature.png",
    date: "05.03.2021",
    heading: "Весеннее настроение для каждой",
    paragraph:
      "8 Марта – это не просто Международный женский день, это ещё день тюльпанов, приятных сюрпризов и праздничных тёплых пожеланий.",
  },
  {
    img: "/image/snacks.png",
    date: "22.02.2020",
    heading: "ЗОЖ или ФАСТФУД. А вы на чьей стороне? Голосуем!",
    paragraph:
      "Голосуйте за любимые категории, выбирайте категорию-победителя в мобильном приложении и получайте кешбэк 10% баллами в апреле!",
  },
];
function getArticleCard(img, date, heading, paragraph) {
  return `   <div class="article-card">
  <div class="article-card-img">
    <img src=${img} alt=".." />
  </div>
  <div class="article-card-desc p-2">
    <p class="little-p">${date}</p>
    <p class="huge-p">
     ${heading}
    </p>
    <p class="main-p">
     ${paragraph}
    </p>
    <button class="main-btn article-btn">Подробнее</button>
  </div>
</div>
`;
}
let article_row = document.querySelector("#article_row");
for (el of article) {
  article_row.innerHTML += getArticleCard(
    el.img,
    el.date,
    el.heading,
    el.paragraph
  );
}
if(1){
  var a=1
  
}
