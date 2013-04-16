var skycons = new Skycons();
var iconName = localStorage.currentIcon.toUpperCase().replace(/-/g, '_');
skycons.set("icon", Skycons[iconName]);
if(localStorage.currentIcon == "partly-cloudy-night") {
        skycons.set("icon", Skycons["PARTLY_CLOUDY_NIGHT"]);
}
skycons.play();
document.getElementById("temp").innerHTML = localStorage.currentTemp + "°";
