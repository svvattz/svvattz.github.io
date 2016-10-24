// pseudo namespaces
var opal = {}; // Observation Preparations with Aladin Lite
var swastro = {};  // Swatters' Astro

// Takes a Right-Ascension and Declination coordinate string.  Returns a 2 element array of the coordinates in decimal degree format.
// Throws a FormatError if the input string is not properly formatted.
// Throws a ValidityError if it is not a valid sky position.
swastro.coordstr_toArray = function(coordstr) {

  // The regular expression pattern for coordinates in decimal degree format.
  var decdegree_patt = /^\d{1,3}(\.\d*)?\s[+-]?\d{1,2}(\.\d*)?$/;

  // If coordstr matches the decimal degree pattern then check that they're valid Right Ascension and Declination values.  If valid nothing more needs to be done so return the coordinates.
  if (decdegree_patt.test(coordstr)) {
    var coords = coordstr.split(" ");
    if ((Number(coords[0]) <= 360.0) &&
        (Math.abs(Number(coords[1]))) <= 90.0) {
      return coords;
    };
  }

  // coordstr isn't in decimal decgree format so check if it's in hours, minutes, seconds, degrees, arcminutes, and arcseconds format.
  var ra_hrs;
  var ra_mins;
  var ra_secs;
  var dec_degs;
  var dec_mins;
  var dec_secs;

  // Regular expression pattern for coordinates in HMS DMS format delimited by H,M,S,D,M,S (e.g. 23H12M4.32S -7D34M45.64S).
  var hms_patt = /^\d{1,2}[hH]\d{1,2}[mM]\d{1,2}(\.\d*)?[sS]\s[+-]?\d{1,2}[dD]\d{1,2}[mM]\d{1,2}(\.\d*)?[sS]$/;

  // Regular expression for coordinates in HMS DMS format delimited by colons (e.g. 23:12:4.32 -7:34:45.64).
  var hmscolon_patt = /^\d{1,2}:\d{1,2}:\d{1,2}(\.\d*)?\s[+-]?\d{1,2}:\d{1,2}:\d{1,2}(\.\d*)?$/;

  // Regular expression for coordinates in HMS DMS format delimited by spaces (e.g. 23 12 4.32 -7 34 45.64).
  var hmsspace_patt = /^\d{1,2}\s\d{1,2}\s\d{1,2}(\.\d*)?\s[+-]?\d{1,2}\s\d{1,2}\s\d{1,2}(\.\d*)?$/;

  // If coordstr uses H,M,S,D,M,& S as delimiters for the coordinate components in HMS DMS.
  if (hms_patt.test(coordstr)) {

    //
    var tmp = coordstr.split(" ");
    var ra = tmp[0];
    var dec = tmp[1];

    //
    var hrs_patt = /^\d{1,2}(?=H|h)/;
    var degs_patt = /[+-]?\d{1,2}(?=D|d)/;
    var mins_patt = /\d{1,2}(?=[mM])/;
    var secs_patt = /\d{1,2}(\.\d*)?(?=[sS])/;

    //
    ra_hrs = ra.match(hrs_patt)[0];
    ra_mins = ra.match(mins_patt)[0];
    ra_secs = ra.match(secs_patt)[0];

    //
    dec_degs = dec.match(degs_patt)[0];
    dec_mins = dec.match(mins_patt)[0];
    dec_secs = dec.match(secs_patt)[0];

  // If coordstr uses colons as delimiters for the coordinate components in HMS DMS.
  } else if (hmscolon_patt.test(coordstr)) {

    // Split coordstr into a 2 element array
    var tmp = coordstr.split(" ");

    // Split the RA into its components (Hours, Minutes, Seconds)
    var tmp_ra = tmp[0].split(":");
    ra_hrs = tmp_ra[0];
    ra_mins = tmp_ra[1];
    ra_secs = tmp_ra[2];

    // Split the Dec into its components (degrees, arcminutes, arcseconds)
    var tmp_dec = tmp[1].split(":");
    dec_degs = tmp_dec[0];
    dec_mins = tmp_dec[1];
    dec_secs = tmp_dec[2];

  // If coordstr uses spaces as delimiters for the coordinate components in HMS DMS.
  } else if (hmsspace_patt.test(coordstr)) {

    // Split coordstr into the coordinate components
    var tmp = coordstr.split(" ");
    ra_hrs = tmp[0];
    ra_mins = tmp[1];
    ra_secs = tmp[2];
    dec_degs = tmp[3];
    dec_mins = tmp[4];
    dec_secs = tmp[5];

  // If coordstr doesn't match one of the HMS DMS patterns throw a FormatError
  } else {
    throw "FormatError";
  };

  // Check that the HMS and DMS are valid Right Ascension and Declination coordinates otherwise throw a ValidityError
  if ((ra_hrs >= 0 && ra_hrs <= 23) && (ra_mins >= 0 && ra_mins <= 59) && (ra_secs >= 0.0 && ra_secs < 60.0) && (( (dec_degs == 90 || dec_degs == -90) && dec_mins == 0 && dec_secs == 0) || (dec_degs > -90 && dec_degs <  90)) && (dec_mins >= 0 && dec_mins <= 59) && (dec_secs >= 0.0 && dec_secs < 60.0)) {

    // Convert Righ Ascension to decimal degrees
    var ra_ddegs = (ra_hrs * 15.0) + (ra_mins / 4.0) + (ra_secs / 240.0);

    // Convert Declination to decimal degrees.  Take into account the sign (+ or -) of dec_degs
    var dec_ddegs_part = (dec_mins / 60.0) + (dec_secs / 3600.0);
    var dec_ddegs = (dec_degs >= 0) ?
      ((dec_degs / 1.0) + dec_ddegs_part) :
      ((dec_degs / 1.0) - dec_ddegs_part);

    // Return the decimal degree formatted Right-Ascension and Declination coordinates in an array
    return[ra_ddegs, dec_ddegs];

  } else {
    throw "ValidityError"; // Coordinate is properly formatted but not valid
  }
}

$(document).ready(function() {

  // Initialization of Aladin Lite
  var aladin = A.aladin('#aladin-lite-div', {
    survey: "P/DSS2/color",
    cooFrame: "ICRS",
    showGotoControl: false,
    showFullscreenControl: true,
    showFrame: true,
    //target: 'M 45',
    //fov: 5,
  });

  // A click event listener for the "Go" button which centers Aladin's FOV on the sky position entered in the text field #txt-coordinates
  $('#btn-go').click(function(e){
    // Keep the page from refreshing after the button click
    e.preventDefault();

    // Get the users' coordinate input string and trim leading and trailing white spaces
    var coordstr = $('#txt-coordinates').val().trim();

    // Convert the coordstr into sky coordinates in decimal degrees, center Aladin's FOV on it, and clear the users' text. If the coordinate input string is improperly formatted or not a valid sky position warn the user and do nothing.
    var coords;
    try {
      coords = swastro.coordstr_toArray(coordstr);
      aladin.gotoRaDec(coords[0], coords[1]);
      $('#txt-coordinates').val("");
    } catch (err) {
      if (err == "FormatError") {
        window.alert("Input Error:\n\n\t" + coordstr + "\n\nCannot be parsed into coordinates.  Check formatting.");
      } else if (err == "ValidityError") {
        window.alert("Validity Error:\n\n\t" + coordstr + "\n\nIs not a valid RA Dec sky coordinate.  Check coordinates.")
      } else {
        window.alert("Runtime Error:\n\n\t" + err);
      }
    }
  });












  //
  $('#selectedObjectsTable').dataTable( {
    "filter": true,
  });

  //
  $('.jumbotron').keypress(function(event) {
    //if(event.which === 102) {
    //  $('#aladin-lite-div').toggle();
    //}
  });


// TESTING: Load a catalog from Vizier and display it in Aladin Lite
//  aladin.addCatalog(A.catalogFromVizieR('I/311/hip2', 'M 45', 4.2, {onClick: 'showTable', name: 'HIP2', sourceSize:12, color: '#cc99bb', displayLabel: 'true', labelColumn: "HIP", labelColor: '#ae4', labelFont: '12px sans-serif'}));
//  aladin.addCatalog(A.catalogFromVizieR('ucac4', 'M 45', 0.07, {onClick: 'showTable', name: 'UCAC4', sourceSize:12, color: '#cc99bb', displayLabel: 'true', labelColumn: "UCAC4", labelColor: '#ae4', labelFont: '12px sans-serif'}));
//  aladin.gotoRaDec(058.25680831,	+20.20803688);

  // Retrieve all sources from data-table
//  var catalog = A.catalog({
//    name: "Test Catalog",
//    shape: "square",
//    color: "yellow",
//  });
//
//  aladin.addCatalog(catalog);
//  sources = [];
//  var ra;
//  var dec;
//  var trs = $('.data-table tr');
//  //
//  for (var i=1; i<trs.length; i++) {
//    ra = trs.eq(i).find('td').eq(1).html();
//    dec = trs.eq(i).find('td').eq(2).html();
//    sources.push(aladin.createSource(ra, dec));
//  }
//  catalog.addSources(sources);
//  aladin.gotoPosition(sources[0].ra, sources[0].dec);
});
