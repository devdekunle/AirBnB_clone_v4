$(function() {

    const amenities = JSON.parse(localStorage.getItem('amenities')) || {};

    for (const [name, id] of Object.entries(amenities)) {

        $(`.amenities .popover input[data-name="${name}"][data-id=${id}]`).prop('checked', true);
    }

    const amenityNames = Object.keys(amenities);
    $('.amenities h4').text(amenityNames.sort().join(', '));
    $('.amenities .popover input').change(function() {

        if ($(this).is(':checked')) {
            amenities[$(this).attr('data-name')] = $(this).attr('data-id');
        }
        else if ($(this).is(':not(:checked)')) {
            delete amenities[$(this).attr('data-name')];

        }
        const amenityNames = Object.keys(amenities);
        $('.amenities h4').text(amenityNames.sort().join(', '));

        localStorage.setItem('amenities', JSON.stringify(amenities));

    });

    $.ajax({

        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(data) {

            if (data.status == 'OK') {

                $('div#api_status').addClass('available');

            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
                $('div#api_status').css('backgroundColor', '#cccccc');
            }

    });

    $.ajax({
        url: "http://0.0.0.0:5001/api/v1/places_search",
        type: 'POST',
        headers: {"Content-Type": "application/json"},
        data: '{}',
        success: function(places) {
            for (const place of places) {
                const article = ['<article>',
                  '<div class="title_box">',
                 `<h2>${place.name}</h2>`,
                 `<div class="price_by_night">$${place.price_by_night}</div>`,
                 '</div>',
                 '<div class="information">',
                 `<div class="max_guest">${place.max_guest} Guest(s)</div>`,
                 `<div class="number_rooms">${place.number_rooms} Bedroom(s)</div>`,
                 '</div>',
                 '<div class="description">',
                 `${place.description}`,
                 '</div>',
                 '</article>'];
                 $('section.places').append(article.join(''));

            }
        },

        error: function(error) {
            console.log(error);
        }

    });

});
