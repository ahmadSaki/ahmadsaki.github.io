
function cvDownload(x) {
  var current_view = $(location).attr('hash');
  var url;

  if (x == "googleDirveURL") {
    var url = 'https://bit.ly/2SGTSxs';
  };

  if (x == "localResourceURL") {
    var url = 'resource/AHMAD-SAKI_CV.pdf';
  };
  
  document.getElementById("cvLink").href=current_view;
  window.open(url, 'Download');
  
  // window.alert(current_view)
} 