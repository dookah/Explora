"use strict";

//Create an instance of the map
var map;
var map2;

document.addEventListener("deviceready", deviceReady, false);

function deviceReady(){
    //Set the colour of the status bar if on android to match app theme
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#00C4A7");
    }
    //Request devices location
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onError);
};

//Fired when location is found
var onLocationSuccess = function(position) {
    //Set center of map to current location
    map.setCenter(new google.maps.LatLng(position.coords.latitude, 
        position.coords.longitude), 13);
    map2.setCenter(new google.maps.LatLng(position.coords.latitude, 
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

    map2 = new google.maps.Map(document.getElementById('map2'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 15,
        disableDefaultUI: true,
        draggable: false
      });
}
