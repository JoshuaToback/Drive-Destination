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
}

// Hide Search Screen
function displayRoad() {
    inputScreen.setAttribute('#hide-screen');
    roadScreen.setAttribute('#show-screen');
};

// AutoComplete
let autocomplete;
       function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(
          document.getElementById('autocomplete'),
          {
            types: ['establishment'],
            componentRestrictions: { country: ['US']},
            fields: ['place_id', 'geometry', 'name'],
          })
        }