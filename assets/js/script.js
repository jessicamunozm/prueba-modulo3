$(document).ready(function () {
// INICIO CON TODAS LAS CLASES HIDE OCULTAS (NOMBRE, IMG, CARD,)
$(".hide").hide();

$("#boton").click(function (validar) {
// QUITAR DEFAULT DE BOTÓN QUE ENVÍA INFO Y ACTUALIZA PÁGINA
validar.preventDefault();

// .val PARA CAPTURAR VALOR Y .trim PARA QUE NO CONSIDERE ESPACIOS AL PRINCIPIO NI AL FINAL
let inputValue = $("#input").val().trim();
// SI EL VALOR DEL INPUT ES VACÍO O UN NÚMERO MAYOR A 733 MUESTA MENSAJE DE ERROR Y OCULTA CARD, IMAGEN Y NOMBRE
if (inputValue === "" || parseInt(inputValue) >=733 || parseInt(inputValue) <=0) {
$("#error").text("debes ingresar un número válido, entre 1 y 732");
$(".hide").hide();
// SI EL VALUE DEL INPUT ES VÁLIDO, ENTONCES NO HABRÍA MENSAJE DE ERROR, ENTONCES MOSTRAR RESULTADO DE LA BÚSQUEDA
} else { 
$("#error").text("");
// TESTEADO CON console.log(inputValue) CAPTURANDO VALOR OK 
$(".hide").show();


$.ajax({
url: `https://superheroapi.com/api.php/3525635500807579/${inputValue}`,
type: "GET",
dataType: "json",
success: function (resultado) {
// TESTEADO CON console.log(resultado) CAPTURANDO VALOR Y MOSTRANDO INFO OK

// PARA MOSTRAR IMAGEN EN ETIQUETA IMG // .attr TRAE EL VALOR DE UN ATRIBUTO DEL PRIMER ELEMENTO QUE 
// COINCIDA CON LA BÚSQUEDA, DEFINO QUE EL RESULTADO DE LA BÚSQUEDA DE LA IMAGEN, QUE ES UNA URL, 
// SE INSERTE EN LA SOURCE DE LA ETIQUETA. FUNCIONA OK
$("#imgHero").attr("src", resultado.image.url);

// INSERTO NOMBRE DEL HEROE DE LA BÚSQUEDA EN ETIQUETA
$("#nombre").html(resultado.name);

// PARA ACCEDER A GROUP-AFFILIATION SE HACE CON [] PORQUE EL NOMBRE ESTÁ CON (-)
$("#conexiones").html(`<li>Conexiones: ${resultado.connections["group-affiliation"]}</li>`);
$("#publicadoPor").html(`<li>Publicado por: ${resultado.biography.publisher}</li>`);
$("#ocupacion").html(`<li>Ocupación: ${resultado.work.occupation}</li>`);
$("#firstApp").html(`<li>Primera aparición: ${resultado.biography["first-appearance"]}</li>`);

// ALTURA EN PULGADAS Y CM Y PESO EN LIBRAS Y KG SE SEPARAN CON -, PERO SE SELECCIONAN CON SU ÍNDICE
$("#altura").html(`<li>Altura: ${resultado.appearance.height[0]} - ${resultado.appearance.height[1]}`);
$("#peso").html(`<li>Peso: ${resultado.appearance.weight[0]} - ${resultado.appearance.weight[1]}`);
$("#alianzas").html(`<li>Alianzas: ${resultado.biography.aliases}`);

let alianzasHTML = "<li>Alianzas: ";
for (let i = 0; i < resultado.biography.aliases.length; i++) {
    alianzasHTML += resultado.biography.aliases[i];
    if (i < resultado.biography.aliases.length - 1) {
        alianzasHTML += ", ";
    }
}
alianzasHTML += "</li>";
$("#alianzas").html(alianzasHTML);

// GRAFICO CANVASJS
    let chart = new CanvasJS.Chart("chartContainer", {
        
        legend: {
        fontColor: "#000000",
        fontFamily: "quicksand",
        
        },
        credits: null,
        backgroundColor: "transparent",
        exportEnabled: false,
        animationEnabled: false,
        
        title: {
            text: `Estadísticas de poder para ${resultado.name}`,
            fontColor: "#000000",
            fontSize: 35,
            fontFamily: "quicksand",
        
        },
        data: [{
            
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabelFontColor: "#000000",
            indexLabelFontWeight: "bold",
            indexLabelFontFamily: "quicksand",
            indexLabel: "{label} - {y}%",
            dataPointsFontColor: "#000000",
            dataPoints: [
                { y: resultado.powerstats.power, label: "power", color: "#e20004" },
                { y: resultado.powerstats.combat, label: "combat", color: "#f4f300"},
                { y: resultado.powerstats.intelligence, label: "intelligence", color: "#000000"},
                { y: resultado.powerstats.strength, label: "strength", color: "#29a8df"},
                { y: resultado.powerstats.speed, label: "speed", color: "#099308"},
                { y: resultado.powerstats.durability, label: "durability", color: "#0000FF"},
            ]
             
        }] 
    }); 
   
    chart.render();
},
});
}
});
});