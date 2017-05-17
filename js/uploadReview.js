var timeout_timer;

$(document).ready(function() {


    // $("#airlines_select")[0].selectedIndex = 0;
    console.log($(".js-example-basic-single")[0]);

    // if ($("#airlines_select").select2('data').length == 0) {
    //     error("No internet");
    //     console.log($("#airlines_select"));
    //     return;
    // }

    //TO-DO

    var airlineID = $("#airlines_select").val();
    airlineID = "AR";
    console.log(airlineID);

    // if ($("#airlines_select").select2('data')[0] === undefined) {
    //         error("smth");
    //         return;
    //     }

    var airlineName = $("#airlines_select").select2('data')[0];
    var flight_number = "5260"; //$("#flight_number").val();
    var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" + airlineID;

    if (flight_number != "") {
        URL += "&flight_number=" + flight_number;
    }

    var myObj, html = "";

    timeout_timer = setTimeout(timeout, 5000);

    $.getJSON(URL, function(result, status) {

        $(".loader_container_comments").hide();
        clearTimeout(timeout_timer);
        myObj = result;

        // console.log(status);

        // var container = document.getElementById("flight_number_container");
        // var child = document.getElementById("warning_icon");
        // if (child != undefined) container.removeChild(child);
        // container.className = "form-group has-feedback";
        // document.getElementById("flight_number").placeholder = "";
        // warned = false;

        var reviews = myObj.reviews;

        console.log(reviews);

        if (reviews.length == 0) {
            $(".commentList").html("No hay comentarios para este vuelo.");
            return;
        }

        var a = $("#airlines_select");

        for (x in reviews) {
            var li = $("<li></li>");
            var comment = $("<div class='commentText'></div>");
            comment.append("<p class='pText'>" + reviews[x].comments + "</p><span class='date sub-text'>" + getDate() + "</span>");
            li.append(comment);
            li.append("<hr>");
            $(".commentList").append(li);
        }
    })

    $("#upload_review_button").click(function() {

        var review = {"flight": {"airline": {"id": airlineID},"number": flight_number},"rating": {"friendliness": 0,"food": 1,"punctuality": 2,"mileage_program": 3,"comfort": 4,"quality_price": 5},"yes_recommend": true,"comments": "Horrible!!!"}

        console.log(JSON.stringify(review));

        // $.post("http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline", review,
        //     function(data) {
        //         console.log(data);
        //     }, "json");

        var URLY = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline2&review=" + JSON.stringify(review);

alert(URLY)
        $.ajax({
            type: "POST",
            url: URLY,
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            failure: function(errMsg) {
                alert("error" + errMsg);
            }
        });
    });

});

function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;
    return today;
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
