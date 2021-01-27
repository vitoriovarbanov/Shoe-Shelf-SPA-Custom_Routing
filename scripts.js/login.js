async function loginSubmit(e) {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value
    const password = document.querySelector('input[type="password"]').value
    if (email !== '' && password !== '') {
        await requestLoginAsync(email, password)
        navigate('/')
    }
}

async function requestLoginAsync(email, password) {
    let response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })
    let data = await response.json()
    localStorage.setItem('userData', JSON.stringify(data))
    return data
}