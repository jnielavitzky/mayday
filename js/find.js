function find() {
    var mayores = clicks_1;
    var menores = clicks_2;
    var infantes = clicks_3;
    var salida = $("#salida").val();
    var vuelta = $("#vuelta").val();
    var desde = $("#cities-from").val();
    var hacia = $("#cities-to").val();
    var tipovuelo = $("#tipovuelo").val(); // 1-> IDA

    var salidaM = moment(salida);
    salida = salidaM.format("YYYY-M-D");
    console.log(salida);
    var vueltaM = moment(vuelta);
    vuelta = vueltaM.format("YYYY-M-D");
    console.log(vuelta);

    // Si queres ahora fijarte que las fechas son validas podes hacer vueltaM.isAfter(salidaM)


    var url = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + desde + "&to=" + hacia + "&dep_date=" + salida + "&adults=" + mayores + "&children=" + menores + "&infants=" + infantes;
    console.log(url);
    $.getJSON(url, function(json) {
        sessionStorage.setItem("map", json);
    });

    if (tipovuelo == 2) {
        var url2 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + hacia + "&to=" + desde + "&dep_date=" + vuelta + "&adults=" + mayores + "&children=" + menores + "&infants=" + infantes;
        $.getJSON(url2, function(json2) {
            sessionStorage.setItem("map2", json2);
        });
        var map = sessionStorage.getItem("map");
        // map = JSON.parse(map);
        // console.log(map["error"]);
    }
}

function oneWay() {
    $("#soloIda").hide();
}

function twoWay() {
    $("#soloIda").show();
}
