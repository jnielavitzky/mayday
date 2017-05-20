var ratings = $('#review');
var categories;

$(document).ready(function() {

    categories = [{
        title: "Amabilidad",
        id: "friendliness",
    }, {
        title: "Comida",
        id: "food",
    }, {
        title: "Puntualidad",
        id: "punctuality",
    }, {
        title: "Programa de viajeros frecuentes",
        id: "mileage_program",
    }, {
        title: "Confort",
        id: "comfort",
    }, {
        title: "Relación precio/calidad",
        id: "quality_price",
    }];

    // INITIALIZE
    
    for (var i = 0; i < categories.length; i++) {
        addRatingWidget(buildCategory(categories[i]), categories[i]);
    }
    $('.category_title').css("font-size", "large");


    // CHECKBOX
    if ($(':checkbox')[0] !== undefined) {
        $(':checkbox').checkboxpicker.defaults.onLabel = 'Sí';
        $(':checkbox').checkboxpicker();
    }

});

// BUILD CATEGORY
function buildCategory(data) {
    var html = $("<div class='category_title'></div>");
    html.append(String(data.title) + '<ul class="c-rating" id="' + data.id + '"></ul>');
    ratings.append(html);

    return html;
}

function buildReviewFromCategories(categories) {
    var ans = $("<div class='category_container'></div>");

    for (c in categories) {
        var html = $("<div class='category_title'></div>");
        var cat = categories[c];
        html.append(String(cat.title) + ": " + "<p>" + cat.stars + "</p>");
        ans.append(html);
    }

    return ans;
}

function getStars(categoryId) {
    var result = 0;
    $.each(categories, function(index) {
        if (categories[index].id == categoryId) {
            result = categories[index].stars.getRating();
            return true;
        }
    });
    return result;
}

// ADD RATING WIDGET
function addRatingWidget(category, data) {
    var ratingElement = category.find('.c-rating')[0];
    var maxRating = 10;
    var callback = function(rating) {
    };
    data.stars = rating(ratingElement, 1, maxRating, callback);
}

function getCategories() {
    return categories;
}

function getToggle() {
    var something = $('#recOther');
    var toggle = something.checked;
    return toggle;
}

// WRAPS UP ALL FEEDBACK
function finish() {
    var ans = {};
    ans[toggle] = getToggle();
    ans[cl] = getCmtList();
    ans[categories] = getCategories();
}
