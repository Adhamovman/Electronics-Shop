(async function auto() {
    let product_id = localStorage.getItem('product_id');
    const product_img = document.querySelector(".pro-img")
    if (product_id) {
        let data = await fetch(`/products/${product_id}`);
        data = await data.json();
        let { link, price, pro_desc, rating, orders, comments, amount, disc_ref_id, _id, quantity, pro_name, sub_ref_id } = data
        product_img.src = link;
    }
})()

