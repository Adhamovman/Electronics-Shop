let btn = document.getElementById('send');

btn.addEventListener('click', async () => {
    let email = localStorage.getItem('email');
    let password = document.getElementById('password').value.trim();
    let newpassword = document.getElementById('password').value.trim();

    if (!password || !email || !newpassword) return;
    let data = await fetch("/users/check/" + password, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
            email,
            newpassword
        })
    });
    data = await data.json();
    if ([200, 201, 204].includes(data.status)) {
        console.log(data.token.token);
        localStorage.setItem("token", data.token);
        localStorage.removeItem("email")
        window.location.href = '/';
    }
    else {
        const hint = document.querySelector("#hint");
        if (data.message = "Cannot read properties of null (reading '_id')") {
            hint.innerText = "User not found!"
        }
        else {
            hint.innerText = data.message;
        }
    }
})