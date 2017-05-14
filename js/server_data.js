var airports;
var cities;
var out_flights;
var in_flights;

var airport_city_map = {};

$( document ).ready(function() {
	$.getJSON( "./ejemplo.json", function( data ) {
		airports = data["airports"];
		done_data();
	});
	$.getJSON( "./ejemplo2.json", function( data ) {
		cities = data["cities"];
		done_data();
	});
	$.getJSON( "./ejemplo3.json", function( data ) {
		out_flights = data["flights"];
		done_flights();
	});
	$.getJSON( "./ejemplo4.json", function( data ) {
		in_flights = data["flights"];
		done_flights();
	});

});

function done_flights() {
	var ticket_container = $("#results_tickets");

	if (out_flights == null || in_flights == null) 
		return;

	for (var out_key in out_flights) {
		var out_flight = out_flights[out_key];
		for (var in_key in in_flights) {
			var in_flight = in_flights[in_key];

			// Copy a blanck ticket
			var hidden_ticket = ticket_container.find("#hidden_ticket");
			var new_ticket = hidden_ticket.clone();
			new_ticket.removeClass("hidden");
			// new_ticket.attr("id", key);
			ticket_container.append(new_ticket);

			var ticket_from = new_ticket.find(".ticket_from");
			fill_half_ticket(out_flight, ticket_from);

			var ticket_to = new_ticket.find(".ticket_to");
			fill_half_ticket(in_flight, ticket_to);

		}
	}


	

	
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
	total_time_div.text("Total: " + total_time.split(':')[0] + "hs.");
}

function shorten_name(name, l) {
	if (name == null) 
		return null;

	if (name.length <= l) 
		return name;
	
	if (name.indexOf(',') != -1) 
		return shorten_name(name.split(',')[1], l);
	

	return name.substring(0, l-4) + "...";
}

function done_data() {
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