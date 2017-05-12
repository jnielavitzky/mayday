var airports;
var cities;

var airport_city_map = {};

$( document ).ready(function() {
	$.getJSON( "./ejemplo.json", function( data ) {
		airports = data["airports"];
		done();
	});
	$.getJSON( "./ejemplo2.json", function( data ) {
		cities = data["cities"];
		done();
	});

});

function done() {
	if (airports == null || cities == null)
		return;

	console.log("Tengo ambos! " + cities.length + " : " + airports.length);

	for (var key in airports){
		var city_code = airports[key]["city"]["id"];
		for (var key2 in cities) {
			var city = cities[key2];
			if (city["id"] == city_code) {
				airport_city_map[airports[key]["id"]] = city["name"] + " - " + airports[key]["id"];
			}
		}
	}

	for (var key in airport_city_map) {
		$('#cities-from').append("<option value='" + key + "'>" + airport_city_map[key] + "</option>");
		$('#cities-to').append("<option value='" + key + "'>" + airport_city_map[key] + "</option>");
	}



}

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

price_slider.noUiSlider.on('update', function( values, handle ) {
	
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

duration_range.noUiSlider.on('update', function( values, handle ) {
	
	$("#duration-slider-values").html("Min: " + Math.floor(values[0]) + "hs, max: " + Math.floor(values[1]) + "hs");
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "AR$";
}