//NOTE - based on guide from http://www.gajotres.net/using-google-maps-javascript-api-v3-with-jquery-mobile/2/

function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    runOnLoad();
    
    // Button listeners
    $('#btnhome').on("click", function(){
        $("[data-role=panel]").panel("close");
        setloc(lochome, 16);
    });
    $('#btncathedral').on("click", function(){
        $("[data-role=panel]").panel("close");
        setloc(locCathedral, 17);
    });
    $('#btnuni').on("click", function(){
        $("[data-role=panel]").panel("close");
        setloc(locUni, 16);
    });
    $('#btnboston').on("click", function(){
        $("[data-role=panel]").panel("close");
        setloc(locboston, 12);
    });
    
    $('#btnhere').on("click", function(){
        $("[data-role=panel]").panel("close");
        getPosition();
    });
    
    // LIVE MOITORING - toggle switch to turn Geolocation.watchPosition() on/off
    $("#flip-loc").on( "change", function(){
        $("[data-role=panel]").panel("close");
        handleToggle();
    }); 


    
}
document.addEventListener("app.Ready", onAppReady, false) ;

var map;
var locHome, locCathedral, locUni, locboston;
var markHome, markCathedral, markUni, markboston;

function runOnLoad(){
    // MAP - Set content window size
    $('#content').height(getRealContentHeight());
    // This is the minimum zoom level that we'll allow
    var initZoomLevel = 15;
    
    // MAP - Create location LatLng's
    lochome = new google.maps.LatLng(52.215322, -2.347495);
    locCathedral = new google.maps.LatLng(52.188479, -2.221094);
    locUni = new google.maps.LatLng(52.198094, -2.242767);
    locboston = new google.maps.LatLng(42.360082, -71.058880);
    
    


    map = new google.maps.Map(document.getElementById('map_canvas'), {
        zoom: initZoomLevel,
        center: lochome,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    // MAP - Create markers
    markHome = new google.maps.Marker({
        position: lochome,
        title: 'Home'
    });  
    markCathedral = new google.maps.Marker({
        position: locCathedral,
        title: 'Cathedral'
    });  
    markUni = new google.maps.Marker({
        position: locUni,
        title: 'St Johns Campus'
    });
    markboston = new google.maps.Marker({
        position: locboston,
        title: 'Boston'
    });
    
    // MAP - Place markers
    markHome.setMap(map);
    markCathedral.setMap(map);
    markUni.setMap(map);
    markboston.setMap(map);
    
    

}

//Call this function when you want to get the current position
function getPosition() {
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}

//called when the position is successfully determined
function successPosition(position) {
    
    var long = position.coords.longitude;
	var lat = position.coords.latitude;
    var current = new google.maps.LatLng(lat, long);
    setloc(current, 17);
}

function failPosition(err) {
    alert('ERROR(' + err.code + '): ' + err.message);
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

function setloc(loc, zoom){
    //alert("ASDSF");
    map.setCenter(loc);
    map.setZoom(zoom);
}

//////////// LIVE MONITORING ///////////

// watchPosition ID returned by the current geoWatch - use to .clearWatch()
var watchID;

//Respond to changes in location moitoring toggle switch
function handleToggle() {
    // if toggle true, start geoWatch, otherwise turn off
    locWatchOn = $("#flip-loc").prop("checked");
    if (locWatchOn)
        {
            startWatch();
        } else {
            stopWatch();
        }	
}

function startWatch(){

    // Set options
    var locationOptions = { 
        maximumAge: 10000, 
        timeout: 6000, 
        enableHighAccuracy: true 
    };
    // Set geoWatch listener and save ID
    watchID = navigator.geolocation.watchPosition(success, fail);//, locationOptions);
    $('#monitorText').text("ON");
}


function stopWatch(){

    if (watchID) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
	}
    $('#monitorText').text("OFF");
}

function success(pos) {
    // get data
    var clong = pos.coords.longitude;
	var clat = pos.coords.latitude;
    var current = new google.maps.LatLng(clat, clong);
    
    map.setCenter(current);
}

function fail(err) {
    alert('ERROR(' + err.code + '): ' + err.message);
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

function setliveloc(loc){
    map.setCenter(loc);
}

                              
// MAP - function to get content window height
function getRealContentHeight() {
	var header = $.mobile.activePage.find("div[data-role='header']:visible");
	var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
	var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
	var viewport_height = $(window).height();

	var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
	if((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
		content_height -= (content.outerHeight() - content.height());
	} 
	return content_height;
}

