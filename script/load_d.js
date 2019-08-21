$(document).ready(function () {

    // Load header in index.html
    $(function () {
        jQuery("#embed_header").load("form/header.html");
    });

    // Load menu in index.html
    $(function () {
        jQuery("#embed_menu").load("form/menu.html");
    });

    // Load form in index.html
        $('#menu').each(function () {
            $('a').click(function () {
                var manuname = $(this).find('li').text();
                if (manuname == "Portfolio") {
                    $(function () {
                        jQuery("#embed_form").load("form/portfolio/portfolio.html");
                    });
                }
                else if (manuname == "Contact") {
                    $(function () {
                        jQuery("#embed_form").load("form/contact/contact.html");
                    });
                }
            });
        });


    // Load footer in index.html
    $(function () {
        jQuery("#embed_footer").load("form/footer.html");
    });


});
