var finish;

jQuery(document).ready(function() {

    var ratings = document.querySelector('#ratings');

    var categories = [{
        title: "Amabilidad",
        stars: 0
    }, {
        title: "Comida",
        stars: 0
    }, {
        title: "Puntualidad",
        stars: 0
    }, {
        title: "Programa de viajeros frecuentes",
        stars: 0
    }, {
        title: "Confort",
        stars: 0
    }, {
        title: "Relación precio/calidad",
        stars: 0
    }, {
        title: "General",
        stars: 0
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
            data.stars = rating;
        };
        var r = rating(ratingElement, null, maxRating, callback);
    }

    function getCategories() {
        return categories;
    }

    function getToggle() {
        var something = document.getElementById('recOther');
        var toggle = something.checked;
        console.log(toggle);
        return toggle;
    }


    // CHECKBOX
    $(':checkbox').checkboxpicker.defaults.onLabel = 'Sí';
    $(':checkbox').checkboxpicker();


    // WRAPS UP ALL FEEDBACK
    finish = function() {
        var toggle = getToggle();
        var cl = getCmtList();
        var categories = getCategories();
        console.log(categories);
        console.log(cl);
    }

});
