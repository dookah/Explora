"use strict";

//Create an instance of the map
var map;

document.addEventListener("deviceready", yourCallbackFunction, false);

function yourCallbackFunction(){
    //Set the colour of the status bar if on android to match app theme
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#00C4A7");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

var onSuccess = function(position) {
    map.setCenter(new google.maps.LatLng(position.coords.latitude, 
        position.coords.longitude), 13);
};


//Only fires if error is thrown
function onError(error) {
    //Alert user of error 
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//Initilise map
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        disableDefaultUI: true
      });
}