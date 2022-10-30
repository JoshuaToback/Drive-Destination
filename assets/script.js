// // Global Variables

var googlePlacesAPIRootURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78&callback=initMap";
var googlePlacesKey = 'AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78'

// DOM Elements
var innerContainer = document.getElementById('inner-container');
var topBar = document.getElementById('top-bar');
var inputScreen = document.getElementById('input-screen');
var inputBox = document.getElementById('inputBox');
var roadScreen = document.getElementById('road-screen');
var storeLocation = localStorage.getItem('storeLocation')
var driveBtn = document.getElementById('getDrive');

// Map Initializer
let map;
function createMap() {
    map = new google.maps.Map(document.getElementById('map') , {
        zoom: 6,
        center: {}
    })
}


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
    console.log(departureLocation, arrivalLocation);
}


// Hide Search Screen
function displayRoad() {
  inputScreen.style.display = 'none';
// Show Results Screen
  roadScreen.style.display = 'block';
  getRoad()
}

function getRoad(departureLocation, arrivalLocation) {
  
};

// Search Functionality
driveBtn.addEventListener('click', displayRoad);