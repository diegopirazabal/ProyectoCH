const toque1 = {id: 0, banda: "No Te Va Gustar", fecha: "28/12"}
localStorage.setItem("toque1", JSON.stringify(toque1))

const toque2 = {id: 1, banda: "Cuarteto de Nos", fecha: "04/01"}
localStorage.setItem("toque2", JSON.stringify(toque2))

var titulo = document.getElementById('titulo')
titulo.innerHTML = 'Tickets para ' + toque1.banda

var adultos = document.getElementById('numAdultos');
var menores = document.getElementById('numMenores');
var ninios = document.getElementById('numNinios');
var submitBtn = document.getElementById('submitButton');
var output = document.getElementById('total');


function guardarNombre(nombre){
    localStorage.setItem('comprador', document.getElementById('nombre').value); 
}


function calcPrice(qty, price){
  return qty * price;
}


function respuesta(qty, total){
  var compradores =  localStorage.getItem('comprador')
  var artista = localStorage.getItem('toque1')
  artista = JSON.parse(artista)
  return output.innerHTML = compradores + ' Compraste ' + qty + ' ticket(s) para ' + artista.banda + ' por un valor de $' + total + '<br><br>';
}

submitBtn.addEventListener('click', function() { 
    
    guardarNombre();
 if(adultos.value === '0' && menores.value === '0'  && ninios.value === '0'){
   alert('Porfavor seleccione al menos una unidad');
 } else {
   var totalAdultos = calcPrice(adultos.value, 199);
   var totalNinios = calcPrice(menores.value, 149);

   var totalPrecio = totalAdultos + totalNinios;
   var totalTickets = parseInt(adultos.value) + parseInt(menores.value) + parseInt(ninios.value);

   respuesta(totalTickets, totalPrecio);
 }

});