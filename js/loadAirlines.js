var showAirlines = (function loadAirlines() {

    var URL = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines&sort_key=name&sort_order=asc";

    var myObj, html = "";

    $.getJSON(URL, function(result) {

        myObj = result;

        var airlines = myObj.airlines;

        for (x in airlines) {
            var logo = airlines[x].logo;
            html += "<option value='" + airlines[x].id + "' data-image='" + airlines[x].logo + "'>" + airlines[x].name + "</option>";
        }

        document.getElementById("airlines_select").innerHTML = html;

    });

    $(".js-example-basic-single").select2({
        templateResult: formatAirline
    });
}());

function formatAirline(opt) {
    if (!opt.id) {
        return opt.text;
    }

    var optimage = $(opt.element).data('image');
    if (!optimage) {
        return opt.text;
    } else {
        var $opt = $(
            '<span class="userName"><img src="' + optimage + '" class="userPic" /> ' + $(opt.element).text() + '</span>'
        );
        return $opt;
    }
};

$(".js-example-basic-single").select2({
    templateResult: formatAirline
});
