$(document).ready(function() {

    $('#airlines_select').on("change", function() { setSearchCommentsButton(); });

    $("#flight_number").on("change", function() { setSearchCommentsButton(); });

});

function setSearchCommentsButton(argument) {

    var aSelected = $("#airlines_select").val();
    var fSelected = $("#flight_number").val();

    if (aSelected != "" && aSelected != null && fSelected != "" && fSelected != null) {

        $('#search_comments_button_container').removeClass("hidden");

    } else {
        $('#search_comments_button_container').addClass("hidden");
    }
}
