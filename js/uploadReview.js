$(document).ready(function() {

    // $("#airlines_select")[0].selectedIndex = 0;

    // if ($("#airlines_select").select2('data').length == 0) {
    //     error("No internet");
    //     console.log($("#airlines_select"));
    //     return;
    // }

    // if ($("#airlines_select").select2('data')[0] === undefined) {
    //         error("smth");
    //         return;
    //     }

    // $('#airlines_select').val('AR'); // Select the option with a value of 'US'
    // $('#airlines_select').trigger('change'); // Notify any JS components that the value changed

    // if ($('#airlines_select')[0].length) {

    //     alert(1);

    // } else {
    //     alert(2);
    //     $('#airlines_select').val('AR'); // Select the option with a value of 'US'
    // $('#airlines_select').trigger('change'); // Notify any JS components that the value changed

    // }

    var myObj, html = "";

    timeout_timer = setTimeout(timeout, 15000);

    // $.ajax({
    //     url: URL,
    //     async: false,
    //     dataType: 'json',
    //     success: function(data) {
    //         console.log(URL);
    //         $(".loader_container_comments").hide();
    //         myObj = data;
    //         clearTimeout(timeout_timer);
    //     }
    // });



    $.getJSON(makeURL(), function(result, status) {

        $(".loader_container_comments").hide();
        clearTimeout(timeout_timer);

        myObj = result;

        // console.log(result);

        // var container = document.getElementById("flight_number_container");
        // var child = document.getElementById("warning_icon");
        // if (child != undefined) container.removeChild(child);
        // container.className = "form-group has-feedback";
        // document.getElementById("flight_number").placeholder = "";
        // warned = false;

        var reviews = myObj.reviews;

        if (reviews.length == 0) {
            $(".commentList").html("No hay comentarios para este vuelo.");
            return;
        }

        for (x in reviews) {
            var li = $("<li></li>");
            var comment = $("<div class='commentText'></div>");
            comment.append("<p class='pText'>" + reviews[x].comments + "</p>");
            // <span class='date sub-text'>" + getDate() + "</span>"
            li.append(comment);
            li.append("<hr>");
            $(".commentList").append(li);
        }

    });

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

        // console.log(review);
        // console.log(JSON.stringify(review));

        var URLY = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=reviewairline";

        alert(URLY);

        /*$.ajax({
            type: "PUT",
            url: URLY,
            data: JSON.stringify(review),
            contentType: "application/json",
            dataType: "json",
            success: function(data) {
                console.log(data);
            },
            failure: function(errMsg) {
                alert("error" + errMsg);
            }
        });*/
        debugger;
        console.log(window.getStars("friendliness"));
    });

});

function makeURL() {

    var airline = { id: 'AR', name: '' };

    var aux = setInterval(function() {
        if ($('#airlines_select').val() != null) {
            airline.id = $('#airlines_select').val();
            // console.log($('#airlines_select').val());
            // console.log("Exito")
            clearInterval(aux);
        }
    }, 10);

    var airlineName = $("#airlines_select").select2('data')[0];
    var flight_number = "5260" //$("#flight_number").val();
    var URL = "http://hci.it.itba.edu.ar/v1/api/review.groovy?method=getairlinereviews&airline_id=" + airline.id;

    if (flight_number != "") {
        URL += "&flight_number=" + flight_number;
    }

    return URL;
}

// function getDate() {
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth() + 1; //January is 0!
//     var yyyy = today.getFullYear();

//     if (dd < 10) {
//         dd = '0' + dd
//     }

//     if (mm < 10) {
//         mm = '0' + mm
//     }

//     today = mm + '/' + dd + '/' + yyyy;
//     return today;
// }

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
