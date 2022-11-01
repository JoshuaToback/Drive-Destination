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
var result = document.getElementById('result');

// // Map Initializer
// let map;
// function createMap() {
//     map = new google.maps.Map(document.getElementById('map') , {
//         zoom: 6,
//         center: {}
//     })
// }


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

    google.maps.event.addListener(departureLocations, "location_Change", () => {
      var departureLocation = departureLocations.getRoad()
      var departureAddress = departureLocation.formatted_address
      console.log(departureAddress);
    });

    google.maps.event.addListener(arrivalLocations, "location_Change", () => {
      var arrivalLocation = arrivalLocations.getRoad()
      var arrivalAddress = arrivalLocation.formatted_address
      console.log(arrivalAddress);
    });
};

function getTime() {
  var Time = moment().format('h:mm:ss a');
  var Date = moment().format("MMM Do YY");
  console.log('Time', Time, 'Date', Date);
  $('#currentDate').html(`Today Is ${Date}`);
  $('#currentTime').html(`It Is ${Time}`);
}

getTime();

// // Distance Matrix
function distanceCalc() {
  var origin = $('#departureLocation').val();
  var destination = $('#arrivalLocation').val();
  console.log("origin", origin)
  console.log("destination", destination)

  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [origin],
    destinations: [destination],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL,
    avoidHighways: false,
    avoidTolls: false,
  }, callback
  );
}

function callback (response, status) {
  console.log("response", response)
  console.log("status", status)
  // console.log("google", google.maps.DistanceMatrixService)
  // if (status != google.maps.DistanceMatrixService) {
  //   $('#result').html(err);
  // } else {
    var departure = response.originAddresses[0];
    console.log('departure', departure);
    var arrival = response.destinationAddresses[0];
    console.log('arrival', arrival);
    if (response.rows[0].elements[0].status === 'ZERO_RESULTS') {
      $('result').html(
        'There are no roads where you are going!' + departure + 
        "and" +
        arrival
      );
    } else {
      var distance = response.rows[0].elements[0].distance;
      console.log('distance', distance);
      var duration = response.rows[0].elements[0].duration;
      console.log('duration', duration);
      console.log(response.rows[0].elements[0].distance);
      var distance_in_kilo = distance.value / 1000; 
      var distance_in_miles = distance.value / 1609.34;
      console.log(distance_in_kilo);
      console.log(distance_in_miles);
      var duration_text = duration.text;
      $('#miles').html(
        `Distance in Miles: ${distance_in_miles.toFixed(2)} Miles`
        );
      $('#kilos').html(
        `Distance in Kilometers: ${distance_in_kilo.toFixed(2)} Km`
        );
      $('#text').html(`Distance in Minutes: ${duration_text}`);
      $('#departure').html(`Distance From: ${departure}`);
      $('#arrival').html(`Distance To: ${arrival}`);
      }
    }

  // Print Results on Drive Screen
  $('#result').submit(function (e) {
    e.preventDefault();
    distanceCalc();
  })


// Hide Search Screen
function displayRoad() {
  inputScreen.style.display = 'none';
// Show Results Screen
  roadScreen.style.display = 'block';
  getRoad()
}

function getRoad() {
  distanceCalc()
};

// Search Functionality
driveBtn.addEventListener('click', displayRoad);