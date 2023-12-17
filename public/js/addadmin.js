
(async function get() {
    let token = localStorage.getItem("token");
    console.log();
    if (token) {
        const userRow = document.querySelector(".user-row");
        let data = await fetch('/users');
        data = await data.json();
        if ([200, 201, 204].includes(data.status)) {
            for (el of data.data) {
                userRow.innerHTML += `
            <div class="card position-relative">
            ${el.pos_ref_id.pos_name == "admin" ? '<i class="fa-solid fa-star admin position-absolute" style="color: #ffdd00;"></i>' : ""} 
                 <img src="${el.avatar}" class="card-img-top" alt="...">
                      <div class="card-body">
                            <h5 class="card-title">Username: ${el.username}</h5>
                           <p class="card-text">Email: ${el.email}</p>
                           <p class="card-text">Contact: ${el.contact}</p>
                           <button onclick="setadmin('${el._id}')" class="btn ${el.pos_ref_id.pos_name == "admin" ? "btn-danger" : "btn-primary"} ">${el.pos_ref_id.pos_name == "admin" ? "Cancel from admin" : "Appoint as admin"}</button>
                      </div>
            </div>`
            }
        }
        else {
            window.alert()
        }
    }
    else {
        window.alert("Please login and try again!")
        window.location.href = '/'
    }
}
)()

async function setadmin(id) {
    let data = await fetch('/users/addadmin/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
    });
    data = await data.json();
    if ([200, 201, 204].includes(data.status)) {
        window.alert("Successfully changed!");
        window.location.reload();
    }
    else {
        console.log(data.message);
    }
}