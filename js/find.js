$("#inputs").hide();
$(".js-example-basic-single").select2({
    placeholder: "Seleccione una ciudad"
});
$('.datepicker').on('changeDate', function(ev){
    $(this).datepicker('hide');
});
fillCitySelects(function() {
    console.log("Fill selects done.");
    $(".loader_container_index").hide();
    $("#inputs").show();
}, function () {
    console.log("Fill selects error."); //<<<<<ACA ES ERROR DE SERVIDORRRR
    $(".loader_container_index").hide();
    display_modal("Error", "Error de comunicacion con el servidor. Por favor, intente de nuevo mas tarde.");
});

$(document).ready(function () {
    $("#tipovuelo").on("change", function () {
        if ($("#tipovuelo").val() == "2") {
            twoWay();
        }else{
            oneWay();
        }
    });
});

function find() {
    var mayores = clicks_1;
    var menores = clicks_2;
    var infantes = clicks_3;


    var tipovuelo = $("#tipovuelo").val(); // 1-> IDA



    sessionStorage.removeItem("map");
    sessionStorage.removeItem("map2");



    var sel_adu = clicks_1;
    var sel_chi = clicks_2;
    var sel_inf = clicks_3;

    var from_city = $("#cities-from").val();
    var to_city = $("#cities-to").val();

    var date_salida = moment($("#salida").val(), "DD/MM/YYYY");


    if (sel_adu == 0 && sel_chi == 0 && sel_inf == 0) {
        display_modal("Error", "Debe seleccionar mas de un pasajero.");
        return;
    }

    if (from_city == to_city) {
        display_modal("Error", "El aeropuerto de origen tiene que ser distinto al de destino.");
        return;
    }

    if (!date_salida.isValid()) {
        display_modal("Error", "Debe completar la fecha de partida correctamente.");
        return;
    }

    var correct_date_salida = date_salida.format("YYYY-M-D");

    var url1 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&page_size=100000&from=" + from_city + "&to=" + to_city + "&dep_date=" + correct_date_salida + "&adults=" + sel_adu + "&children=" + sel_chi + "&infants=" + sel_inf;
    sessionStorage.setItem("map", url1);
    if ($("#tipovuelo").val() == "2") {

        var date_vuelta = moment($("#vuelta").val(), "DD/MM/YYYY");;
        var correct_date_vuelta = date_vuelta.format("YYYY-M-D");

        if (!date_vuelta.isValid()) {
            display_modal("Error", "Debe completar la fecha de vuelta correctamente.");
            return;
        }

        if (date_salida.isAfter(date_vuelta)) {
            display_modal("Error", "La fecha de vuelta tiene que ser anterior a la fecha de vuelta.");
            return;
        }
        var url2 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&page_size=100000&from=" + to_city + "&to=" + from_city + "&dep_date=" + correct_date_vuelta + "&adults=" + sel_adu + "&children=" + sel_chi + "&infants=" + sel_inf;
        sessionStorage.setItem("map2", url2);
    } else {
        sessionStorage.removeItem("map2");
    }

    window.location.href = "results.html";
}

function display_modal(title, subtitle) {
    var title_div = $("#error_modal").find(".modal-title");
    var subtitle_div = $("#error_modal").find(".bar_subtitle");
    title_div.text(title);
    subtitle_div.text(subtitle);
    $("#error_modal").modal();
}

function oneWay() {
    $("#soloIda").hide();
}

function twoWay() {
    $("#soloIda").show();
}
