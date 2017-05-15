var finish;
var getCategories;
var buildReviewFromCategories;

jQuery(document).ready(function() {

    var ratings = document.querySelector('#ratings');

    var categories = [{
        title: "Amabilidad",
        id: "friendliness",
        stars: 0
    }, {
        title: "Comida",
        id: "food",
        stars: 0
    }, {
        title: "Puntualidad",
        id: "punctuality",
        stars: 0
    }, {
        title: "Programa de viajeros frecuentes",
        id: "mileage_program",
        stars: 0
    }, {
        title: "Confort",
        id: "comfort",
        stars: 0
    }, {
        title: "Relación precio/calidad",
        id: "quality_price",
        stars: 0
    }, {
        title: "General",
        id: "overall",
        stars: 0
    }];

    // INITIALIZE
    function init() {
        for (var i = 0; i < categories.length; i++) {
            addRatingWidget(buildCategory(categories[i]), categories[i]);
        }
    };

    // BUILD CATEGORY
    function buildCategory(data) {
        var category = document.createElement('div');

        category.id = data.id;

        var html = "<div class='category_title'>";

        var currentTitle = data.title;

        html += String(currentTitle) + ':</div>';

        html += '<ul class="c-rating"></ul>';

        category.innerHTML = html;
        ratings.appendChild(category);

        return category;
    }

    buildReviewFromCategories = function() {
        var html = "";

        for (c in categories) {
            var cat = categories[c];

            html += "<div class='category_title'>";
            var currentTitle = cat.title;

            html += String(currentTitle) + ": " + "<p>" + cat.stars + "</p>" + '</div>';
        }

        return html;
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

    getCategories = function() {
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
        // console.log(categories);
        // console.log(cl);
    }

});
