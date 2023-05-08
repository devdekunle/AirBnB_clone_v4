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

});
