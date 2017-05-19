$(document).ready(function() {

    $('#flight_number').on("change", function() {
        console.log("flight_number: " + $('#flight_number').val());
    });

    $('#airlines_select').on("change", function() { console.log("change"); });

    $("#search_flight").click(function() {
        get_flight_reviews();
    });

    var myObj, html = "";

    $("#upload_review_button").click(function() {

        var review = {
            "flight": {
                "airline": {
                    "id": "AR"
                },
                "number": 5260
            },
            "rating": {
                "friendliness": window.getStars("friendliness"),
                "food": window.getStars("food"),
                "punctuality": window.getStars("punctuality"),
                "mileage_program": window.getStars("mileage_program"),
                "comfort": window.getStars("comfort"),
                "quality_price": window.getStars("quality_price")
            },
            "yes_recommend": true,
            "comments": "Horrible!"
        }

        var URLY = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline";

        alert(URLY);


        debugger;
        console.log(window.getStars("friendliness"));
    });

});

function makeURL() {

    var airline_id = $('#airlines_select').val();
    var flight_number = $("#flight_number").val();
    var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" + airline_id;

    if (flight_number != "") {
        URL += "&flight_number=" + flight_number;
    }

    return URL;
}

function get_flight_reviews() {
    console.log($('#flight_number').val() + " " + $('#airlines_select').val());
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

    $(".loader_container_comments").show();

    timeout_timer = setTimeout(timeout, 15000);

    $.getJSON(makeURL(), function(result) {

        // setTimeout(function() {
        //     $(".loader_container_comments").hide();
        // }, 4000);

        clearTimeout(timeout_timer);
        $(".commentList").empty();

        myObj = result;

        var reviews = myObj.reviews;

        if (reviews.length == 0) {
            $(".commentList").html("No hay comentarios para este vuelo.");
            return;
        }

        for (x in reviews) {
            var li = $("<li></li>");
            var comment = $("<div class='commentText'></div>");
            comment.append("<p class='pText'>" + reviews[x].comments + "</p>");
            li.append(comment);
            li.append("<hr>");
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
