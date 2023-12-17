
(async function get() {
    let token = localStorage.getItem("token");
    if (token) {
        const orderRow = document.querySelector(".order-row");
        let data = await fetch('/orders');
        data = await data.json();
        if ([200, 201, 204].includes(data.status)) {
            for (el of data.data) {
                let cdate = el.created_at.split("T")
                let ddate = el.deleted_at?.split("T")

                orderRow.innerHTML += `
              <div class='card ${el.deleted_at ? "deleted" : ""} mb-2'>
                <h5 class="card-header py-3">Qabul qiluvchi: ${el.user_ref_id.username.toUpperCase()}, id: ${el.user_ref_id._id}</h5>
                   <div class="card-body">
                       <h5 class="card-title">Mahsulotlar: ${el.products.map(el => { return el.pro_name })}</h5 >
                       <p class="card-text">Qabul qilingan sana: ${cdate[0]}, ${cdate[1].split(".")[0]}</p> 
                       ${el.deleted_at ? ` <p class="card-text">Bekor qilingan sana: ${ddate[0]}, ${ddate[1].split(".")[0]}</p>` : `<button onclick="cencel('${el._id}')" class="btn btn-danger float-end">Cancel order</button> `}  
                  </div >
            </div >
          `
            }
        }
        else {
            window.alert("Please login and try again!")
        }
    }
    else {
        window.alert("Please login and try again!")
        window.location.href = '/'
    }
}
)()

async function cencel(id) {
    let really = window.confirm("Are you sure you want to delete this order?");
    if (really) {
        let data = await fetch("/orders/" + id, {
            method: "DELETE",
        });
        data = await data.json();
        if ([200, 201, 204, 203].includes(data.status)) {
            window.alert("Order deleted successfully!");
            window.location.reload();
        }
    }
}