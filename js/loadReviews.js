$(document).ready(function() {

    $.fn.modal.Constructor.prototype.enforceFocus = function() {};

    $("#search_comments_button").click(function() {
        $("#reviews").empty();
    });

    $("#search_review_button").click(function() {

        var airlineID = $("#airlines_select").val();
        var airlineName = $("#airlines_select").select2('data')[0].text;
        var flight_number = $("#flight_number").val();
        var filter = $("#orderby").val();

        var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" +
            airlineID + "&sort_key=" + filter;

        if (flight_number != "") {
            URL += "&flight_number=" + flight_number;
        }

        var myObj, html = "";

        $.getJSON(URL, function(result, status) {

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
