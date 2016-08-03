function updateWeather(json){
  $("#location").text(json.name+", "+json.sys.country);
  $("#conditions").text(json.weather[0].description);
  $("#temperature").text(json.main.temp+"°C");
  $("#icon").html("<i class='wi wi-owm-"+json.weather[0].id+"'></i>");

}

var coords = {};

function getLocation(callback){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      $(coords).trigger("positionReady", position);
  });
}}

function getWeatherAtCoords(lat, lon, callback){
  //if no callback is given it writes the
  //reply to the log
  if (callback === undefined){
    callback = console.log;
  }
  $.getJSON("http://api.openweathermap.org/data/2.5/weather",
      {lat: lat,
       lon: lon,
       appid: "1eae30e4d32b455b6186088d36c0b4ca",
       units: "metric"},
       callback);
     }

$(document).ready(function(){
  getLocation();
  $(coords).on("positionReady", function(e, position){
    getWeatherAtCoords(position.coords.latitude, position.coords.longitude, updateWeather);
  });
});
