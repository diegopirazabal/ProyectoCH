// Hago el fetch para traer la informacion de la banda y la inserto en el Titulo

// Seteo todas las variables globales a utilizar
let stock = 200;
let titulo = document.getElementById("titulo");
let adultos = document.getElementById("numAdultos");
let menores = document.getElementById("numMenores");
let ninios = document.getElementById("numNinios");
let submitBtn = document.getElementById("submitButton");
let output = document.getElementById("total");
let loadingBar = document.getElementById("barraCarga");
let buitres = document.getElementById("bui");
let cuarteto = document.getElementById("cds");
let ntvg = document.getElementById("ntvg");
let artista = "";

// Titulo
titulo.innerHTML = "Bienvenido, para comprar tickets selecciona un artista";
// //Eleccion de artista

ntvg.addEventListener("click", async () => {
  const resp = await fetch("bandas.json");
  const data = await resp.json();
  titulo.innerHTML = "Tickets para " + data[0].banda;
  localStorage.setItem("artista", data[0].banda);
});

cuarteto.addEventListener("click", async () => {
  const resp = await fetch("bandas.json");
  const data = await resp.json();
  titulo.innerHTML = "Tickets para " + data[1].banda;
  localStorage.setItem("artista", data[1].banda);
});

buitres.addEventListener("click", async () => {
  const resp = await fetch("bandas.json");
  const data = await resp.json();
  titulo.innerHTML = "Tickets para " + data[2].banda;
  localStorage.setItem("artista", data[2].banda);
});

// ---------------- Codigo Funcional Descartado ---------------- //
// ntvg.addEventListener("click", async function getData() {
//   try {
//     const response = await fetch('bandas.json');
//     const data = await response.json();
//     titulo.innerHTML = "Tickets para " + data[0].banda
//   } catch (error) {
//     console.log(error);
//   }
// })
// ------------------------------------------------------------- //

// Funcion que almacena el nombre ingresado por el usuario en el LocalStorage
function guardarNombre(nombre) {
  localStorage.setItem("comprador", document.getElementById("nombre").value);
}
// Funcion que calcula el precio final
function calcPrice(qty, price) {
  return qty * price;
}
// Promesa que revisa la disponibilidad de tickets
function revisarStock(stock, cantidad) {
  return new Promise((resolve, reject) => {
    let diferencia = stock - cantidad;
    setTimeout(() => {
      if (diferencia >= 0) {
        stock = diferencia;
        resolve(1);
        clearTimeout();
      } else {
        reject(0);
      }
    }, 1000);
  });
}
function calcular(cantidad) {
  return stock >= cantidad;
}

function revisarStock(vendidas) {
  return calcular(vendidas);
}

// Otros ejemplos de funciones de alto rango, sin embargo estos devolvian "(stock) => stock >= cantidad;" en vez del esperado "true" o "false"

// function revisarStock(cantidad) {
//   return (stock) => stock >= cantidad;
// }
// function revisarStock(cantidad) {
//   return function calc(stock) { return stock >= cantidad };
// }

// Output
function respuesta(qty, total) {
  let compradores = localStorage.getItem("comprador");
  let artista = localStorage.getItem("artista");
  let data = localStorage.getItem("data");
  data = JSON.parse(data);
  return (output.innerHTML =
    compradores +
    " compraste " +
    data.adulto +
    " Ticket(s) de adulto ($" +
    data.adulto * 199 +
    "). " +
    data.menor +
    " Ticket(s) de menor ($" +
    data.menor * 149 +
    "). " +
    data.ninio +
    " Ticket(s) de Ninio ($0) para el toque de: " +
    artista +
    " - Total: $" +
    total);
}
// Listener del boton de compra, Llama a las funciones indicadas para generar la salida correspondiente.
submitBtn.addEventListener("click", function () {
  guardarNombre();
  if (adultos.value === "0" && menores.value === "0" && ninios.value === "0") {
    alert("Porfavor seleccione al menos una unidad");
  } else {
    let totalAdultos = calcPrice(adultos.value, 199);
    let totalNinios = calcPrice(menores.value, 149);
    let vendidas =
      parseInt(adultos.value) +
      parseInt(menores.value) +
      parseInt(ninios.value);
    let totalPrecio = totalAdultos + totalNinios;
    let totalTickets =
      parseInt(adultos.value) +
      parseInt(menores.value) +
      parseInt(ninios.value);
    let vendible;
    vendible = revisarStock(vendidas);
    setTimeout(() => {
      if (vendible) {
        stock = stock - vendidas;
        let compra = {
          adulto: adultos.value,
          menor: menores.value,
          ninio: ninios.value,
        };
        localStorage.setItem("data", JSON.stringify(compra));
        loadingBar.classList.remove("lv-hide");
        setTimeout(() => {
          loadingBar.classList.add("lv-hide");
          respuesta(totalTickets, totalPrecio);
        }, 2000);
      } else {
        let comprador = localStorage.getItem("comprador");
        Swal.fire(
          "Error",
          comprador +
            ", lamentablemente no hay tickets suficientes. Quedan: " +
            stock +
            ", e intentaste comprar: " +
            vendidas,
          "error"
        );
      }
    }, 1300);
  }
});
