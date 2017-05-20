$(document).ready(function() {

    // fix for Modal with select2.
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    var URL = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines&sort_key=name&sort_order=asc";

    var myObj, html = "";

    // timeout_timer = setTimeout(timeout, 5000);

    $.getJSON(URL, function(result) {

        // clearTimeout(timeout_timer);

        myObj = result;

        var airlines = myObj.airlines;

        html += "<option value=''></option>";

        for (x in airlines) {
            var logo = airlines[x].logo;
            html += "<option value='" + airlines[x].id + "' data-image='" + airlines[x].logo + "'>" + airlines[x].name + "</option>";
        }

        $('#airlines_select').html(html);

        setTimeout(function() {
            $('.loader_container_review').hide();
            $('#inputs').show();
        }, 1000);

    });

    $("#airlines_select").select2({
        placeholder: "Seleccione aerolínea",
        templateResult: formatAirline
    });

});

function formatAirline(opt) {
    if (!opt.id) {
        return opt.text;
    }

    var optimage = $(opt.element).data('image');
    if (!optimage) {
        return opt.text;
    } else {
        var $opt = $(
            '<span><img src="' + optimage + '" alt="logo" /> ' + $(opt.element).text() + '</span>'
        );
        return $opt;
    }
};

// function timeout() {
//     clearTimeout(timeout_timer);

//     $('#every').fadeTo(500, 0.2);
//     $('#every').css("pointer-events", "none");
//     $("#error").removeClass("hidden");
// }
