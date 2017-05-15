var showAirlines = (function loadAirlines() {
    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var myObj, html = "";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var airlines = myObj.airlines;

            for (x in airlines) {
                var logo = airlines[x].logo;
                html += "<option value='" + airlines[x].id + "' data-image='" + airlines[x].logo + "'>" + airlines[x].name + "</option>";
                // html += "<option value='" + airlines[x].id + "'>" + airlines[x].name + "</option>";
            }

            document.getElementById("airlines_select").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getairlines&sort_key=name&sort_order=asc", true);
    xhttp.send();

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
