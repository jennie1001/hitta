var Hitta,
    loggedIn = false;

Hitta = {
    init: function () {
        'use strict';

        Hitta.login();

        $('#js-toggle-login').click(function () {
            if (!loggedIn) {
                $('.login-form-wrap').toggle();
            } else if (loggedIn) {
                $('.logout-form-wrap').toggle();
            }
        });
    },

    login: function () {
        'use strict';

        $('#login-form input').focus(function () {
            $(this).removeClass('error');
        });

        //callback handler for form submit
        $("#login-form").submit(function (e) {
            e.preventDefault(); //Don't submit form yet
            $('.error-msg').remove();
            Hitta.validateFormFields();

            var postData = $(this).serializeArray(),
                formURL = $(this).attr('action'),
                type = $(this).attr('method') || 'POST',
                validated = ($.trim($('#username').val()) && $.trim($('#password').val())) ? true : false;

            if (validated) {
                $.ajax({
                    url: formURL,
                    type: type,
                    data: postData,
                    crossDomain: true,
                    beforeSend: function () {
                        $('.icon-spin5').css('display', 'inline-block');
                      },
                    complete: function () {
                        $('.icon-spin5').css('display', 'none');
                    },
                    success: function () {
                        $('.login-form-wrap').hide();
                        $('.account-txt').text('Inloggad');
                        loggedIn = true;
                    },
                    error: function (jqXHR) {
                        $('#login-form').append("<p class='error-msg'>" + jqXHR.statusText + "</p>");
                    },
                    timeout: 4000 // sets timeout to 4 seconds
                });
            }
        });
    },

    validateFormFields: function () {
        'use strict';
        var required    = $('input[data-required="true"]'),
            trimmedVal;

        required.each(function () {
            trimmedVal = $.trim($(this).val());
            if (!trimmedVal) {
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
    }
};

(function ($) {
    'use strict';

    //Initiate the script
    Hitta.init();
}(jQuery));
