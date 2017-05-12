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
