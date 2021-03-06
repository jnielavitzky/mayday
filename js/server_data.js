var airports;
var cities;


var airport_city_map = {};

var timer_timeout;

var error_call;

function fillCitySelects(callback, error_callback) {

    error_call = error_callback;
    $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getairports", function(data) {
        airports = data["airports"];
        done_data(callback, error_callback);
    }).fail(function() {
        error_callback()
    });
    $.getJSON("http://hci.it.itba.edu.ar/v1/api/geo.groovy?method=getcities", function(data) {
        cities = data["cities"];
        done_data(callback, error_callback);
    }).fail(function() {
        error_callback()
    });

    timer_timeout = setTimeout(timeout_fun, 70000);
}

function timeout_fun() {
    clearTimeout(timer_timeout);
    error_call();
}

function done_data(callback, error_callback) {
    if (airports == null || cities == null)
        return;

    clearTimeout(timer_timeout);

    for (var key in airports) {
        var city_code = airports[key]["city"]["id"];
        for (var key2 in cities) {
            var city = cities[key2];
            if (city["id"] == city_code) {
                airport_city_map[airports[key]["id"]] = city["name"] + " - " + airports[key]["id"];
            }
        }
    }
    $('#cities-from').append("<option value=''></option>");
    $('#cities-to').append("<option value=''></option>");
    for (var key in airport_city_map) {
        $('#cities-from').append("<option value='" + key + "'>" + airport_city_map[key] + "</option>");
        $('#cities-to').append("<option value='" + key + "'>" + airport_city_map[key] + "</option>");
    }

    callback();
}
