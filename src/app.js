//Agregar RegEx y validaciones de formulario.

const $seleccionarMoneda = document.querySelector('#seleccionar-moneda');
const $baseMonetaria = document.querySelector('select');
const $opionesMonedas = document.querySelector('#opciones-monedas');
const $listaCambios = document.querySelector('#lista-cambios');
const $selecciones = document.querySelector('#selecciones');
const $urlAPI = 'https://v6.exchangerate-api.com/v6/72ef1475c41a5e123d263411/latest/';
let baseMonetaria;

obtenerMonedas();

$seleccionarMoneda.onclick = function(event) {
    const $mostrarBase = document.querySelector('em');
    $mostrarBase.textContent = $baseMonetaria.value;
    baseMonetaria = $baseMonetaria.value;
    mostrarCambios();
    mostrarSelecciones();

    event.preventDefault();
}

function obtenerMonedas() {
    fetch('https://v6.exchangerate-api.com/v6/72ef1475c41a5e123d263411/codes')
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.supported_codes).forEach(moneda => {
            const $moneda = document.createElement('option');
            $moneda.value = respuesta.supported_codes[moneda][0];
            $moneda.textContent = `${respuesta.supported_codes[moneda][0]} ${respuesta.supported_codes[moneda][1]}`;
            $opionesMonedas.appendChild($moneda);
        })
    })
    .catch(error => console.error("FALLÓ", error));
};

function mostrarCambios() {
    fetch(`${$urlAPI}${baseMonetaria}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        Object.keys(respuesta.conversion_rates).forEach(moneda => {
            const $cambio = document.createElement('li');
            $cambio.textContent = `${moneda}: ${respuesta.conversion_rates[moneda]}`;
            if (Number(respuesta.conversion_rates[moneda]) > 1 ) {
                $cambio.classList = 'list-group-item list-group-item-success';
            } else if (Number(respuesta.conversion_rates[moneda]) === 1) {
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
