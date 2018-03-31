$(document).ready(function () {
    var lat;
    var long;
    var temp;
    var temp_in_f;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            $("#data").text("Fetching the latest temperature")
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
            temp = json.main.temp;
            temp_in_f = convertToFahrenheit(temp);
            console.log(temp)
            $("#data").text(temp + " °C")
            $("#data").addClass("bg-success")
            if (temp >= 25) {
                $("#weather-img").css("background-image", 'url("img/desert.jpg")');
                $("#weather-img").addClass("bg");
            } else if (temp < 25 && temp > 10) {
                $("#weather-img").css("background-image", 'url("img/beach.jpg")');
                $("#weather-img").addClass("bg");
            } else {
                $("#weather-img").css("background-image", 'url("img/ice.jpg")');
                $("#weather-img").addClass("bg");
            }                                               
        });
    }

    $(".change-std").click(function () {
        if($(this).val() == "celsius") {
            $("#data").text(temp + " °C")
        } else {
            $("#data").text(temp_in_f + " °F")
        }
    });

    function convertToFahrenheit(val) {
        return val * 9 / 5 + 32;
    }
})