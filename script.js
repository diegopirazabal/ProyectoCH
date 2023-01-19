let titulo = document.getElementById("titulo");
// Hago el fetch para traer la informacion de la banda y la inserto en el Titulo
fetch("bandas.json")
  .then((response) => response.json())
  .then((data) => (titulo.innerHTML = "Tickets para " + data[0].banda));

// Seteo todas las variables globales a utilizar
let stock = 200;
let adultos = document.getElementById("numAdultos");
let menores = document.getElementById("numMenores");
let ninios = document.getElementById("numNinios");
let submitBtn = document.getElementById("submitButton");
let output = document.getElementById("total");
let loadingBar = document.getElementById("barraCarga");


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
    console.log(
      "stock: " +
        stock +
        " diferencia = " +
        diferencia +
        " cantidad = " +
        cantidad
    );
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
// Output
function respuesta(qty, total) {
  let compradores = localStorage.getItem("comprador");
  let artista = localStorage.getItem("toque1");
  let data = localStorage.getItem("data");
  artista = JSON.parse(artista);
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
    " Ticket(s) de Ninio ($0) - Total: $" +
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
    let vendible = 0;
    revisarStock(stock, vendidas).then((response) => {
      vendible = response;
    });
    setTimeout(() => {
      if (vendible == 1) {
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
        alert(
          "Lamentablemente no hay tickets suficientes. Quedan: " +
            stock +
            " E intentaste comprar: " +
            vendidas
        );
      }
    }, 1300);
  }
});
