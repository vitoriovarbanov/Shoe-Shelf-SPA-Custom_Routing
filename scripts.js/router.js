var Router = function (name, routes) {
    return { name, routes }
}

const myRouter = new Router('myRouter', [
    { path: '/', name: 'home-template' },
    { path: '/index.html', name: 'home-template' },
    { path: '/login', name: 'login-template' },
    { path: '/register', name: 'register-template' },
    { path: '/create', name: 'create-template' },
    { path: '/details', name: 'details-template' },
    { path: '/edit', name: 'edit-template' }
])

const rootEl = document.getElementById('app');

window.onload = function () {
    const headerTemplate = Handlebars.compile(document.getElementById('header-partial').innerHTML);
    Handlebars.registerPartial('header-partial', headerTemplate)
    const footerTemplate = Handlebars.compile(document.getElementById('footer-partial').innerHTML)
    Handlebars.registerPartial('footer-partial', footerTemplate)
    let url = new URL(window.location.href)
    navigate(url.pathname)
}

async function manageHandlebarTemplates(fullPath) {
    let [nothing,path, id] = fullPath.split('/')
    path = `/${path}`
    console.log(path)
    const templateData = {};
    if (path === '/logout') {
        localStorage.clear()
        return navigate('/')
    }
    if (!localStorage.hasOwnProperty('userData')) {
        templateData.loggedIn = false;
    } else {
        templateData.email = JSON.parse(localStorage.getItem('userData')).email
        templateData.loggedIn = true;
        if (path === '/' || path === '/index.html') {
            const shoeTemplate = Handlebars.compile(document.getElementById('shoe-partial').innerHTML);
            Handlebars.registerPartial('shoe-partial', shoeTemplate)
            const dataObj = await renderAllShoes()
            const arr = Object.keys(dataObj).map(x => ({ x, ...dataObj[x] }))
            templateData.shoes = arr
        } else if (path === '/details') {
            const data = await getShoeData(id)
            templateData.id = id
            if (data.creator === templateData.email) {
                data.shoeCreator = true;
            } else {
                data.shoeCreator = false;
            }
            Object.assign(templateData, data)
        } else if (path === '/delete') {
            await deleteRequest(id)
            return navigate('/')
        }
    }
    const neededRoute = myRouter.routes.find(r => r.path === path)
    const template = document.getElementById(neededRoute.name).innerHTML
    const compiled = Handlebars.compile(template)
    rootEl.innerHTML = compiled(templateData)
}

function navigate(path) {
    let url = new URL(window.location.href)
    const state = url.pathname
    history.pushState({ state }, '', path)
    manageHandlebarTemplates(path)
}

window.addEventListener('popstate', (event) => {
    manageHandlebarTemplates(document.location.pathname)
    console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});

function navigateHandler(e) {
    e.preventDefault()
    if (e.target.nodeName === 'A' && e.target.href !== '') {
        let url = new URL(e.target.href)
        navigate(url.pathname)
    } else if (e.target.nodeName == 'IMG') {
        let url = new URL(e.target.parentElement.href)
        navigate(url.pathname)
    }
}
