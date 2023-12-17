
let btn = document.getElementById('send');

btn.addEventListener('click', async () => {
    let username = document.getElementById('username').value.trim();
    let email = document.getElementById('email').value.trim();
    let password = document.getElementById('password').value.trim();
    let contact = document.getElementById('contact').value.trim();
    if (!email || !password || !contact || !username) return;
    let data = await fetch("/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            username,
            password,
            contact
        })
    });
    data = await data.json();
    if ([200, 201, 204, 203].includes(data.status)) {
        localStorage.setItem('token', data.token);
        location.href = '/'
    }
    else {
        let hint = document.getElementById('hint');
        hint.innerHTML = data.message
    }
})