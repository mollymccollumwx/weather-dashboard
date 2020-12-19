$(document).ready(function() {

    //Global Variables
    var cityName = "";

    // unique API key for my openWeather account
    var APIKey = "c1cabeb697dacad88448e7c4021a7ec7";


function init() {
    var storageCity = localStorage.getItem("cityName");

    console.log(storageCity);

    if (cityName === ""){
        cityName = storageCity;

        // var liEL = $("<li>").addClass("list-group-item").text(cityName);
        // $("#storage-cities").append(liEl);

        
    }
    weather();
}

//uses open weather API to get current conditions and 5 day forecast
function weather() {
    //clear out current city forecast
    $("#current-conditions").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&units=imperial&appid=" + APIKey; 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
      .then(function(response) {
          
    
        
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

      // 5 Day forecast API call
      var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q="+ cityName +"&units=imperial&appid=" + APIKey;

      $.ajax ({
          url: queryURLForecast,
          method: "GET"
      })
        .then(function(response) {
            // clear out current 5 day forecast 
            $("#forecast").empty();

            console.log(response);

    

            // for (let i = 6; i < response.list.length; i =+ 8){

                //creates new div for 
                var newDiv = $("<div>").addClass("col-md-2 bg-primary text-white ml-3 mb-3 rounded");

                var date = "Date Placeholder"
                //forecast icons
                var icons = "http://openweathermap.org/img/w/" + response.list[6].weather[0].icon + ".png"
                var forecastIcon = $("<img>").attr("src", icons)
                // forecast temperatures and humidity
                var forecastTemp = $("<p>").text("Temp: " + Math.round(response.list[6].main.temp) + "°F");
                var forecastHumidity = $("<p>").text("Humidity: " + response.list[6].main.humidity + "%");

                newDiv.append(date, forecastIcon, forecastTemp, forecastHumidity);

                $("#forecast").append(newDiv);
    
            // }

        })

    }

//FUNCTION CALLS
init();

//EVENT LISTENERS
$("#city-form").on("submit", function(e){
    //prevents default refresh
    e.preventDefault();
    console.log("you submitted the form");

    //takes in user city selection
    newCityName = $("#user-input").val();
    //clears out cityName global variable
    cityName = "";
    //adds user input to global variable
    cityName = cityName + newCityName;
    console.log(cityName);

    localStorage.setItem("cityName", cityName);
    //calls weather function
    weather();

})



});


