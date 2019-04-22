"use strict";

document.addEventListener("deviceready", yourCallbackFunction, false);

function yourCallbackFunction(){
    //Set the colour of the status bar if on android to match app theme
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#00C4A7");
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
};

var onSuccess = function(position) {
    alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');
};
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

var map;
function initMap(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8,
        disableDefaultUI: true
      });
}