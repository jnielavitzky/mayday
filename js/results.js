var out_flights;
var in_flights;

var out_filters;
var in_filters;

var airline_logos;

var timeout_timer;

var flight_codes = {};

var currencies;

var selected_currency;

var selected_rating = 1;

var single_flight = false;




$(document).ready(function() {

    $(".no_results").hide();
    $('.datepicker').datepicker({
        format: 'dd/mm/yyyy'
    });

    setRatingStars(function(r) {
        selected_rating = r;
        filter();
    });

    var ida_url = sessionStorage.getItem("map");
    var vuelta_url = sessionStorage.getItem("map2");

    var selected_from;
    var selected_to, selected_adults, selected_children, selected_infants, selected_date_from, selected_date_to;
    selected_from = getUrlParameter(ida_url, "from");
    selected_to = getUrlParameter(ida_url, "to");
    selected_adults = getUrlParameter(ida_url, "adults");
    selected_children = getUrlParameter(ida_url, "children");
    selected_infants = getUrlParameter(ida_url, "infants");
    selected_date_from = getUrlParameter(ida_url, "dep_date"); //"YYYY-M-D"



    $("#select-adults").val(selected_adults);
    $("#select-adults").trigger("change");
    $("#select-children").val(selected_children);
    $("#select-children").trigger("change");
    $("#select-infants").val(selected_infants);
    $("#select-infants").trigger("change");

    fillCitySelects(function() {
        $("#cities-from").val(selected_from);
        $("#cities-to").val(selected_to);
    }, function() {
        timeout_error();
    });

    $("#salida").val(moment(selected_date_from, "YYYY-M-D").format("DD/MM/YYYY"));

    if (vuelta_url == null) {
        single_flight = true;
        $("#flight_type").val(2);
        $("#return_div").hide();
    } else {
        $("#flight_type").val(1);
        selected_date_to = getUrlParameter(vuelta_url, "dep_date"); //"YYYY-M-D"
        $("#vuelta").val(moment(selected_date_to, "YYYY-M-D").format("DD/MM/YYYY"));
    }
    $("#flight_type").trigger("change");
    console.log(ida_url);
    console.log(vuelta_url);




    $.getJSON(ida_url, function(data) {
        out_flights = data["flights"];
        out_filters = data["filters"];
        if (out_flights == null) {
            if (get_error_code(data) == -1)
                no_results();
            else
                error_modal(get_error_code(data));
            return;
        }
        done_flights();
        done_filters();
    }).fail(function() {
        timeout_error();
    });
    if (!single_flight)
        $.getJSON(vuelta_url, function(data) {
            in_flights = data["flights"];
            in_filters = data["filters"];
            if (in_flights == null) {
                if (get_error_code(data) == -1)
                    no_results();
                else
                    error_modal(get_error_code(data));
                return;
            }
            done_flights();
            done_filters();
        }).fail(function() {
            timeout_error();
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

function get_error_code(data) {

    var error = data["error"];
    if (error == null)
        return -1;
    return error["code"];

}

function no_results() {
    $(".no_results").show(300);
    clearTimeout(timeout_timer);
    $(".loader_container").hide();
}

function timeout_error() {
    display_modal("Error de Servidor", "Error de comunicación con el sistema. Por favor, intente de vuelta.");
    clearTimeout(timeout_timer);
    $(".loader_container").hide();
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
        $(".no_results").hide(300);
    } else {
        $(".no_results").show(300);
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

    var departure_datetime = moment(departure["date"], "YYYY-M-D H:mm:ss");
    var arrival_datetime = moment(arrival["date"], "YYYY-M-D H:mm:ss");

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
    total_time_div.text("Total " + ((total_time_split == 0) ? "1" : total_time_split) + "hs");
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
    var airline_rating = airline["rating"];
    var readable_flight_number = airline_id + "" + flight_number;
    flight_codes[readable_flight_number] = true;

    // parent.find(".opinion_num").hide();
    parent.attr("rating", airline_rating);

    var flight_number_div = parent.find(".flight_number");
    flight_number_div.text("Vuelo: " + readable_flight_number);
    flight_number_div.attr("data", readable_flight_number);

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


    if ((in_filters == null && !single_flight) || out_filters == null || currencies == null)
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


    var at_least_one = false;
    $('.ticket').each(function(i, obj) {
        if (filter_by_price(obj) && filter_by_duration(obj) && filter_by_airline(obj) && filter_by_rating(obj) && filter_by_flight_number(obj)) {
            $(obj).show(300);
            at_least_one = true;
        } else {
            $(obj).hide(300);
        }
    });

    if (at_least_one) {
        $(".no_results").hide(300);
    } else {
        $(".no_results").show(300);
    }

}

function filter_by_flight_number(obj) {
    var value = $("#flight_number").val();

    if (value == null || value == "") {
        return true;
    }
    var flight_number = $(obj).find(".flight_number");

    var flight1 = $(flight_number[0]).attr("data");
    if (flight1 == value) {
        return true;
    }

    if (!single_flight) {
        var flight2 = $(flight_number[1]).attr("data");
        if (flight2 == value) {
            return true;
        }
    }

    return false;
}

function filter_by_rating(obj) {
    var ticket_from = $(obj).find(".ticket_from");
    var rating1 = $(ticket_from).attr("rating");
    if (!single_flight) {
        var ticket_to = $(obj).find(".ticket_to");
        var rating2 = $(ticket_from).attr("rating");
        if (rating2 < selected_rating) {
            return false;
        }
        if (rating1 < selected_rating) {
            return false;
        }


    } else {
        if (rating1 < selected_rating) {
            return false;
        }
    }
    return true;
}

function filter_by_price(obj) {

    if (price_slider == null) {
        return true;
    }

    var max = price_slider_max;
    var min = price_slider_min;

    max = parseInt(max, 10);
    min = parseInt(min, 10);


    var total = $(obj).find(".total_price").attr("data");
    total = parseInt(total, 10);
    // console.log(max + " > " + total + " >" + min);
    if (total + 1 >= min && total - 1 <= max) {
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
    console.log("remove");
    $("#airlines_select").val(null).trigger("change");
});
$("#remove_fligh").on("click", function() {
    $("#flight_number").val(null).trigger("change");
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

    if (price_slider.noUiSlider != null) {
        price_slider.noUiSlider.on("update", function() {});
    }
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

    if (min == max) {
        $(".price_range_container").hide();
        return;
    }

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

    // console.log(max_dur + " : " + min_dur);
    if (!Number.isInteger(min_dur) || !Number.isInteger(max_dur)) {
        console.log("returned");
        return;
    }

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
    filter();
})

$("#flight_number").on("change", function() {
    filter();
})


$("#flight_type").on("change", function() {
    if ($("#flight_type").val() == "1") {
        $("#return_div").show();
    } else {
        $("#return_div").hide();
    }
});

$("#search").on("click", function() {
    var sel_adu = $("#select-adults").val();
    var sel_chi = $("#select-children").val();
    var sel_inf = $("#select-infants").val();

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

    var url1 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + from_city + "&to=" + to_city + "&dep_date=" + correct_date_salida + "&adults=" + sel_adu + "&children=" + sel_chi + "&infants=" + sel_inf;
    sessionStorage.setItem("map", url1);
    if ($("#flight_type").val() == "1") {

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
        var url2 = "http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getonewayflights&from=" + to_city + "&to=" + from_city + "&dep_date=" + correct_date_vuelta + "&adults=" + sel_adu + "&children=" + sel_chi + "&infants=" + sel_inf;
        sessionStorage.setItem("map2", url2);
    } else {
        sessionStorage.removeItem("map2");
    }

    location.reload();
});

function setFlightFilter() {
    $("#flight_number").append("<option value=''></option>");

    $("#flight_number").select2({
        placeholder: "Seleccione vuelo",
    });

    for (var key in flight_codes) {
        var option = "<option value='" + key + "'>" + key + "</option>";
        $("#flight_number").append(option);
    }
}

function getUrlParameter(url, sParam) {
    var sPageURL = url,
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function display_modal(title, subtitle) {
    var title_div = $("#error_modal").find(".modal-title");
    var subtitle_div = $("#error_modal").find(".bar_subtitle");
    title_div.text(title);
    subtitle_div.text(subtitle);
    $("#error_modal").modal();
}

function error_modal(code) {
    no_results();
    var title_div = $("#error_modal").find(".modal-title");
    var subtitle_div = $("#error_modal").find(".bar_subtitle");
    title_div.text("Error");
    subtitle_div.text(get_message_for_code(code) + " (" + code + ")");
    $("#error_modal").modal();
}

function get_message_for_code(code) {
    switch (code) {
        case 11:
            return "Debe completar el campo de origen.";
        case 12:
            return "Debe completar el campo de destino.";
        case 13:
            return "Debe completar el campo de fecha de salida y/o vuelta.";
        case 14:
        case 15:
        case 16:
        case 100:
        case 104:
        case 115:
        case 116:
        case 117:
        case 119:
        case 120:
        case 121:
        case 127:
        case 128:
        case 129:
        case 130:
        case 131:
        case 132:
            return "Error de servidor. Por favor, intente de vuelta mas tarde.";
        case 118:
            return "Fecha destino o origen de incorecta. Por favor, intente de nuevo.";
        case 125:
            return "El aeropuerto de origen no es valido.";
        case 126:
            return "El aeropuerto de destino no es valido.";
        case 999:
            return "Error de servidor. Por favor, intente de nuevo mas tarde.";
        default:
            return "Error de comunicacion con el servidor. Por favor, intente de vuelta mas tarde.";
    }
}



// UI Element set up

$(".js-example-basic-single").select2();
