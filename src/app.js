/// <reference types="jquery" />

// Hacerlo todo en funciones!!! e ir paso a paso. Agregar RegEx y validaciones de formulario.

const $titulo = $('h1');
const $seleccionarMoneda = $('#seleccionar-moneda');

obtenerMonedas();




function obtenerMonedas () {
    fetch('https://v6.exchangerate-api.com/v6/72ef1475c41a5e123d263411/codes')
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        $('#opciones-monedas').html('');
        Object.keys(respuesta.supported_codes).forEach(moneda => {
            $("#opciones-monedas").append($(`<option value="${respuesta.supported_codes[moneda]}">${respuesta.supported_codes[moneda]}</option>`));
        })
        console.log(respuesta.supported_codes);
    })
};



// function agregarOpciones() {
//     totalCurrencies.forEach(function (e) {
//       let newOption = document.createElement("option");
  
//       newOption.textContent = e;
//       newOption.value = e;
//       $initialSelector.appendChild(newOption);
//       $finalSelector.appendChild(newOption.cloneNode(true));
//     });
//   }

// fetch('https://v6.exchangerate-api.com/v6/72ef1475c41a5e123d263411/latest/USD')
// .then(respuesta => respuesta.json())
// .then(respuestaJSON => {
//     $('#bases').html('');
//     Object.keys(respuestaJSON.conversion_rates).forEach(moneda => {
//         $("#bases").append($(`<option value="${moneda}">${moneda}</option>`));
//     })

    
//     $seleccionarMoneda.onclick = () => {
//         exchangeBase = $('#bases').text;
//         console.log(exchangeBase);
//         onsubmit.preventDefault()
//     }

//     $("#base-monetaria").html('').text(`Moneda base: ${respuestaJSON.base_code}`);
//     return exchangeBase;
// });

// fetch('https://v6.exchangerate-api.com/v6/72ef1475c41a5e123d263411/latest/' + exchangeBase)
// .then(respuesta => respuesta.json())
// .then(respuestaJSON => {
//     $titulo.text(`Los rates al dia ${respuestaJSON.time_last_update_utc}:`);
//     console.log(respuestaJSON);

//     $("ul").html('');
//     Object.keys(respuestaJSON.conversion_rates).forEach(moneda => {
//       $("ul").append($(`<li>${moneda}: ${respuestaJSON.conversion_rates[moneda]}</li>`));
//     });
// })
// .catch(error => console.error("FALLÓ", error));


