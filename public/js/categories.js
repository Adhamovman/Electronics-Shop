
(async function getCategories() {
  let categories = await fetch('/categories');
  categories = await categories.json();
  let category_row = document.getElementById("category-row");
  for (el of categories) {
    category_row.innerHTML += getCategoryCard(el.cat_name, el.cat_img, el._id);
  }
})()

function getId(id) {
  localStorage.setItem('category', id);
}
function getCategoryCard(name, image, id) {
  return ` <a href="category.html" id="${name}" onclick="getId('${id}')">    <div class="category-card">
          <img src="${image}" alt="" /> 
            <div  class="back-gradient">
               <p class="huge-p category-card-text m-0">${name}</p>
            </div>
         </div> </a>`;
}
