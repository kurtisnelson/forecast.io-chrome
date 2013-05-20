if (!localStorage.isInitialized){
        localStorage.apiKey = "7fd8d8d5e7bc267b3b33360200e3a27d";
        localStorage.latLong = "33.771406,-84.3853";
        localStorage.currentIcon = "partly-cloudy-night";
}
chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 255, 200]});
function poll() {
        updateLocation();
        apiGet(); 

        var weather = JSON.parse(localStorage.resp);
        localStorage.currentSummary = weather.currently.summary;
        localStorage.currentIcon = weather.currently.icon;
        localStorage.currentTemp = Math.floor(weather.currently.temperature);

        if (weather.hourly.data[0].precipProbability && weather.hourly.data[0].precipProbability > 0){
                if(!localStorage.rainPossible)
                        rainPossible();

                localStorage.rainPossible = true;
        }else{
                localStorage.rainPossible = false;
        }

        chrome.browserAction.setTitle({title: localStorage.currentSummary});
        chrome.browserAction.setBadgeText({text: Math.floor(localStorage.currentTemp) + "°"});
}

function rainPossible() {
    var notification = webkitNotifications.createHTMLNotification('rain.html');
    notification.show();
}

function apiGet() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                        localStorage.resp = xhr.responseText;
                }
        }
        xhr.open("GET", "https://api.forecast.io/forecast/"+localStorage.apiKey+"/"+localStorage.latLong, true);
        xhr.send();
}

function updateLocation() {
        if (navigator.geolocation) {
                navigator.geolocation.watchPosition(function(position) {
                        localStorage.latLong = position.coords.latitude + "," + position.coords.longitude;
                });
                return true;
        }else{
                return false;
        }
}

function onAlarm(alarm) {
        if(alarm){
                console.log("polling...");
                poll();
        }
}
poll();
chrome.alarms.create("poll", {periodInMinutes: 8});
chrome.alarms.onAlarm.addListener(onAlarm);
