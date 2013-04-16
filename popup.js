var skycons = new Skycons();
if(localStorage.currentIcon == "partly-cloudy-night") {
        skycons.set("icon", Skycons.PARTLY_CLOUDY_NIGHT);
}
skycons.play();
