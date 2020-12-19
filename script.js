$(document).ready(function() {


    
    // unique API key for my openWeather account
    var APIKey = "c1cabeb697dacad88448e7c4021a7ec7";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Atlanta,Georgia&units=imperial&appid=" + APIKey; 

    // var cityName = "";
function weather() {
    $.ajax({
        url: queryURL,
        method: "GET"
    })
      .then(function(response) {
          
        console.log(response);
        
        // city name & current weather Icon
        var cityHeader = $("<h2>").text(response.name).addClass("p-2 m-2");
        var icon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        var currentIcon = $("<img>").attr("src", icon)
        //append city and icon together to appear on the same line
        cityHeader.append(currentIcon);

        //current temperature
        var temperature = $("<p>").text("Temperature: " + Math.round(response.main.temp) + "°F").addClass("p-2 m-2");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("p-2 m-2");
        var windSpeed = $("<p>").text("Wind Speed: " + Math.round(response.wind.speed) + " MPH").addClass("p-2 m-2");
        var uvIndex = $("<p>").text("UV Index Placeholder").addClass("p-2 m-2");
        // badge badge-danger (bootstrap badge class for UV Index)
        $("#current-conditions").append(cityHeader, temperature, humidity, windSpeed, uvIndex);

      })

      // 5 Day forecast call
      var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=Atlanta,Georgia&units=imperial&appid=" + APIKey;

      $.ajax ({
          url: queryURLForecast,
          method: "GET"
      })
        .then(function(response) {

            console.log(response);

            console.log(response.list);

            // for (let i = 6; i < response.list.length; i =+ 8){

                //creates new div for 
                var newDiv = $("<div>").addClass("col-2 bg-primary text-white ml-3 mb-3 rounded");

                var date = "Date Placeholder"
                //forecast icons
                var icons = "http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png"
                var forecastIcon = $("<img>").attr("src", icons)
                // forecast temperatures and humidity
                var forecastTemp = $("<p>").text("Temp: " + response.list[6].main.temp + "°F");
                var forecastHumidity = $("<p>").text("Humidity: " + response.list[6].main.humidity + "%");

                newDiv.append(date, forecastIcon, forecastTemp, forecastHumidity);

                $("#forecast").append(newDiv);
    
            // }

        })

    }
weather();

});


