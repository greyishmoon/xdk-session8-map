function onAppReady() {
    if( navigator.splashscreen && navigator.splashscreen.hide ) {   // Cordova API detected
        navigator.splashscreen.hide() ;
    }
    
    
    runOnLoad();
    
    
    
//    // Listener for button
//    $('#exampleButton').on("click", runFunction);
    
//    // Alternative button listener showing inline function
//    $('#exampleButton').on("click", function(){
//        runFunction();
//    });
    
}
document.addEventListener("app.Ready", onAppReady, false) ;


//function runFunction()
//{
//    $("#exampleText").text("TEXT WAS REPLACED!");
//    $("#exampleAppend").append(" APPENDED TEXT!");
////    alert("CLICKED");
//}

function runOnLoad(){
    alert("ASD");
    var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}
                              