$.getScript("script/json_pull_connection.js");

//  personal_project_view Modal
$("#embed_form").on("click", ".personal_project_list a", function () {

  var appID = $(this).attr('id');  //$(this).get(0).id
  //console.log(appID);
  var appTitle = $(this).text();

  ayJSON("/resource/portfolio/personal_project/personal_project.json", function (text) {
    var data = JSON.parse(text);
    console.log(data);
  });

  $("#personal_project_view").find("#app-title").text(appTitle);
  $('#personal_project_view').modal('show');
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
