$(document).ready(function() {

    $('#inputs').hide();

    $("#search_flight_button").click(function() {
        var aSelected = $("#airlines_select").val();
        var fSelected = $("#flight_number_review").val();

        if (aSelected != "" && aSelected != null && fSelected != "" && fSelected != null) {
            get_flight_reviews();
        }
    });

    // $("#friendliness").find(".c-rating").on("change", function() { 
    //     console.log(getStars("friendliness")); 
    // }); 

    $("#upload_commment_button").click(function() {

        var comment = $("#input_comment").val();

        if (comment != "") {

            var review = {
                "flight": {
                    "airline": {
                        "id": $("#airlines_select").val()
                    },"number": getFlightNumber()},
                    "rating": {
                        "friendliness": getStars("friendliness"),
                        "food": getStars("food"),
                        "punctuality": getStars("punctuality"),
                        "mileage_program": getStars("mileage_program"),
                        "comfort": getStars("comfort"),
                        "quality_price": getStars("quality_price")
                    },
                    "yes_recommend": true,
                    "comments": comment
                }

                var URLY = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline2";

                URLY += JSON.stringify(review);

                $.getJSON(URLY, function(result) {
                    console.log(result);
                });

            // $.ajax({
            //     type: "PUT",
            //     url: URLY,
            //     contentType: "application/json",
            //     data: JSON.stringify(review),
            //     success: function(data) {
            //         console.log(data);
            //     }
            // });

            get_comments();

        }


        // // debugger;
        // console.log(window.getStars("friendliness"));
    });

});

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
    console.log($('#flight_number_review').val() + " " + $('#airlines_select').val());
    $(".commentList").empty();
    $("#comment_container").removeClass("hidden");
    get_comments();
}


function bindCmt() {
    var cmtListElement = $('.commentList'),
    cmtList = JSON.parse(localStorage.getItem('cmtList'));

    //Out with the old
    cmtListElement.empty();

    //And in with the new
    $.each(cmtList, function(i, k) {
        cmtListElement.append($('<li><div class="commentText"><p class="pText">' + k.text + '</p><span class="date sub-text">' + k.date + '</span></div></li><hr>'));
    });
}

function getCmtList() {
    var cl = localStorage.getItem('cmtList');
    if (cl != null) cl = JSON.parse(cl);
    return cl;
}

function get_comments() {

    $(".commentList").empty();
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
            var li = $("<li></li>");
            var comment = $("<div class='commentText'></div>");
            comment.append("<p class='pText'>" + reviews[x].comments + "</p>");
            li.append(comment);
            li.append("<hr class='style-eight'>");
            $(".commentList").append(li);
        }

    });
}

//Get the comments on page ready
$(function() {
    bindCmt();
});


function timeout() {
    error("TIMEOUT!");
}

function error(s) {
    clearTimeout(timeout_timer);
    $(".loader_container_comments").hide();
    $(".comments_errors").text(s);

}
