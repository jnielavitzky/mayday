$(document).ready(function() {

    // fix for Modal with select2.
    $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    var URL = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines&sort_key=name&sort_order=asc";

    var myObj, html = "";

    $.getJSON(URL, function(result) {

        myObj = result;

        var airlines = myObj.airlines;

        for (x in airlines) {
            var logo = airlines[x].logo;
            html += "<option value='" + airlines[x].id + "' data-image='" + airlines[x].logo + "'>" + airlines[x].name + "</option>";
        }

        $('#airlines_select').html(html);


    });

    $('#airlines_select').select2();
    $('#airlines_select').select2('val', $('#airlines_select option:eq(1)').val());
    $(".js-example-basic-single").select2({
        templateResult: formatAirline
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

});
