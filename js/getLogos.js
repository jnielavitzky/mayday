function getLogos(callback, error_callback) {
    var logos = {};

    var URL = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines&sort_key=name&sort_order=asc";

    var myObj;

    $.getJSON(URL, function(result) {

        myObj = result;

        var airlines = myObj.airlines;

        for (x in airlines) {
            logos[airlines[x].id] = airlines[x].logo;
        }
        callback(logos);
    }).fail(function() {
        error_callback();
    });



}
