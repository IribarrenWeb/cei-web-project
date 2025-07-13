function loadComponent(selector, url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            document.querySelector(selector).innerHTML = html;
        })
        .catch(error => {
            console.error(`Error cargando el modulo`, error);
        });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}