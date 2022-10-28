// Global Variables
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

// DOM Elements
var innerContainer = document.querySelector('#inner-container');
var topBar = document.querySelector('#top-bar');
var inputBox = document.querySelector('#inputBox');
var roadScreen = document.querySelector('#roadScreen');



// Timezone Plug-Ins
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);
