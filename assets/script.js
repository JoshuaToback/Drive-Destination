// Global Variables
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

var googlePlacesAPIRootURL = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78&callback=initMap";
var googlePlacesKey = 'AIzaSyDzsqpnaACAqQPCIPWwjt3yAA-Vyy29Z78'

// DOM Elements
var innerContainer = document.querySelector('#inner-container');
var topBar = document.querySelector('#top-bar');
var inputBox = document.querySelector('#inputBox');
var roadScreen = document.querySelector('#roadScreen');



// Timezone Plug-Ins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);