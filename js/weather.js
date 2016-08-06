//Global var for coordinates
var coords = {};
var temp = {};

//Get coordinates from geoip API
function getGeoIP(){
  $.getJSON("https://geoip.nekudo.com/api/", function(json){
    coords.lat = json.location.latitude;
    coords.lon = json.location.longitude;
    $(coords).trigger("positionReady");
  });

}

//Get coordinates from navigator.geolocation and fallback to getGeoIP if fails
function getLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      coords.lat = position.coords.latitude;
      coords.lon = position.coords.longitude;
      $(coords).trigger("positionReady");
  }, getGeoIP);
}else{
  getgeoIP();
}}

//Make call to openweathermap api to get the weather at coordinates.
function getWeatherAtCoords(lat, lon, callback){
  //if no callback is given it writes the
  //reply to the log
  if (callback === undefined){
    callback = console.log;
  }
  $.getJSON("https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather",
      {lat: lat,
       lon: lon,
       appid: "1eae30e4d32b455b6186088d36c0b4ca",
       units: "metric"},
       callback);
     }

//Convert Celsius to Fahrenheit
function convertCtoF(C){
  return C*1.8+32;
}

//Update the html with the weather info on the json file
function updateWeather(json){
  temp.C = json.main.temp;
  temp.F = convertCtoF(temp.C);
  $("#location").text(json.name+", "+json.sys.country);
  $("#conditions").text(json.weather[0].description);
  $("#temperature-value").text(temp.C.toFixed(1)+"°C");
  $("#icon").html("<i class='wi wi-owm-"+json.weather[0].id+"'></i>");
  console.log(temp.F);
}

function switchUnits(){
  var newText = "";
  if($("#switch-units").text() == "show Fahrenheit"){
    $("#switch-units").text("show Celsius");
    newText = temp.F.toFixed(1)+"°F";
  }else{
    $("#switch-units").text("show Fahrenheit");
    newText = temp.C.toFixed(1)+"°C";
  }
  $("#temperature-value").text(newText);
}
//When page is ready get the location and update page
$(document).ready(function(){
  getLocation();
  $(coords).on("positionReady", function(e){
    getWeatherAtCoords(coords.lat, coords.lon, updateWeather);
  });
  $("#switch-units").on("click", switchUnits);
});
