// // Global Variables

var googlePlacesAPIRootURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78&callback=initMap";
var googlePlacesKey = 'AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78'

// DOM Elements
var innerContainer = document.querySelector('#inner-container');
var topBar = document.querySelector('#top-bar');
var inputScreen = document.querySelector('#input-screen');
var inputBox = document.querySelector('#inputBox');
var roadScreen = document.querySelector('#roadScreen');


// Map Initializer
let map;
function createMap() {
    map = new google.maps.Map(document.getElementById('map') , {
        zoom: 6,
        center: {}
    })
}

// Search Functionality
function getDriving(departureLocation, arrivalLocation) {
    displayRoad();
    document.getElementById("getDrive").innerHTML;
}

// Hide Search Screen
function displayRoad() {
    inputScreen.setAttribute('#hide-screen');
    roadScreen.setAttribute('#show-screen');
};

// AutoComplete
let departureLocation;
       function initAutocomplete() {
        departureLocation = new google.maps.places.Autocomplete(
          document.getElementById("departureLocation"),
          {
            types: ["establishment"],
            componentRestrictions: { country: ["US"] },
            fields: ["place_id", "geometry", "name"],
          })

let arrivalLocation;          
        arrivalLocation = new google.maps.places.Autocomplete(
        document.getElementById("arrivalLocation"),
    {
      types: ["establishment"],
      componentRestrictions: { country: ["US"] },
      fields: ["place_id", "geometry", "name"],  
    });

    departureLocation.addListener('place_changed', onPlaceChanged);
            function onPlaceChanged() {
            var place = departureLocation.getPlace();

            if (!place.geometry) {
                document.getElementById('departureLocation').placeholder = 'Enter a place';
            } else {
                document.getElementById('details').innerHTML = place.name;
            }   
        }


}
          
