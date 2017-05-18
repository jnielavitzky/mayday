var offers = [];
var ratio;
var selected = [];
var result;
var call;

$(document).ready(function() {
    call = setTimeout(time,5000);
    $.getJSON('http://hci.it.itba.edu.ar/v1/api/booking.groovy?method=getlastminuteflightdeals&from=BUE', function(json) {
        var error = json;
        if(error != null){
            offers = json["deals"];
            var id = json["currency"]["id"];
            var url = "http://hci.it.itba.edu.ar/v1/api/misc.groovy?method=getcurrenciesratio&id1=" + id + "&id2=ARS";
            $.getJSON(url, function(currency) {
                ratio = currency["ratio"];
                bestOffers();
                for(var i = 0; i < selected.length; i++){
                    var price = (selected[i]["price"] * ratio).toFixed(2);
                    var country = selected[i]["city"]["country"]["name"];
                    var description = selected[i]["city"]["name"];
                    description = description.split(",",1);
                    offerCreator(price, country, description);
                }
            });
        } else{
            defaultCreator();
        }
    });
});

function defaultCreator() {
    $('#card-container').load('./defaultoffers.html');
}

function bestOffers() {
    var todelete = 0;
    for(var i = 0; i < 6; i++){
        var min = offers[0];
        for(var j = 0; j < offers.length; j++){
            if(offers[j] != null){
                if(offers[j]["price"] < min["price"]){
                    todelete = j;
                    min = offers[j];
                }
            }
        }
        selected[i] = min;
        delete offers[todelete];
    }
}

function offerCreator(price, country, description) {
    $.when(getPhoto(description, country)).then(function(){
        $('#card-container').append('<div class="col-md-4"><div class="card">' +
        '<img class="card-img" src=' + result + '></img>' +
        '<ul class="tite-price"><li class="card-main-text">' + country + '</li><li class="card-main-text price">$ ' + price + '</li></ul>' +
        '<p class="card-text">' + description + '</p></div></div>');
    });
}

function getPhoto(description, country) {
    var myurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=10515b3263b7673c158f26fc4ce01a36&tags=" + description.toString() + "," + country + "&per_page=50&safe_search=2&format=json&jsoncallback=?";
    var randint = Math.floor(Math.random() * 30 + 1);
    return $.getJSON(myurl, function(flickrJson) {
        var farmid = flickrJson["photos"]["photo"][randint]["farm"];
        var serverid = flickrJson["photos"]["photo"][randint]["server"];
        var usrid = flickrJson["photos"]["photo"][randint]["id"];
        var secret = flickrJson["photos"]["photo"][randint]["secret"];
        result = '"https://farm' + farmid + ".staticflickr.com/" + serverid + "/" + usrid + "_" + secret +'.jpg"';
    });
}

var time = function time() {
    $('.loader').hide();
    $("#card-container").removeClass('hide');
}
