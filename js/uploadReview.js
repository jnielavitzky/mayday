$(document).ready(function() {

    $('#inputs').hide();

    $("#airlines_select").change(function() {
        setSearchFlightButton();
    });

    $("#flight_number_review").change(function() {
        var n = $("#flight_number_review").val();

        if (jQuery.isNumeric(n)) {
            $(".glyphicon-warning-sign").remove();
            $("#flight_group_container").removeClass("has-warning has-feedback");
            $("#flight_group_container").addClass("has-success has-feedback");
            $("#flight_group_container").append("<span class='glyphicon glyphicon-ok form-control-feedback' aria-hidden='true'></span>");
        } else {
            $(".glyphicon-ok").remove();
            $("#flight_group_container").removeClass("has-success has-feedback");
            $("#flight_group_container").addClass("has-warning has-feedback");
            $("#flight_group_container").append("<span class='glyphicon glyphicon-warning-sign form-control-feedback' aria-hidden='true'></span>");
            $("#flight_number_review").val('');
            $("#flight_number_review").attr("placeholder", "Sólo numeros");
        }
        setSearchFlightButton();
    });

    $("#upload_comment_button").click(function() {

        var rev = {
            "flight": {
                "airline": {
                    "id": $("#airlines_select").val()
                },
                "number": parseInt($("#flight_number_review").val())
            },
            "rating": {
                "friendliness": getStars("friendliness"),
                "food": getStars("food"),
                "punctuality": getStars("punctuality"),
                "mileage_program": getStars("mileage_program"),
                "comfort": getStars("comfort"),
                "quality_price": getStars("quality_price")
            },
            "yes_recommend": $("#recOther").is(':checked')
        }

        var comment_exists = post(rev);

        $("#thanks_msg_header").append(" " + $("#flight_number_review").val() + " de " + getAirlineName() + ".");

        if (comment_exists) {
            $(".modal-header").after("<div class='modal-body'><div id='thanks_msg_body' class='bar_subtitle'></div></div>");
            $("#thanks_msg_body").append("Su comentario: " + $("#input_comment").val());
        }

    });

});

function getAirlineName() {
    var name;
    $('option').each(function() {
        if ($(this).val() == $("#airlines_select").val()) {
            name = $(this)["0"].text;
            return true;
        }
    });
    return name;
};

function post(rev) {

    var comment = $("#input_comment").val();
    var cExists = false;

    if (comment != "" && comment != null) {
        rev.comments = comment;
        cExists = true;
    }

    var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline";

    timeout_timer = setTimeout(timeout, 5000);

    $.ajax({
        type: "POST",
        url: URL,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(rev),
        success: function(data) {
            clearTimeout(timeout_timer);
            $("#input_comment").val('');
            if (cExists) {
                if (data.error != null) {
                    if (data.error.code == 999) {
                        $('#every').fadeTo(500, 0.2);
                        $('#every').css("pointer-events", "none");
                        $("#error").removeClass("hidden");
                    }
                } else {
                    get_flight_reviews();
                }
            }
        }
    });
    return cExists;
}

function setSearchFlightButton() {
    var aSelected = $("#airlines_select").val();
    var fSelected = $("#flight_number_review").val();

    if (aSelected != "" && aSelected != null && fSelected != "" && fSelected != null) {
        $("#review_container").removeClass("hidden");
        get_flight_reviews();
    } else {
        $("#review_container").addClass("hidden");
    }
}

function getFlightNumber() {
    var initial = $("#flight_number_review").val();
    initial = initial.match(/\d{2,4}/)[0];
    return initial;
}

function makeURL() {

    var airline_id = $('#airlines_select').val();
    var flight_number = $("#flight_number_review").val();
    var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" + airline_id;

    if (flight_number != "") {
        URL += "&flight_number=" + flight_number;
    }

    return URL;
}

function get_flight_reviews() {
    $(".commentList").empty();
    get_comments();
}

function get_comments() {

    $(".loader_container_comments").show();

    timeout_timer = setTimeout(timeout, 5000);

    $.getJSON(makeURL(), function(result) {

        clearTimeout(timeout_timer);

        myObj = result;

        var reviews = myObj.reviews;

        if (reviews.length == 0) {
            setTimeout(function() {
                $(".loader_container_comments").hide();
                $(".commentList").html("No hay comentarios para este vuelo.");
            }, 1000);
            return;
        }

        $(".loader_container_comments").hide();

        for (x in reviews) {
            if (reviews[x].comments != null) {
                var li = $("<li></li>");
                var comment = $("<div class='commentText'></div>");
                comment.append("<p class='pText'>" + reviews[x].comments + "</p>");
                li.append(comment);
                li.append("<hr class='style-eight'>");
                $(".commentList").append(li);
            }
        }
    });
}

function timeout() {
    clearTimeout(timeout_timer);

    $('#every').fadeTo(500, 0.2);
    $('#every').css("pointer-events", "none");
    $("#error").removeClass("hidden");
}
