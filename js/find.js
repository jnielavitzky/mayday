function find() {
    var mayores = clicks_1;
    var menores = clicks_2;
    var infantes = clicks_3;
    var salida = $("#salida").val();
    var vuelta = $("#vuelta").val();
    var desde = $("#cities-from").val();
    var hacia = $("#cities-to").val();
    var tipovuelo = $("#tipovuelo").val();

    console.log(desde);
    console.log(hacia);
}



function oneWay() {
    $("#soloIda").hide();
}

function twoWay() {
    $("#soloIda").show();
}
