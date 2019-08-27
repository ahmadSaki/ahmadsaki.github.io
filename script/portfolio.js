$.getScript("script/json_pull_connection.js");



//  personal_project_view Modal
$("#embed_form").on("click", ".personal_project_list a", function () {

  var appID = $(this).attr('id');  //$(this).get(0).id
  appID = String(appID);
  // var appTitle = $(this).text();

  // Remove dynamically added tag from modal
  // $('#personal_project_view').on('hidden.bs.modal', function () {   //'shown.bs.modal'
  //   console.log($('#personal_project_view').is(':visible'));
  //   $("#personal_project_view").find(".modal-body").html("");
  // });

  ayJSON("/resource/portfolio/personal_project/personal_project.json", function (text) {

    // Get application properties from personal_preject.json file
    var data = JSON.parse(text);
    var appTitle = data[appID].title;
    var appDescription = data[appID].description;
    var appSourcelink = data[appID].link.sourcecode;
    var appLivelink = data[appID].link.live;
    var appPresentaionlink = data[appID].link.presentation;
    var appTutoriallink = data[appID].link.tutorial;

    var appStartdate = data[appID].date.startdate;
    var appEnddate = data[appID].date.enddate;
    var appDuration = Math.round((new Date(appEnddate) - new Date(appStartdate)) / 1000 / 60 / 60 / 24)  // Duration in day(s)    
    appStartdate = new Date(appStartdate).toDateString();
    appEnddate = new Date(appEnddate).toDateString();

    var appTechlength = data[appID].technology.length;

    var appMember = data[appID].member;
    var appResponsibility = data[appID].responsibility;
    var appRole = data[appID].role;

    var appPhotourl = data[appID].link.photourl[0];
    var appPhotocount = data[appID].link.photourl[1];


    // Set application title & description into modal
    $("#personal_project_view").find("#app-title").text(appTitle);
    $("#personal_project_view").find("#app-description").text(appDescription);

    // If link exist then set project links into modal
    if (appSourcelink == "") {
      $("#personal_project_view").find("#app-sourcelink div").remove();
    }
    else {
      $("#personal_project_view").find("#app-sourcelink div").remove();
      $("#personal_project_view").find("#app-sourcelink").append(
        '<div class="col-sm-3">Source Code</div>'
        + '<div class="col-sm-1">:</div>'
        + '<div class="col-sm-8">&nbsp;<a href="#portfolio" class="tooltip-test" title="Click here to see soruce code">Source link</a></div>'
        + '<div class="w-100"></div>'
      );
      $("#personal_project_view").find("#app-sourcelink a").attr('target', '_blank').attr('href', appSourcelink).trigger('click');  //attr("href", appSourcelink);
    }

    if (appLivelink == "") {
      $("#personal_project_view").find("#app-livelink div").remove();
    }
    else {
      $("#personal_project_view").find("#app-livelink div").remove();
      $("#personal_project_view").find("#app-livelink").append(
        '<div class="col-sm-3">Live</div>'
        + '<div class="col-sm-1">:</div>'
        + '<div class="col-sm-8">&nbsp;<a href="#portfolio" class="tooltip-test" title="Click here to live browsing">Live link</a></div>'
        + '<div class="w-100"></div>'
      );
      $("#personal_project_view").find("#app-livelink a").attr('target', '_blank').attr('href', appLivelink).trigger('click');
    }

    if (appPresentaionlink == "") {
      $("#personal_project_view").find("#app-presentationlink div").remove();
    }
    else {
      $("#personal_project_view").find("#app-presentationlink div").remove();
      $("#personal_project_view").find("#app-presentationlink").append(
        '<div class="col-sm-3">Presentation</div>'
        + '<div class="col-sm-1">:</div>'
        + '<div class="col-sm-8">&nbsp;<a href="#portfolio" class="tooltip-test" title="Click here to see presentation">View link</a></div>'
        + '<div class="w-100"></div>'
      );
      $("#personal_project_view").find("#app-presentationlink a").attr('target', '_blank').attr('href', appPresentaionlink).trigger('click');
    }

    if (appTutoriallink == "") {
      $("#personal_project_view").find("#app-tutoriallink div").remove();
    }
    else {
      $("#personal_project_view").find("#app-tutoriallink div").remove();
      $("#personal_project_view").find("#app-tutoriallink").append(
        '<div class="col-sm-3">Tutorial</div>'
        + '<div class="col-sm-1">:</div>'
        + '<div class="col-sm-8">&nbsp;<a href="#portfolio" class="tooltip-test" title="Click here to see tutorial">Tutorial link</a></div>'
        + '<div class="w-100"></div>'
      );
      $("#personal_project_view").find("#app-tutoriallink a").attr('target', '_blank').attr('href', appTutoriallink).trigger('click');
    }

    // Set application title & description into modal
    $("#personal_project_view").find("#app-startdate").text(appStartdate);
    $("#personal_project_view").find("#app-enddate").text(appEnddate);
    $("#personal_project_view").find("#app-duration").text(appDuration);

    // Remove previous technology-logo then set new technology-logo into modal
    if (appTechlength > 0) {
      var appTechnology = "";
      var appTechurl = "";
      var technum = 0;

      ayJSON("/resource/resource.json", function (text) {
        var resource = JSON.parse(text);

        $("#personal_project_view").find("#app-logo span").remove();

        while (appTechlength > 0) {
          appTechnology = data[appID].technology[technum].toLowerCase().split(' ').join('_');  //used <<< split(' ').join('_') >>> instead of <<< replace(" ", "_") >>> for all replacement of the string.
          appTechnology = String(appTechnology);
          appTechurl = resource.logo_url[appTechnology];
          if (appTechurl != null) {
            $("#personal_project_view").find("#app-logo").append('<span><img style="box-shadow: 2px 2px 5px rgba(0,0,0,0.2);" width=100 src="' + appTechurl + '"></span></span><span>&nbsp;&nbsp;</span>');
          }
          else {
            $("#personal_project_view").find("#app-logo").append('</span><span>&nbsp;&nbsp;</span><span id="techtext" style="box-shadow: 2px 2px 2px rgba(0,0,0,0.2); font-size: 21px;">' + data[appID].technology[technum] + '</span><span>&nbsp;&nbsp;</span>');
          }

          appTechlength -= 1;
          technum += 1;
        }
      });
    }

    // Set application member, responsibility & role into modal
    $("#personal_project_view").find("#app-member").text(appMember);
    $("#personal_project_view").find("#app-responsibility").text(appResponsibility);
    $("#personal_project_view").find("#app-role").text(appRole);

    // Remove previous photo header then set new photo header into modal
    $("#personal_project_view").find("#app-photo #app-photo-header").remove();
    if (appPhotocount > 0) {
      $("#personal_project_view").find("#app-photo").append('<h5 id="app-photo-header">Project Photo</h5>');
    }

    // Remove previous photo IDs and photos then set photo IDs and photos into modal
    $("#personal_project_view").find(".app-photo-id").remove();
    $("#personal_project_view").find(".app-photo-photo").remove();
    var imgsource = "";
    var imgtext = "";
    var imgnum = 0;
    while (appPhotocount > 0) {
      imgnum += 1;
      if (data[appID].link.photourl[2][imgnum] != null) {
        imgtext = data[appID].link.photourl[2][imgnum];
      }
      else {
        imgtext = "";
      }
      imgsource = appPhotourl + appID + "_" + imgnum + ".jpg";
      $("#personal_project_view").find("#app-photo").append('<p class="app-photo-id">' + imgnum + '. ' + imgtext + '</p><img class="app-photo-photo" src="' + imgsource + '">');
      appPhotocount -= 1;
    }

    // View modal
    $('#personal_project_view').modal('show');

  });
});



//  Include all the elements of personal_project.html into portfolio.html
function embed_personal_project() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("personal_project_html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("personal_project_html");
          embed_personal_project();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
