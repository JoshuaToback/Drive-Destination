// // Global Variables

var googlePlacesAPIRootURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78&callback=initMap";
var googlePlacesKey = 'AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78'
var tripHistory = []

// DOM Elements
var innerContainer = document.getElementById('inner-container');
var topBar = document.getElementById('top-bar');
var inputScreen = document.getElementById('input-screen');
var inputBox = document.getElementById('inputBox');
var roadScreen = document.getElementById('road-screen');
var storeLocation = localStorage.getItem('storeLocation')
var driveBtn = document.getElementById('getDrive');
var result = document.getElementById('result');
var tripHistoryContainer = document.getElementById('trip-history');


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
  window.setInterval(function () {
    $('#clock').html(moment().format('ddd MM/DD/y H:mm:ss'))
}, 1000);
};
getTime();

var saveSearch = function() {
  localStorage.setItem('trip-History', JSON.stringify(tripHistory))
}

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
  tripHistory.push({
    origin: origin,
    destination: destination 
  })
  saveSearch();
}

function callback (response, status) {
  console.log("response", response)
  console.log("status", status)

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
  
  // // Map Initializer
function initMap() {
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  var ChapelHill = new google.maps.LatLng(35.9132, 79.0558);
  var mapOptions = {
    zoom: 6,
    center: ChapelHill
  }
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  directionsRenderer.setMap(map);
  directionsRenderer.setPanel(document.getElementById('directionsPanel'));

  var departure = document.getElementById('departureLocation').value;
  var arrival = document.getElementById('arrivalLocation').value;
  var request = {
    origin: departure,
    destination: arrival,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
      console.log('result', result);
      console.log('status', status);
      console.log ('map', map);
    }
  });
} ;


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
// Change Background Image
  innerContainer.style.backgroundImage = "url('https://www.travelyukon.com/sites/default/files/hero/2017-10/alaskahighway_fn.jpg')";
  innerContainer.style.backgroundRepeat = 'no-repeat';
  innerContainer.style.backgroundColor = 'skyblue';

  getRoad()
}

function getRoad() {
  distanceCalc()
  initMap()
};

// Search Functionality
driveBtn.addEventListener('click', displayRoad);

// // Search History
function renderSearchHistory() {
  tripHistoryContainer.innerHTML = '';

  // Starts at the end of TripHistory array and counts down the most recent search.
  for (var i = tripHistory.length - 1; i >= 0; i--) {
    var btn = document.createElement('button');
    btn.setAttribute('button');
    btn.classList.add('history-btn');

    btn.setAttribute('trip-search', tripHistory[i]);
    btn.textContent = tripHistory[i];
    tripHistoryContainer.append(btn);
    btn.addEventListener('click', function(e) {
      var trip = e.target.textContent;
      getRoad(trip);
    })
  }
}

function appendToHistory(search) {
  // If there's no search term, return the function as is.
  if (tripHistory.indexOf(search) !== -1) {
    return;
  }
  tripHistory.push(search)

  localStorage.setItem('trip-history', JSON.stringify(tripHistory));
  renderSearchHistory();
}

function initTripHistory() {
  var storedHistory = localStorage.getItem('trip-history');
  if (storedHistory) {
    tripHistory = JSON.parse(storedHistory)
  }
  renderSearchHistory();
}