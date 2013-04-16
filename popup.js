var skycons = new Skycons();
var iconName = localStorage.currentIcon.toUpperCase().replace(/-/g, '_');
skycons.set("icon", Skycons[iconName]);
if(localStorage.currentIcon == "partly-cloudy-night") {
        skycons.set("icon", Skycons["PARTLY_CLOUDY_NIGHT"]);
}
skycons.play();
document.getElementById("temp").innerHTML = localStorage.currentTemp + "&deg;";

var weather = JSON.parse(localStorage.resp);
var high = Math.floor(weather.daily.data[0].temperatureMax);
document.getElementById("high").innerHTML = high + "&deg;";
var low = Math.floor(weather.daily.data[0].temperatureMin);
document.getElementById("low").innerHTML = low + "&deg;";
var precipChance = 0;
if (weather.daily.data[0].precipIntensity) {
  precipChance = weather.daily.data[0].precipIntensity;
  var message = "Rain possible today";
  if (weather.daily.data[0].precipIntensityMax >= 0.017)
          message = "Light rain today";
  if (weather.daily.data[0].precipIntensityMax >= 0.1)
          message = "An umbrella is a good idea today";
  if (weather.daily.data[0].precipIntensityMax >= 0.4)
          message = "Carry a good umbrella today";
  document.getElementById("precip").innerHTML = message;
}
