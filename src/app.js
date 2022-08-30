const $seleccionarInputs = document.querySelector('#seleccionar');
const $baseMonetaria = document.querySelector('select');
const $opionesMonedas = document.querySelector('#opciones-monedas');
const $opcionesFechas = document.querySelector('#opciones-fechas');
const $listaCambios = document.querySelector('#lista-cambios');
const $selecciones = document.querySelector('#selecciones');
const $mostrarBase = document.querySelector('p em');
const $mostrarFecha = document.querySelector('h1 em');
const $urlBase = new URL('https://api.exchangerate.host');
let baseMonetaria;
let fechaCambios;

obtenerMonedas();

$seleccionarInputs.onclick = function(event) {
    obtenerBaseMonetaria();
    obtenerFechasCambios();
    resetSeleccion();
    mostrarCambios();
    mostrarSeleccionBase();

    event.preventDefault();
}

function obtenerBaseMonetaria() {
    $mostrarBase.textContent = $baseMonetaria.value;
    baseMonetaria = $baseMonetaria.value;
}

function obtenerFechasCambios() {
    fechaCambios = $opcionesFechas.value;
    $mostrarFecha.textContent = ` del dia ${$opcionesFechas.value}:`
}

function obtenerMonedas() {
    fetch(`${$urlBase}/symbols`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.symbols).forEach(moneda => {
            const $moneda = document.createElement('option');
            $moneda.value = respuesta.symbols[moneda].code;
            $moneda.textContent = `${respuesta.symbols[moneda].code}: ${respuesta.symbols[moneda].description}`;
            $opionesMonedas.appendChild($moneda);
        });
    })
    .catch(error => window.alert("En estos momentos no es posible obtener las Bases Monetarias. Intente nuevamente mas tarde.", error));
};

function mostrarCambios() {
    fetch(`${$urlBase}/${fechaCambios}?base=${baseMonetaria}`)
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
    .catch(error => window.alert("Por favor, seleccione otra fecha y/o moneda.", error));
}

function mostrarSeleccionBase() {
    $selecciones.classList = '';
}

function resetSeleccion() {
    const $seleccionesCambios = document.querySelectorAll('#lista-cambios li');
    $seleccionesCambios.forEach(cambio => {
        $listaCambios.removeChild(cambio);
    });
    $selecciones.classList = 'oculto';
}
