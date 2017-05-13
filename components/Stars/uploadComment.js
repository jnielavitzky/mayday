function uploadComment() {
    // Check browser support
    if (typeof(Storage) !== "undefined") {

        // Store
        var cl = localStorage.getItem('cmtList');

        if (cl != null) cl = JSON.parse(cl);

        var input = document.getElementsByClassName("inputComment");
        var c = input[0].value;
        var d = getDate();

        if (cl) {
            cl.push({ text: c, date: d });
            localStorage.setItem('cmtList', JSON.stringify(cl));
        } else {
            cl = [];
            cl.push({ text: c, date: d });
            localStorage.setItem('cmtList', JSON.stringify(cl));
        }

        $('.inputComment').val('');
        $('.inputComment').focus();

        bindCmt();
    } else {
        alert("Sorry, your browser does not support Web Storage...");
    }
}

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
    localStorage.clear();
    bindCmt();
});
