async function renderAllShoes() {
    const res = await fetch('https://shoe-shelf-spa-f02c8-default-rtdb.firebaseio.com/shoes/.json')

    const data = await res.json()
    return data
}

async function createNewShoeAsync(e) {
    e.preventDefault()
    const name = document.querySelector('input[name="name"]').value
    const price = document.querySelector('input[placeholder="Price..."]').value
    const imageUrl = document.querySelector('input[placeholder="Image url..."]').value
    const description = document.querySelector('textarea[placeholder="Give us some description about this offer..."]').value
    const brand = document.querySelector('input[placeholder="Brand..."]').value

    if (name !== '' && price !== '' && imageUrl !== '') {
        await postShoeRequest(name, price, imageUrl, description, brand)
        navigate('/')
    }
}

async function postShoeRequest(name, price, imageUrl, description, brand) {
    const creator = JSON.parse(localStorage.getItem('userData')).email
    const res = await fetch(`https://shoe-shelf-spa-f02c8-default-rtdb.firebaseio.com/shoes/.json`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            price,
            imageUrl,
            description,
            brand,
            creator,
            boughtTimes: 0
        })
    })

    const data = await res.json()
    return data

}

async function getShoeData(id) {
    const res = await fetch(`https://shoe-shelf-spa-f02c8-default-rtdb.firebaseio.com/shoes/${id}.json`)

    const data = await res.json()
    return data

}

async function updateShoeInfo(e) {
    e.preventDefault()

    const name = document.querySelector('input[placeholder="Name..."]').value
    const price = document.querySelector('input[placeholder="Price..."]').value
    const imageUrl = document.querySelector('input[placeholder="Image url..."]').value
    const description = document.querySelector('textarea[placeholder="Give us some description about this offer..."]').value
    const brand = document.querySelector('input[placeholder="Brand..."]').value

    if (name !== '' && price !== '' && imageUrl !== '') {
        let url = new URL(window.location.href)
        const [none,path,id] = url.pathname.split('/')
        await updateRequest(name, price, imageUrl, description, brand,id)
        navigate(`/details/${id}`)
    }
}

async function updateRequest(name, price, imageUrl, description, brand, id) {
    const res = await fetch(`https://shoe-shelf-spa-f02c8-default-rtdb.firebaseio.com/shoes/${id}.json`, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            price,
            imageUrl,
            description,
            brand,
        })
    })
    const data = await res.json()
    return data
}

async function deleteRequest(id){
    const res = await fetch(`https://shoe-shelf-spa-f02c8-default-rtdb.firebaseio.com/shoes/${id}.json`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json()
    return data
}