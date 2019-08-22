$(document).ready(function () {

    // Load header,menu & footer into index.html
    $(function () {
        jQuery("#embed_header").load("form/header.html");
        jQuery("#embed_menu").load("form/menu.html");
        jQuery("#embed_footer").load("form/footer.html");
    });


    // Based on menu load form into index.html
    $("#embed_menu").on("click", "#menu a", function () {
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
