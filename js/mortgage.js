// defino los codigos para los valores de entrada del formulario
function calcularMortgage(e) {
    
    e.preventDefault();

    let cuota = document.forms["fmortgage"]["fcuota"].value;
    let costoTotal = document.forms["fmortgage"]["fvalortotal"].value;
    let interes = document.forms["fmortgage"]["finteres"].value;
    let plazoanio = document.forms["fmortgage"]["fplazo"].value;
    // comenzamos a definir los valores de salida
    const MONTHS_ON_YEAR = 12;

    const mortgage = {
        costoTotalInmueble: 0,
        totalPrestamo: 0,
        totalInteres: 0,
        cuotaMensual: 0
    };
    mortgage.costoTotalInmueble = costoTotal;
    mortgage.totalPrestamo = costoTotal - cuota;
    mortgage.totalInteres = mortgage.totalPrestamo * interes / 100;
    mortgage.cuotaMensual = (mortgage.totalPrestamo + mortgage.totalInteres) / (plazoanio * MONTHS_ON_YEAR);
    ouputMortgage(mortgage);
}
function ouputMortgage(finalmortgage) {
    document.getElementById("omontodesalida").innerHTML = valorDolar(finalmortgage.totalPrestamo);
    document.getElementById("ocuota").innerHTML =  valorDolar(finalmortgage.cuotaMensual);   
    var totalPrestamoPorcentaje = 0;
    totalPrestamoPorcentaje = finalmortgage.totalPrestamo * 100 / finalmortgage.costoTotalInmueble;
    alert(totalPrestamoPorcentaje);

    //<output id="omontodesalida" class="form-control">0</output>

    if (totalPrestamoPorcentaje > 90) {
        document.getElementById("omontodesalida").className += " alertaPorcentaje";
    }
}
// reiniciar formulario
function resetfrom() {
    document.forms["fmortgage"].reset();
}
function valorDolar(valor) {  // Intl appi del navegador para formatear dolares EEUU. va a depender de que pais quieras formatear
    const dolarFormatter = new Intl.NumberFormat("en-US", {style:'currency',currency:'USD',minimumFractionDigits:2});
    return dolarFormatter.format(valor);
}