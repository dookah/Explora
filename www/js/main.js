"use strict";

//Create an instance of the map
var map;
var map2;

//Device location
var lat;
var lng;

document.addEventListener("deviceready", deviceReady, false);

let titleSpans = document.getElementsByClassName("titleSpan");

function deviceReady() {
    //Set the colour of the status bar if on android to match app theme
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#00C4A7");
    }
    //Request devices location
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onError);

    //Function to get all messages from database
    getAllMessages();
};

//Fired when location is found
var onLocationSuccess = function (position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    //Set center of map to current location
    map.setCenter(new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude), 13);
    map2.setCenter(new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude), 13);

    $.get(`https://eu1.locationiq.com/v1/reverse.php?key=b6baabd45dc73a&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`, function (data) {
        for (let i = 0; i < titleSpans.length; i++) {
            titleSpans[i].textContent = data.address.city;
        }
    });
    markerFactory(position.coords.latitude, position.coords.longitude, "I want to die", "right now like wtf i really really hate my life lol. Tbh the world worst is the worst");
};


//Only fires if error is thrown
function onError(error) {
    //Alert user of error 
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}


//Initilise maps
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 13,
        disableDefaultUI: true
    });

    map2 = new google.maps.Map(document.getElementById('map2'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15,
        disableDefaultUI: true,
        draggable: false
    });

}


//Factory function to create markers
//IN: LATITUDE, LONGITUDE, TITLE OF MESSAGE, MESSAGE CONTENT
//OUT: MARKER ON MAP WITH CLICKABLE CONTENT
function markerFactory(latitude, longitude, title, message) {
    //Generate a json object for location
    var myLatLng = {
        lat: latitude,
        lng: longitude
    };
    //Generate a content string
    var contentString = contentStringFactory(title, message);
    //Create a new info window with the above content
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    //Set a marker with the above location
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
    marker.setMap(map);
}

//Takes a message and title and generates a marker
//IN: TITLE OF MESSAGE, MESSAGE CONTENT
//OUT: FORMATTED CONTENT STRING FOR MAP MARKERS
function contentStringFactory(title, message) {
    //generate a content string for the marker 
    var contentString = `<h1>${title}</h1>` +
        `<p>${message}</p>` +
        '<a class="button is-small is-fullwidth" onClick="saveMarker()">Save</a>';
    //return the generated string
    return contentString;
}

function getAllMessages() {

}

$(document).delegate('#Send', 'pageshow', function () {
    navigator.geolocation.getCurrentPosition(onLocationSuccessSend, onError);
});

//Fired when location is found
var onLocationSuccessSend = function (position) {

    $("#lat").val(lat);
    $("#lng").val(lng);
};