$(document).ready(function () {
    var lat;
    var long;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            sendURL();
        });
    }

    function sendURL() {
        var url = "http://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
        $.getJSON(url, function (json) {
                // {
                //     "coord": {"lon": 77.64, "lat": 12.91},
                //     "weather": [{
                //         "id": 802,
                //         "main": "Clouds",
                //         "description": "scattered clouds",
                //         "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F03d.png?1499366020890"
                //     }],
                //     "base": "stations",
                //     "main": {"temp": 33, "pressure": 1012, "humidity": 38, "temp_min": 33, "temp_max": 33},
                //     "visibility": 8000,
                //     "wind": {"speed": 2.6, "deg": 260},
                //     "clouds": {"all": 40},
                //     "dt": 1522398600,
                //     "sys": {
                //         "type": 1,
                //         "id": 7823,
                //         "message": 0.144,
                //         "country": "IN",
                //         "sunrise": 1522370819,
                //         "sunset": 1522414853
                //     },
                //     "id": 1277333,
                //     "name": "Bangalore",
                //     "cod": 200
                // }
            var temp = json.main.temp;
            console.log(temp)
            $("#data").text(temp)
            if (temp >= 25) {
                $("body").css("background-color", "red");
            } else if (temp < 25 && temp > 10) {
                $("body").css("background-color", "yellow");
            } else {
                $("body").css("background-color", "offwhite");
            }
        });
    }
})