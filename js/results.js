var out_flights;
var in_flights;

var out_filters;
var in_filters;

var airline_logos;

var timeout_timer;

var flight_codes = {};

var currencies;

var selected_currency;

var single_flight = false;


$(document).ready(function() {
    $(".no_results").hide();
    $.getJSON("./ejemplo3.json", function(data) {
        out_flights = data["flights"];
        out_filters = data["filters"];
        done_flights();
        done_filters();
    });
    if (!single_flight)
        $.getJSON("./ejemplo4.json", function(data) {
            in_flights = data["flights"];
            in_filters = data["filters"];
            done_flights();
            done_filters();
        });

    timeout_timer = setTimeout(timeout_error, 5000);

    getLogos(function(logos) {
        airline_logos = logos;
        done_flights();
    }, function() {
        timeout_error();
    });

    var get_currancies = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getcurrencies";
    $.getJSON(get_currancies, function(data) {
        currencies = data["currencies"];
        done_flights();
        done_filters();
    });
});

function timeout_error() {
    clearTimeout(timeout_timer);
    $("#results_tickets").hide();

    $('#every').fadeTo(500, 0.2);
    $('#every').css("pointer-events", "none");

    $("#error").removeClass("hidden");
}

function done_flights() {
    var ticket_container = $("#results_tickets");

    if (out_flights == null || (in_flights == null && !single_flight) || airline_logos == null || currencies == null)
        return;

    setCurrenciesSelect();

    clearTimeout(timeout_timer);
    $(".loader_container").hide();

    var at_least_one = false;

    if (single_flight) {
        for (var out_key in out_flights) {
            var out_flight = out_flights[out_key];

            // Copy a blanck ticket
            var hidden_ticket = ticket_container.find("#hidden_ticket");
            var new_ticket = hidden_ticket.clone();
            new_ticket.removeClass("hidden");
            new_ticket.attr("id", "");
            ticket_container.append(new_ticket);

            var ticket_from = new_ticket.find(".ticket_from");
            fill_half_ticket(out_flight, ticket_from);

            var ticket_to = new_ticket.find(".ticket_to");
            ticket_to.remove();

            fill_price_list(out_flight, null, new_ticket);

            at_least_one = true;

        }
    } else {
        for (var out_key in out_flights) {
            var out_flight = out_flights[out_key];
            for (var in_key in in_flights) {
                var in_flight = in_flights[in_key];

                // Copy a blanck ticket
                var hidden_ticket = ticket_container.find("#hidden_ticket");
                var new_ticket = hidden_ticket.clone();
                new_ticket.removeClass("hidden");
                new_ticket.attr("id", "");
                ticket_container.append(new_ticket);

                var ticket_from = new_ticket.find(".ticket_from");
                fill_half_ticket(out_flight, ticket_from);

                var ticket_to = new_ticket.find(".ticket_to");
                fill_half_ticket(in_flight, ticket_to);

                fill_price_list(out_flight, in_flight, new_ticket);

                at_least_one = true;
            }
        }
    }
    if (at_least_one) {
        $(".no_results").hide();
    } else {
        $(".no_results").show();
    }


    setDurationSlider();
    setFlightFilter();
}

function fill_price_list(out_flight, in_flight, ticket) {
    var out_flight_price = out_flight["price"];
    var out_total_list = out_flight_price["total"];
    var out_total_value = out_total_list["total"];

    var in_total_value = 0;
    if (!single_flight) {
        var in_flight_price = in_flight["price"];
        var in_total_list = in_flight_price["total"];
        in_total_value = in_total_list["total"];
    }


    total_flight_cost = toMoneyString(in_total_value + out_total_value);

    var total_div = ticket.find(".total_price");
    total_div.text(total_flight_cost);
    total_div.attr("data", in_total_value + out_total_value);


    // Per adult
    if (out_flight_price["adults"] != null) {
        var out_per_adult = out_flight_price["adults"]["base_fare"];
        var in_per_adult = 0;
        if (!single_flight)
            in_per_adult = in_flight_price["adults"]["base_fare"];

        var per_adult_div = ticket.find(".per_adult");
        per_adult_div.text(toMoneyString(in_per_adult + out_per_adult));
        per_adult_div.attr("data", in_per_adult + out_per_adult);
    }


    // Total adults
    if (out_flight_price["adults"] != null) {
        var out_total_adults = out_flight_price["adults"]["base_fare"];
        var in_total_adults = 0;
        var quantity_adults_in = 0;
        if (!single_flight) {
            in_total_adults = in_flight_price["adults"]["base_fare"];
            quantity_adults_in = in_flight_price["adults"]["quantity"];
        }

        var quantity_adults_out = out_flight_price["adults"]["quantity"];
        var total_adults_div = ticket.find(".total_adults");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
        total_adults_div.attr("data", in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out);
    }

    // Total children
    if (out_flight_price["children"] != null) {
        var out_total_adults = out_flight_price["children"]["base_fare"];
        var quantity_adults_out = out_flight_price["children"]["quantity"];
        var in_total_adults = 0;
        var quantity_adults_in = 0;
        if (!single_flight) {
            in_total_adults = in_flight_price["children"]["base_fare"];
            quantity_adults_in = in_flight_price["children"]["quantity"];
        }

        var total_adults_div = ticket.find(".total_minors");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
        total_adults_div.attr("data", in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out);
    } else {
        var total_adults_div = ticket.find(".total_minors");
        total_adults_div.text(toMoneyString(0));
        total_adults_div.attr("data", 0);
    }

    // Total infant
    if (out_flight_price["infants"] != null) {
        var out_total_adults = out_flight_price["infants"]["base_fare"];
        var quantity_adults_out = out_flight_price["infants"]["quantity"];
        var in_total_adults = 0;
        var quantity_adults_in = 0;
        if (!single_flight) {
            in_total_adults = in_flight_price["infants"]["base_fare"];
            quantity_adults_in = in_flight_price["infants"]["quantity"];
        }
        var total_adults_div = ticket.find(".total_infants");
        total_adults_div.text(toMoneyString(in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out));
        total_adults_div.attr("data", in_total_adults * quantity_adults_in + out_total_adults * quantity_adults_out);
    } else {
        var total_adults_div = ticket.find(".total_infants");
        total_adults_div.text(toMoneyString(0));
        total_adults_div.attr("data", 0);
    }

    // Charges and taxes
    var taxes_div = ticket.find(".taxes_charges");
    var taxes_in = 0;
    var charges_in = 0;
    if (!single_flight) {
        taxes_in = in_total_list["taxes"];
        charges_in = in_total_list["charges"];
    }
    var taxes_out = out_total_list["taxes"];
    var charges_out = out_total_list["charges"];
    taxes_div.text(toMoneyString(taxes_in + charges_in + taxes_out + charges_out));
    taxes_div.attr("data", taxes_in + charges_in + taxes_out + charges_out);
}

var min_dur = Infinity;
var max_dur = -Infinity;

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
    var total_time_split = parseInt(total_time.split(':')[0], 10);
    total_time_div.text("Total: " + total_time_split + "hs");
    total_time_div.attr("data", total_time_split);
    if (total_time_split < min_dur)
        min_dur = total_time_split;
    if (total_time_split > max_dur)
        max_dur = total_time_split;

    // Flight number
    var flight_number = seg["number"];
    var airline = seg["airline"];
    var airline_id = airline["id"];
    var airline_name = airline["name"];
    var readable_flight_number = airline_id + "" + flight_number;
    flight_codes[readable_flight_number] = true;

    var flight_number_div = parent.find(".flight_number");
    flight_number_div.text("Vuelo: " + readable_flight_number);

    var ticket_airline_logo_container = parent.find(".ticket_airline_logo_container");
    ticket_airline_logo_container.attr("data", airline_id);

    var logo_img_elem = parent.find(".ticket_airline_logo");
    logo_img_elem.attr("src", airline_logos[airline_id]);

    var airline_name_div = parent.find(".ticket_airline_name");
    airline_name_div.text(airline_name);

}

function toMoneyString(number) {
    if (selected_currency == null) {
        defaultCurrency();
    }
    var moneyFormat = wNumb({
        mark: ',',
        thousand: '.',
        suffix: ' ' + selected_currency["symbol"],
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


function done_filters() {


    if (in_filters == null || out_filters == null || currencies == null)
        return;

    var price_filters = out_filters[2];
    var price_min = price_filters["min"];
    var price_max = price_filters["max"];

    if (!single_flight) {
        price_filters = in_filters[2];
        price_min = price_min + price_filters["min"];
        price_max = price_max + price_filters["max"];
    }
    createPriceSlider(price_min, price_max);

}
var ignored = 0;

function filter() {

    ignored++;
    if (ignored < 3)
        return;
    var at_least_one = false;
    $('.ticket').each(function(i, obj) {

        if (filter_by_price(obj) && filter_by_duration(obj) && filter_by_airline(obj)) {
            $(obj).show(300);
            at_least_one = true;
        } else {
            $(obj).hide(300);
        }
    });

    if (at_least_one) {
        $(".no_results").hide();
    } else {
        $(".no_results").show();
    }

}



function filter_by_price(obj) {
    var max = price_slider_max;
    var min = price_slider_min;

    max = parseInt(max, 10);
    min = parseInt(min, 10);


    var total = $(obj).find(".total_price").attr("data");
    total = parseInt(total, 10);
    //console.log(max + " > " + total + " >" + min);
    if (total >= min && total <= max) {
        //console.log("show" + i);
        return true;
    } else {
        //console.log("hide" + i);
        return false;
    }


}


function filter_by_duration(obj) {
    var max = duration_range_max;
    var min = duration_range_min;

    max = parseInt(max, 10);
    min = parseInt(min, 10);

    var total_times = $(obj).find(".total_time");
    var totaltime = total_times[0];
    var total = $(totaltime).attr("data")
    total = parseInt(total, 10);


    if (total >= min && total <= max) {
        if (!single_flight) {
            var totaltime2 = total_times[1];
            var total2 = $(totaltime2).attr("data");
            total2 = parseInt(total2, 10);
            if (total2 >= min && total2 <= max) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

$("#remove_airlines").on("click", function() {
    $("#airlines_select").val(null).trigger("change");
});

function filter_by_airline(obj) {
    var selected = $("#airlines_select").val();
    if (selected == "" || selected == null)
        return true;


    var divs = $(obj).find(".ticket_airline_logo_container");
    if (!single_flight) {
        if ($(divs[0]).attr("data") == selected && $(divs[1]).attr("data") == selected) {
            return true;
        } else {
            return false;
        }
    } else {
        if ($(divs[0]).attr("data") == selected) {
            return true;
        } else {
            return false;
        }
    }


}

function changedCurrency() {
    $('.ticket').each(function(i, obj) {
        var to_change = [];
        to_change.push($(obj).find(".per_adult"));
        to_change.push($(obj).find(".total_adults"));
        to_change.push($(obj).find(".total_infants"));
        to_change.push($(obj).find(".total_minors"));
        to_change.push($(obj).find(".taxes_charges"));
        to_change.push($(obj).find(".total_price"));

        for (div of to_change) {
            var x = $(div).attr("data");
            x = x / selected_currency.ratio;
            $(div).text(toMoneyString(parseInt(x, 10)));
        }
    });

    price_slider.noUiSlider.on("update", function() {});
}

var ignored3 = 0;
$("#currency").on("change", function() {
    ignored3++;
    if (ignored3 < 2)
        return;

    for (currency of currencies) {
        if (currency.id == $("#currency").val()) {
            selected_currency = currency;
        }
    }
    changedCurrency();
})

function defaultCurrency() {
    for (currency of currencies) {
        if (currency.id == "USD") {
            selected_currency = currency;
        }
    }
}

function setCurrenciesSelect() {
    if (currencies == null)
        return;
    for (currency of currencies) {
        var option = "<option value = '" + currency.id + "' " + ((currency.id == "USD") ?
            "selected" : "") + ">" + currency.description + " - " + currency.symbol + "</option>";
        $("#currency").append(option);
    }
    $("#currency").trigger("change");

}

var price_slider;
var price_slider_max;
var price_slider_min;

function createPriceSlider(min, max) {

    if (price_slider != undefined)
        return;

    price_slider_max = max;
    price_slider_min = min;
    price_slider = document.getElementById("price_range");
    noUiSlider.create(price_slider, {
        start: [min, max],
        connect: true,
        margin: parseInt(max / 100, 10),
        range: {
            'min': [min, 1],
            'max': max
        }
    });
    defaultCurrency();
    price_slider.noUiSlider.on('update', function(values, handle) {
        console.log(selected_currency);
        $("#price-slider-values").html("Min: " + toMoneyString(Math.floor(values[0] / selected_currency.ratio)) + ", max: " + toMoneyString(Math.floor(values[1] / selected_currency.ratio)));
        price_slider_min = values[0];
        price_slider_max = values[1];
        filter();
    });
}
var duration_range = undefined;
var duration_range_max = 0;
var duration_range_min = 0;

function setDurationSlider() {

    if (duration_range != undefined)
        return;
    // min_dur = max_dur;
    duration_range_max = max_dur;
    duration_range_min = min_dur;

    min_dur = parseInt(min_dur, 10);
    max_dur = parseInt(max_dur, 10);

    if (max_dur == min_dur) {
        $(".duration_range_container").hide();
        return;
    }

    duration_range = document.getElementById('duration_range');

    noUiSlider.create(duration_range, {
        start: [min_dur, max_dur],
        connect: true,
        margin: 1,
        range: {
            'min': [min_dur, 1],
            'max': max_dur
        }
    });

    duration_range.noUiSlider.on('update', function(values, handle) {
        $("#duration-slider-values").html("Min: " + Math.floor(values[0]) + "hs, max: " + Math.floor(values[1]) + "hs");
        duration_range_min = values[0];
        duration_range_max = values[1];
        filter();
    });
}

$("#airlines_select").on("change", function() {
    // console.log($("#airlines_select").val());
    filter();
})

function setFlightFilter() {
    for (var key in flight_codes) {
        var option = "<option value='" + key + "'>" + key + "</option>";
        $("#flight_number").append(option);
    }
}


// UI Element set up

$(".js-example-basic-single").select2();
