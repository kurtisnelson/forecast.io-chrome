if (!localStorage.isInitialized){
        localStorage.apiKey = "7fd8d8d5e7bc267b3b33360200e3a27d";
        localStorage.latLong = "33.771406,-84.3853";
}

function poll() {
        updateLocation();
        apiGet(); 
        chrome.browserAction.setTitle({title: localStorage.currentSummary});
        chrome.browserAction.setIcon({path: chrome.extension.getURL('icons/' + localStorage.currentIcon + '.png')});
}

function apiGet() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                        var resp = JSON.parse(xhr.responseText);
                        localStorage.currentSummary = resp.currently.summary;
                        localStorage.currentIcon = resp.currently.icon;
                        localStorage.currentTemp = resp.currently.temperature;
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
        if(alarm && alarm.name == 'poll'){
                poll();
        }
}
poll();
chrome.alarms.create("poll", {periodInMinutes: 8});
chrome.alarms.onAlarm.addListener(onAlarm);
