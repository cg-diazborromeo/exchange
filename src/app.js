const $seleccionarInputs = document.querySelector('#seleccionar');
const $baseMonetaria = document.querySelector('select');
const $opionesMonedas = document.querySelector('#opciones-monedas');
const $opcionesFechas = document.querySelector('#opciones-fechas');
const $listaCambios = document.querySelector('#lista-cambios');
const $selecciones = document.querySelector('#selecciones');
const $urlBase = new URL('https://api.exchangerate.host/');
let baseMonetaria;

obtenerMonedas();

$seleccionarInputs.onclick = function(event) {
    const $mostrarBase = document.querySelector('em');
    $mostrarBase.textContent = $baseMonetaria.value;
    baseMonetaria = $baseMonetaria.value;
    mostrarCambios();
    mostrarSelecciones();

    event.preventDefault();
}

function obtenerMonedas() {
    fetch('https://api.exchangerate.host/symbols')
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.symbols).forEach(moneda => {
            const $moneda = document.createElement('option');
            $moneda.value = respuesta.symbols[moneda].code;
            $moneda.textContent = `${respuesta.symbols[moneda].code}: ${respuesta.symbols[moneda].description}`;
            $opionesMonedas.appendChild($moneda);
        });
        console.log(respuesta)
    })
    .catch(error => console.error("FALLÓ", error));
};

function mostrarCambios() {
    fetch(`${$urlBase}latest?base=${baseMonetaria}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.rates).forEach(moneda => {
            const $cambio = document.createElement('li');
            $cambio.textContent = `${moneda}: ${respuesta.rates[moneda]}`;
            if (Number(respuesta.rates[moneda]) > 1 ) {
                $cambio.classList = 'list-group-item list-group-item-success';
            } else if (Number(respuesta.rates[moneda]) === 1) {
                $cambio.classList = 'list-group-item list-group-item-light';
            } else {
                $cambio.classList = 'list-group-item list-group-item-danger';
            }
            
            $listaCambios.appendChild($cambio);
        })
    })
    .catch(error => console.error("FALLÓ", error));
}

function mostrarSelecciones() {
    $selecciones.classList = '';
}
