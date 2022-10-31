// // Global Variables

var googlePlacesAPIRootURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78&callback=initMap";
var googlePlacesKey = 'AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78'
const cities = [ ];

// DOM Elements
var innerContainer = document.getElementById('inner-container');
var topBar = document.getElementById('top-bar');
var inputScreen = document.getElementById('input-screen');
var inputBox = document.getElementById('inputBox');
var roadScreen = document.getElementById('road-screen');
var storeLocation = localStorage.getItem('storeLocation')
var driveBtn = document.getElementById('getDrive');
// var departureLocation = document.getElementById('departureLocation');
// var arrivalLocation = document.getElementById('arrivalLocation');

// Map Initializer
let map;
function createMap() {
    map = new google.maps.Map(document.getElementById('map') , {
        zoom: 6,
        center: {}
    })
}


// AutoComplete
function initAutocomplete() {
  var departureLocations = new google.maps.places.Autocomplete(
    document.getElementById("departureLocation"),
      {
        types: ["establishment"],
        componentRestrictions: { country: ["US"] },
        fields: ["place_id", "geometry", "name"],
      })

  var arrivalLocations = new google.maps.places.Autocomplete(
    document.getElementById("arrivalLocation"),
    {
      types: ["establishment"],
      componentRestrictions: { country: ["US"] },
      fields: ["place_id", "geometry", "name"],  
    });

    // google.maps.event.addListener(departureLocations, "location_Change", () => {
    //   var departureLocation = departureLocations.getRoad()
    //   var departureAddress = departureLocation.formatted_address
    //   console.log(departureAddress);
    // });

    // google.maps.event.addListener(arrivalLocations, "location_Change", () => {
    //   var arrivalLocation = arrivalLocations.getRoad()
    //   var arrivalAddress = arrivalLocation.formatted_address
    //   console.log(arrivalAddress);
    // });
};

// // Distance Matrix
function distanceCalc() {
  var departure = $('#departure').val();
  var arrival = $('#arrival').val();
  var service = new google.maps.DistanceMatrixServ();
  service.getDistanceMatrix(
    {
      origins: [origin], 
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.unitSystem.IMPERIAL, 
      avoidHighways: false,
      avoidTolls: false,
    },
    callback()
  );
}

// function callback (response, status) {
//   if (status != google.maps.DistanceMatrixServ.OK)
// }

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