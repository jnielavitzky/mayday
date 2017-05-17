var timeout_timer;

$(document).ready(function() {


    var test = {
        "flight": {
            "airline": {
                "id": "AR"
            },
            "number": 1490
        },
        "rating": {
            "friendliness": 9,
            "food": 9,
            "punctuality": 9,
            "mileage_program": 9,
            "comfort": 9,
            "quality_price": 9
        },
        "yes_recommend": true,
        "comments": "Best flight ever!"
    }

    console.log(JSON.stringify(test));

    $.ajax({
        type: "POST",
        url: "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify(test),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        failure: function(errMsg) {
            alert("error" + errMsg);
        }
    });




    $(".loader_container_reviews").hide();

    $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    $("#search_comments_button").click(function() {
        $("#reviews").empty();
    });

    $("#search_review_button").click(function() {

        $(".loader_container_reviews").show();
        $("#reviews").html("");

        if ($("#airlines_select").select2('data').length == 0) {
            error("No internet");
        }
        var airlineID = $("#airlines_select").val();
        var airlineName = $("#airlines_select").select2('data')[0].text;
        var flight_number = "1490"; //$("#flight_number").val();
        var filter = $("#orderby").val();

        var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" +
            airlineID + "&sort_key=" + filter;

        if (flight_number != "") {
            URL += "&flight_number=" + flight_number;
        }

        var myObj, html = "";

        timeout_timer = setTimeout(timeout, 5000);
        $.getJSON(URL, function(result, status) {

            $(".loader_container_reviews").hide();
            clearTimeout(timeout_timer);

            myObj = result;

            console.log(status);

            // var container = document.getElementById("flight_number_container");
            // var child = document.getElementById("warning_icon");
            // if (child != undefined) container.removeChild(child);
            // container.className = "form-group has-feedback";
            // document.getElementById("flight_number").placeholder = "";
            // warned = false;

            var reviews = myObj.reviews;

            if (reviews.length == 0) {
                $("#reviews").html("No hay comentarios para este vuelo.");
                return;
            }

            $(".modal-body").css("height", "70vh");

            var html = "";

            var a = $("#airlines_select");

            for (x in reviews) {
                var categories = getCategories();
                var ratings = reviews[x].rating;

                var friendliness = ratings.friendliness;
                var punctuality = ratings.punctuality;
                var mileage_program = ratings.mileage_program;
                var comfort = ratings.comfort;
                var quality_price = ratings.quality_price;
                var overall = ratings.overall;

                for (c in categories) {
                    if (categories[c].id.match("friendliness")) categories[c].stars = friendliness;
                    if (categories[c].id == "punctuality") categories[c].stars = punctuality;
                    if (categories[c].id == "mileage_program") categories[c].stars = mileage_program;
                    if (categories[c].id == "comfort") categories[c].stars = comfort;
                    if (categories[c].id == "quality_price") categories[c].stars = quality_price;
                    if (categories[c].id == "overall") categories[c].stars = overall;
                }

                html += "<div class='category_title'>" + "Nombre de aerolínea: " + "<p>" +
                    airlineName + "</p>" + "</div>";

                if (flight_number != "") html += "<div class='category_title'>" + "Número de vuelo: " + "<p>" + flight_number + "</p>" + "</div>";

                html += buildReviewFromCategories(categories);

                var recommendOther = reviews[x].yes_recommend;
                var yesRecommend = "";
                yesRecommend += "<div class='category_title'>Lo recomendaría a otro: ";

                if (recommendOther) {
                    yesRecommend += "<p>Sí</p>";
                } else {
                    yesRecommend += "<p>No</p>";
                }

                yesRecommend += '</div>';

                html += yesRecommend;

                if (reviews[x].comments != "") {
                    var commentsDiv = "<div class='category_title'>Comentarios: " + "<p>" +
                        reviews[x].comments + "</p>" + "</div>";
                    html += commentsDiv;
                }

                html += '<hr>';

                // $("#reviews").addClass("o-container card-2");
                $("#reviews").html(html);

            }
        });
    });
});

function timeout() {
    error("TIMEOUT!");
}

function error(s) {
    clearTimeout(timeout_timer);
    $(".loader_container_reviews").hide();
    $(".review_errors").text(s);



}
