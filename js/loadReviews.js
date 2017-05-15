$("#search_review_button").click(function loadReviews() {
    var xhttp;

    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    var airlineID = document.getElementById("airlines_select").value;
    var flight_number = document.getElementById("flight_number").value;
    var myObj, html = "";

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            myObj = JSON.parse(this.responseText);

            var reviews = myObj.reviews;
            var html = ""

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

                // console.log(categories);
                html += buildReviewFromCategories(categories);

                var recommendOther = reviews[x].yes_recommend;
                var yesRecommend = "";
                yesRecommend += "<div class='category_title' id='yes_recommend'>Lo recomendaría a otro: ";

                if (recommendOther) {
                    yesRecommend += "Sí";
                } else {
                    yesRecommend += "No";
                }

                yesRecommend += '</div>';

                html += yesRecommend;

                commentsDiv = "<div class='category_title' id='comments'>Comentarios: " + reviews[x].comments + "</div>";

                html += commentsDiv;

                html += '<hr>';

            }

            var ratings = document.querySelector('#ratings');
            ratings.innerHTML = html;
            // console.log(reviews);

            // document.getElementById("airlines_select").innerHTML = html;
        }
    };
    xhttp.open("GET", "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" +
        airlineID + "&flight_number=" + flight_number + "&sort_key=rating", true);
    xhttp.send();

    // showAirlines();
});
