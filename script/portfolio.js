$.getScript("script/json_pull_connection.js");



//  personal_project_view Modal
$("#embed_form").on("click", ".personal_project_list a", function () {

  var appID = $(this).attr('id');  //$(this).get(0).id
  appID = String(appID);
  // var appTitle = $(this).text();
  
  // Remove dynamically added tag from modal
  $('#personal_project_view').on('hidden.bs.modal', function () {   //'shown.bs.modal'
    // console.log($('#personal_project_view').is(':visible'));
    // $("#personal_project_view").find(".modal-body").html("");
    $("#personal_project_view").find(".app-photo-id").remove();
    $("#personal_project_view").find(".app-photo-photo").remove();
    $("#personal_project_view").find("#app-photo #app-photo-header").remove();
  })

  ayJSON("/resource/portfolio/personal_project/personal_project.json", function (text) {

    // Get application properties from personal_preject.json file
    var data = JSON.parse(text);
    var appTitle = data[appID].title;
    var appDescription = data[appID].description;
    var appSourcelink = data[appID].link.sourcecode;
    var appLivelink = data[appID].link.live;
    var appPresentaionlink = data[appID].link.presentation;
    var appPhotourl = data[appID].link.photourl[0];
    var appPhotocount = data[appID].link.photourl[1];

    // Set application title & description into modal
    $("#personal_project_view").find("#app-title").text(appTitle);
    $("#personal_project_view").find("#app-description").text(appDescription);

    // Set project links into modal
    $("#personal_project_view").find("#app-sourcelink a").attr('target', '_blank').attr('href', appSourcelink).trigger('click');  //attr("href", appSourcelink);
    $("#personal_project_view").find("#app-livelink a").attr('target', '_blank').attr('href', appLivelink).trigger('click');
    $("#personal_project_view").find("#app-presentationlink a").attr('target', '_blank').attr('href', appPresentaionlink).trigger('click');

    // Set photo header into modal
    if(appPhotocount>0){
      $("#personal_project_view").find("#app-photo").append('<h5 id="app-photo-header">Project Photo</h5>');
    }

  // Set photos into modal
    var num = 0;
    while(appPhotocount>0){
      num += 1;
      var imgsource = appPhotourl + appID + "_" + num + ".jpg";
      $("#personal_project_view").find("#app-photo").append('<p class="app-photo-id">'+num+'.</p><img class="app-photo-photo" src="' + imgsource + '">');
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
