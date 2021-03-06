function setRatingStars(callb) {

    var ratings = document.querySelector('#ratings');

    var categories = [{
        stars: 0
    }];

    // INITIALIZE
    (function init() {
            addRatingWidget(buildCategory(categories[0]), categories[0]);
    })();

    // BUILD CATEGORY
    function buildCategory(data) {
        var category = document.createElement('div');

        var html = '<ul class="c-rating"></ul>';

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
            callb(rating);
        };
        var r = rating(ratingElement, 1, maxRating, callback);
    }

}
