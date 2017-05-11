jQuery(document).ready(function() {

    var ratings = document.querySelector('#ratings');

    var categories = [{
        title: "Amabilidad",
    }, {
        title: "Comida",
    }, {
        title: "Puntualidad",
    }, {
        title: "Programa de viajeros frecuentes",
    }, {
        title: "Confort",
    }, {
        title: "Relación precio/calidad",
    }, {
        title: "General",
    }];

    // INITIALIZE
    (function init() {
        for (var i = 0; i < categories.length; i++) {
            addRatingWidget(buildCategory(categories[i]), categories[i]);
        }
    })();

    // BUILD CATEGORY
    function buildCategory(data) {
        var category = document.createElement('div');

        var html = '<h2>';

        var currentTitle = data.title;

        html += String(currentTitle) + ':</h2>';

        html += '<ul class="c-rating"></ul>';

        category.innerHTML = html;
        ratings.appendChild(category);

        return category;
    }

    // ADD RATING WIDGET
    function addRatingWidget(category, data) {
        var ratingElement = category.querySelector('.c-rating');
        var maxRating = 10;
        var callback = function(rating) {
            alert(rating);
        };
        var r = rating(ratingElement, null, maxRating, callback);
    }

    $(':checkbox').checkboxpicker();

});
