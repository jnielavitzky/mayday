var out_flights;
var in_flights;

var timeout_timer;
// Data parce and show

$(document).ready(function() {
    $.getJSON("./ejemplo3.json", function(data) {
        out_flights = data["flights"];
        done_flights();
    });
    $.getJSON("./ejemplo4.json", function(data) {
        in_flights = data["flights"];
        setTimeout(function() {
            done_flights();
        }, 000);
    });
    timeout_timer = setTimeout(timeout, 5000);
});

function timeout() {
    $("#results_tickets").hide();

    $('#page').fadeTo(500, 0.2);
    $('#page').css("pointer-events", "none");

    $("#error").removeClass("hidden");
}

function done_flights() {
    var ticket_container = $("#results_tickets");

    if (out_flights == null || in_flights == null)
        return;

    clearTimeout(timeout_timer);
    $(".loader_container").hide();

    for (var out_key in out_flights) {
        var out_flight = out_flights[out_key];
        for (var in_key in in_flights) {
            var in_flight = in_flights[in_key];

            // Copy a blanck ticket
            var hidden_ticket = ticket_container.find("#hidden_ticket");
            var new_ticket = hidden_ticket.clone();
            new_ticket.removeClass("hidden");
            ticket_container.append(new_ticket);

            var ticket_from = new_ticket.find(".ticket_from");
            fill_half_ticket(out_flight, ticket_from);

            var ticket_to = new_ticket.find(".ticket_to");
            fill_half_ticket(in_flight, ticket_to);


            fill_price_list(out_flight, in_flight, new_ticket);


        }
    }
}

function fill_price_list(out_flight, in_flight, ticket) {
    var out_flight_price = out_flight["price"];
    var out_total_list = out_flight_price["total"];
    var out_total_value = out_total_list["total"];

    var in_flight_price = in_flight["price"];
    var in_total_list = in_flight_price["total"];
    var in_total_value = in_total_list["total"];

    total_flight_cost = toMoneyString(in_total_value + out_total_value);

    var total_div = ticket.find(".total_price");
    total_div.text(total_flight_cost);


    // Per adult
    if (out_flight_price["adults"] != null && in_flight_price["adults"] != null) {
        var out_per_adult = out_flight_price["adults"]["base_fare"];
        var in_per_adult = in_flight_price["adults"]["base_fare"];
        var per_adult_div = ticket.find(".per_adult");
        per_adult_div.text(toMoneyString(in_per_adult + out_per_adult));
    }


    // Total adults
    if (out_flight_price["adults"] != null && in_flight_price["adults"] != null) {
        var out_total_adults = out_flight_price["adults"]["base_fare"];
        var in_total_adults = in_flight_price["adults"]["base_fare"];
        var quantity_adults_out = out_flight_price["adults"]["quantity"];
        var quantity_adults_in = in_flight_price["adults"]["quantity"];
        var total_adults_div = ticket.find(".total_adults");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
    }

    // Total children
    if (out_flight_price["children"] != null && in_flight_price["children"] != null) {
        var out_total_adults = out_flight_price["children"]["base_fare"];
        var in_total_adults = in_flight_price["children"]["base_fare"];
        var quantity_adults_out = out_flight_price["children"]["quantity"];
        var quantity_adults_in = in_flight_price["children"]["quantity"];
        var total_adults_div = ticket.find(".total_minors");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
    }

    // Total infant
    if (out_flight_price["infants"] != null && in_flight_price["infants"] != null) {
        var out_total_adults = out_flight_price["infants"]["base_fare"];
        var in_total_adults = in_flight_price["infants"]["base_fare"];
        var quantity_adults_out = out_flight_price["infants"]["quantity"];
        var quantity_adults_in = in_flight_price["infants"]["quantity"];
        var total_adults_div = ticket.find(".total_infants");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
    }

    // Charges and taxes
    var taxes_div = ticket.find(".taxes_charges");
    var taxes_in = in_total_list["taxes"];
    var charges_in = in_total_list["charges"];
    var taxes_out = out_total_list["taxes"];
    var charges_out = out_total_list["charges"];
    taxes_div.text(toMoneyString(taxes_in + charges_in + taxes_out + charges_out));
}

function fill_half_ticket(flight, parent) {
    //Get out data
    var routes = flight["outbound_routes"];
    var segments = routes[0];
    var segment = segments["segments"];
    var seg = segment[0];
    var arrival = seg["arrival"];
    var departure = seg["departure"];

    var departure_datetime = moment(departure["date"]);
    var arrival_datetime = moment(arrival["date"]);

    // Ticket 1


    // Search for de div of the timedate details
    var ticket_time_details_from = parent.find(".ticket_time_details");

    // Search and set of departure timedate details
    var departure_datetime_details = ticket_time_details_from.find(".departure");
    var departure_date_details = departure_datetime_details.find(".date_departure");
    var departure_time_details = departure_datetime_details.find(".time_departure");
    departure_time_details.text("Salida: " + departure_datetime.format("H:mm") + "hs");
    departure_date_details.text("Fecha: " + departure_datetime.format("DD/MM/YYYY"));

    // Search and set of arrival timedate details
    var arrival_datetime_details = ticket_time_details_from.find(".arrival");
    var arrival_date_details = arrival_datetime_details.find(".date_arrival");
    var arrival_time_details = arrival_datetime_details.find(".time_arrival");
    arrival_time_details.text("Llegada: " + arrival_datetime.format("H:mm") + "hs");
    arrival_date_details.text("Fecha: " + arrival_datetime.format("DD/MM/YYYY"));


    // Search and set of airport name
    var departure_airport = departure["airport"];
    var arrival_airport = arrival["airport"];
    var airport_name_departure_div = parent.find(".airport_departure");
    airport_name_departure_div.text(departure_airport["id"]);
    var airport_name_arrival_div = parent.find(".airport_arrival");
    airport_name_arrival_div.text(arrival_airport["id"]);


    var departure_airport_city = departure_airport["city"];
    var departure_airport_city_div = parent.find(".city_departure");
    departure_airport_city_div.text(shorten_name(departure_airport_city["name"], 25));

    var arrival_airport_city = arrival_airport["city"];
    var arrival_airport_city_div = parent.find(".city_arrival");
    arrival_airport_city_div.text(shorten_name(arrival_airport_city["name"], 20));

    var total_time_div = parent.find(".total_time");
    var total_time = (routes[0])["duration"];
    total_time_div.text("Total: " + total_time.split(':')[0] + "hs");



    // Flight number
    var flight_number = seg["number"];
    var airline = seg["airline"];
    var airline_id = airline["id"];
    var readable_flight_number = airline_id + "" + flight_number;

    var flight_number_div = parent.find(".flight_number");
    flight_number_div.text("Vuelo: " + readable_flight_number);

}

function toMoneyString(number) {
    var moneyFormat = wNumb({
        mark: ',',
        thousand: '.',
        suffix: ' AR$',
        decimals: 2
    });
    return moneyFormat.to(number);
}

function shorten_name(name, l) {
    // return name;
    if (name == null)
        return null;
    if (name.length <= l)
        return name;
    if (name.indexOf(',') != -1)
        return shorten_name(name.split(',')[1], l);
    return name.substring(0, l - 4) + "...";
}

// UI Element set up

$(".js-example-basic-single").select2();

var price_slider = document.getElementById('price_range');

noUiSlider.create(price_slider, {
    start: [5000, 15000],
    connect: true,

    range: {
        'min': [1000, 100],
        'max': 20000
    }
});

price_slider.noUiSlider.on('update', function(values, handle) {
    $("#price-slider-values").html("Min: " + numberWithCommas(Math.floor(values[0])) + ", max: " + numberWithCommas(Math.floor(values[1])));
});

var duration_range = document.getElementById('duration_range');

noUiSlider.create(duration_range, {
    start: [15, 20],
    connect: true,

    range: {
        'min': [10, 1],
        'max': 25
    }
});

duration_range.noUiSlider.on('update', function(values, handle) {
    $("#duration-slider-values").html("Min: " + Math.floor(values[0]) + "hs, max: " + Math.floor(values[1]) + "hs");
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "AR$";
}
