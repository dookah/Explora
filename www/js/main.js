"use strict";
//Create an instance of tboth main and send maps
var map;
var map2;
//Variables for devices CURRENT location
var lat;
var lng;
//Flips when location has been found intially
var intial = false;

//Get all the titles accross all the pages
let titleSpans = document.getElementsByClassName("titleSpan");

//Listens for when API ready
document.addEventListener("deviceready", deviceReady, false);
//Runs when API loaded
function deviceReady() {
    //Get the location searh bar
    let locationSearch = document.getElementById("locationSearch");
    //--- Functions to prevent the search box interupting the user ---
    document.getElementById("map").addEventListener("click", function () {
        locationSearch.blur();
    })
    document.getElementById("locationSearch").addEventListener("keydown", function (e) {
        if (e.keyCode == 13) {
            locationSearch.blur();
        }
    })

    // -- Set up the current location button --
    // On click move the map to the users location
    document.getElementById("currentLocation").addEventListener("click", function () {
        map.setCenter(new google.maps.LatLng(lat, lng));
    });

    //Set the colour of the status bar if on android to match app theme
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#00C4A7");
    }
    navigator.geolocation.getCurrentPosition(onLocationSuccess, onError);
    //Request device location if the user moves
    navigator.geolocation.watchPosition(onLocationSuccess, onError);

    //Function to get all messages from database
    getAllMessages();
};

//Fired when location is found
var onLocationSuccess = function (position) {
    //If just loaded app move main map to users location
    if (intial == false) {
        map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        //flip when map has updated
        intial = true;
    }
    //Update the global location variables with the users current location
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    //Set center of map to current location
    //Repeatedly resets map, removed due to feedback given. 
    //map.setCenter(new google.maps.LatLng(position.coords.latitude,position.coords.longitude));
    map2.setCenter(new google.maps.LatLng(position.coords.latitude,
        position.coords.longitude));

    //Reverse Geocode the coordinates using location iq API to get the city the user is currently in 
    $.get(`https://eu1.locationiq.com/v1/reverse.php?key=b6baabd45dc73a&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`, function (data) {
        for (let i = 0; i < titleSpans.length; i++) {
            //Update the title span class with the city returned from the api
            titleSpans[i].textContent = data.address.city;
        }
    });

    //Update Send pages lat and longi hidden form elements when location is updated
    $("#lat").val(lat);
    $("#lng").val(lng);

    //Render all markers again (Not most efficient but markers arent intensive)
    //Will need some refactoring when working at scale
    renderMarkers();
};

//Function to grab all markers from API database 
function renderMarkers() {
    //Call api to get all markers from the database
    $.get("https://cpd-app.herokuapp.com/getMessage", function (data) {
        //loop through each returned database item
        Object.keys(data).forEach(function (key) {
            //send data to marker factory to update map markers
            markerFactory(parseFloat(data[key].lat), parseFloat(data[key].lng), data[key].title, data[key].message);
        })
    });
}

//Only fires if error is thrown
function onError(error) {
    //Alert user of error 
    alert('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

//Initilise maps
function initMap() {
    //Set up main page map to random location in australia
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 13,
        disableDefaultUI: true
    });
    //Set up send page map to same location
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

//Function for search box 
document.getElementById("searchFormSubmit").addEventListener("click", function () {
    //Get the value of the searched input
    let searchCriteria = $("#locationSearch").val();
    //create an API URI with the search criteria
    let searchString = `https://eu1.locationiq.com/v1/search.php?key=b6baabd45dc73a&q=${searchCriteria}&format=json`;
    //Jquery Ajax request with the above string
    $.get(searchString, function (data) {
        //get the returned coordinates
        let searchlat = data[0].lat;
        let searchlng = data[0].lon;
        //set the map to the returned coordinates
        map.setCenter(new google.maps.LatLng(searchlat, searchlng));
    });

})