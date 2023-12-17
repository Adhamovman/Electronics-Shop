
let btn = document.getElementById('send');

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
    }
    else {
        const hint = document.querySelector(".hint");
        hint.innerText = data.message;
    }
})