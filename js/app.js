$(document).ready(function() {

  //
  var aladin = A.aladin('#aladin-lite-div', {
      // target: "whirlpool",
      survey: "P/DSS2/color",
      fov: 0.4,
      showGotoControl: true,
      showFullscreenControl: true,
      showFrame: false,
  });

  //
  $('#selectedObjectsTable').dataTable( {
    "filter": true,
  });

  //
  $('.jumbotron').keypress(function(event) {
    if(event.which === 102) {
      // $('#aladin-lite-div').toggle();
    }
  });

  // Retrieve all sources from data-table
  var catalog = aladin.createCatalog();
  aladin.addCatalog(catalog);
  sources = [];
  var ra;
  var dec;
  var trs = $('.data-table tr');
  //
  for (var i=1; i<trs.length; i++) {
    ra = trs.eq(i).find('td').eq(1).html();
    dec = trs.eq(i).find('td').eq(2).html();
    sources.push(aladin.createSource(ra, dec));
  }
  catalog.addSources(sources);
  aladin.gotoPosition(sources[0].ra, sources[0].dec);
});
