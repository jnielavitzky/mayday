$(document).ready(function() {

    $(".loader_container_reviews").hide();

    $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    $("#search_comments_button").click(function() {
        $("#reviews").empty();
        $("#reviews_errors").empty();
        $(".modal-body").css("height", "");
    });

    $("#search_review_button").click(function() {

        $("#reviews").empty();
        $(".modal-body").css("height", "");
        $(".loader_container_reviews").show();
        $("#reviews_errors").hide()

        var airlineID = $("#airlines_select").val();
        var airlineName = $("#airlines_select").select2('data')[0].text;
        var flight_number = getFlightNumber();
        var filter = $("#orderby").val();

        var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" +
            airlineID + "&sort_key=" + filter;

        if (flight_number != "") {
            URL += "&flight_number=" + flight_number;
        }
        console.log(URL);

        var myObj, html = "";

        timeout_timer = setTimeout(timeout, 5000);

        $.getJSON(URL, function(result) {

            if (result["error"] != null) {
                clearTimeout(timeout_timer);
                $(".loader_container_reviews").hide();
                display_modal("Error", get_review_error_code((result["error"])["code"]));
                return;
            }

            clearTimeout(timeout_timer);

            myObj = result;

            var reviews = myObj.reviews;

            if (reviews.length == 0) {
                setTimeout(function() {
                    $(".loader_container_reviews").hide();
                    $("#reviews_errors").html("No hay reseñas para este vuelo.");
                    $("#reviews_errors").show();
                }, 1000);
                return;
            }

            var html = $("<div></div>");;

            for (x in reviews) {
                var categories = getCategories();
                var ratings = reviews[x].rating;

                var friendliness = ratings.friendliness;
                var food = ratings.food;
                var punctuality = ratings.punctuality;
                var mileage_program = ratings.mileage_program;
                var comfort = ratings.comfort;
                var quality_price = ratings.quality_price;
                var overall = ratings.overall;

                for (c in categories) {
                    if (categories[c].id.match("friendliness")) categories[c].stars = friendliness;
                    if (categories[c].id == "food") categories[c].stars = food;
                    if (categories[c].id == "punctuality") categories[c].stars = punctuality;
                    if (categories[c].id == "mileage_program") categories[c].stars = mileage_program;
                    if (categories[c].id == "comfort") categories[c].stars = comfort;
                    if (categories[c].id == "quality_price") categories[c].stars = quality_price;
                }

                html.append("<div class='category_title'>" + "Nombre de aerolínea: " + "<p>" + airlineName + "</p>" + "</div>");

                if (flight_number != "") html.append("<div class='category_title'>" + "Número de vuelo: " + "<p>" + flight_number + "</p>" + "</div>");

                html.append(buildReviewFromCategories(categories));

                html.append("<div class='category_title'>" + "General: " + "<p>" + overall + "</p>" + "</div>");

                var recommendOther = reviews[x].yes_recommend;
                var yesRecommend = "";
                yesRecommend += "<div class='category_title'>Lo recomendaría a otro: ";

                if (recommendOther) {
                    yesRecommend += "<p>Sí</p>";
                } else {
                    yesRecommend += "<p>No</p>";
                }

                yesRecommend += '</div>';

                html.append(yesRecommend);

                if (reviews[x].comments != "" && reviews[x].comments != null) {
                    var commentsDiv = "<div class='category_title'>Comentarios: " + "<p>" +
                        reviews[x].comments + "</p>" + "</div>";
                    $("#overall .category_title").css("font-size", "large");
                    html.append(commentsDiv);
                }

                html.append('<hr>');

                setTimeout(function() {
                    $(".modal-body").css("height", "70vh");
                    $(".loader_container_reviews").hide();
                    $("#reviews").html(html);
                }, 1000);

            }
        }).fail(function() {
            timeout();
        });
    });
});
function get_review_error_code(code) {
    switch (code) {
        case 1:
        case 100:
        case 114:
        case 115:
        case 116:
        case 117:
            return "Error de servidor. Por favor, intente de vuelta mas tarde.";
        case 999:
            return "Error de servidor. Por favor, intente de nuevo mas tarde.";
        default:
            return "Error de comunicacion con el servidor. Por favor, intente de vuelta mas tarde.";
    }
}
function getFlightNumber() {
    var initial = $("#flight_number").val();
    initial = initial.match(/\d{2,4}/)[0];
    return initial;
}

function timeout() {
    clearTimeout(timeout_timer);
    $(".loader_container_reviews").hide();
    display_modal("Error", "Error de servidor. Por favor intente de nuevo mas tarde.");
}
