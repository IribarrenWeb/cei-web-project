/**
 * Funcion para cargar dinamicamente los componentes/secciones
 */
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

/**
 * Funcion para retrasa/pausar la ejecucion de un script
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}