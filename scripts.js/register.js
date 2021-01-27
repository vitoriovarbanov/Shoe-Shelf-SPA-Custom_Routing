const apiKey = "AIzaSyBdHDckGgxVdhX2s_KxPppYoRq_o7G51y4";

async function registerSubmitForm(e){
    e.preventDefault()
    const email = document.querySelector('input[type="email"]').value
    const password = document.querySelector('input[type="password"]').value
    const rePassword = document.querySelector('input[placeholder="Re-password"]').value
    if(password===rePassword){
        const requestData = await registerUserRequestAsync(email,password)
        navigate('/');
        return requestData;
    }
}

async function registerUserRequestAsync(email,password){
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,{
        method: "POST",
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })

    const data = await response.json()
    return data
}