$(document).ready(function () {


    /*
    http://www.refulz.com:8082/index.php#tab2?foo=789
    
    Property    Result
    ------------------------------------------
    host        www.refulz.com:8082
    hostname    www.refulz.com
    port        8082
    protocol    http:
    pathname    index.php
    href        http://www.refulz.com:8082/index.php#tab2
    hash        #tab2
    search      ?foo=789
    
    var x = $(location).attr('<property>');
    */
    // Current browsing menu wise reload page form loading
    var current_view = $(location).attr('hash');

    if (current_view == "#about") {
        jQuery("#embed_form").load("form/about/about.html");
    }
    else if (current_view == "#gallery") {
        jQuery("#embed_form").load("form/gallery/gallery.html");
    }
    else if (current_view == "#portfolio") {
        jQuery("#embed_form").load("form/portfolio/portfolio.html");
    }
    else if (current_view == "#contact") {
        jQuery("#embed_form").load("form/contact/contact.html");
    }
    else {
        jQuery("#embed_form").load("form/home.html");
    }



    // Load header,menu & footer into index.html
    jQuery("#embed_header").load("form/header.html");
    jQuery("#embed_menu").load("form/menu.html");
    jQuery("#embed_footer").load("form/footer.html");


    // Based on menu load form into index.html
    $("#embed_menu").on("click", "#menu a", function () {

        var manuname = $(this).find('li').text();
        
        if (manuname == "About") {
            jQuery("#embed_form").load("form/about/about.html");
        }
        else if (manuname == "Gallery") {
            jQuery("#embed_form").load("form/gallery/gallery.html");
        }
        else if (manuname == "Home") {
            jQuery("#embed_form").load("form/home.html");
        }
        else if (manuname == "Portfolio") {
            jQuery("#embed_form").load("form/portfolio/portfolio.html");
        }
        else if (manuname == "Contact") {
            jQuery("#embed_form").load("form/contact/contact.html");
        }
    });

});
