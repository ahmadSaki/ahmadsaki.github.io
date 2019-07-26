
function cvDownload(x) {
  var url;

  if (x == "googleDirveURL") {
    var url = 'https://bit.ly/2SGTSxs';
  };

  if (x == "localResourceURL") {
    var url = 'resource/AHMAD-SAKI_CV.pdf';
  };

  window.open(url, 'Download');

  // window.alert(x)
} 