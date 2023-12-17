let btn = document.getElementById('send');

btn.addEventListener('click', async () => {
    let email = document.getElementById('email').value.trim();
    if (!email) return;
    let data = await fetch("/users/forgotPassword", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
        })
    });
    data = await data.json();
    if ([200, 201, 204, 203].includes(data.status)) {
        localStorage.setItem('email', data.data.email);
        location.href = '/newpassword'
    }
    else {
        let hint = document.getElementById('hint');
        hint.innerHTML = data.message
    }
})