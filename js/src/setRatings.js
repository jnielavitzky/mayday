jQuery(document).ready(function() {

    var ratings = $('#review');

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
    $(function init() {
        for (var i = 0; i < categories.length; i++) {
            addRatingWidget(buildCategory(categories[i]), categories[i]);
        }
        $('.category_title').css("font-size", "large");
    });

    // BUILD CATEGORY
    function buildCategory(data) {
        var category = $('<div></div>');
        var id = data.id;
        category.attr("id", id);

        var html = $("<div class='category_title'></div>");
        html.append(String(data.title) + '<ul class="c-rating"></ul>');
        category.append(html);
        ratings.append(category);

        return category;
    }

    window.buildReviewFromCategories = function(categories) {
        var ans = $("<div class='category_container'></div>");

        for (c in categories) {
            var html = $("<div class='category_title'></div>");
            var cat = categories[c];
            html.append(String(cat.title) + ": " + "<p>" + cat.stars + "</p>");
            ans.append(html);
        }

        return ans;
    }

    window.getStars = function(categoryId) {
        $.each(categories, function(index) {
            if(categories[index].id == categoryId){
                return categories[index].stars;
            }
        });
    }

    // ADD RATING WIDGET
    function addRatingWidget(category, data) {
        var ratingElement = category.find('.c-rating')[0];
        var maxRating = 10;
        var callback = function(rating) {
            data.stars = rating;
        };
        var r = rating(ratingElement, null, maxRating, callback);
    }

    window.getCategories = function() {
        return categories;
    }

    function getToggle() {
        var something = $('#recOther');
        var toggle = something.checked;
        return toggle;
    }

    // CHECKBOX
    if ($(':checkbox')[0] !== undefined) {
        $(':checkbox').checkboxpicker.defaults.onLabel = 'Sí';
        $(':checkbox').checkboxpicker();
    }

    // WRAPS UP ALL FEEDBACK
    function finish() {
        var ans = {};
        ans[toggle] = getToggle();
        ans[cl] = getCmtList();
        ans[categories] = getCategories();
    }

});
