$(document).ready(function() {

    //Global Variables
    var cityName = "";
    var cityArray = [];

    // unique API key for my openWeather account
    var APIKey = "c1cabeb697dacad88448e7c4021a7ec7";

    


function init() {
    var storageCities = JSON.parse(localStorage.getItem("cityArray"));

    console.log(storageCities);

     if (storageCities !== null){
        cityArray = storageCities;
        

        for (i = 0; i < storageCities.length; i ++){
            var liEl = $("<li>").addClass("list-group-item").text(storageCities[i]);
            $("#storage-cities").append(liEl);
            cityName = storageCities[i];
        }

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
          
        // $("<section>").removeClass("d-none");
        
        // city name & current weather Icon
        var cityHeader = $("<h2>").text(response.name).addClass("p-2 m-2");
        var icon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        var currentIcon = $("<img>").attr("src", icon)
        var currentDate = $("<span>").text(" (" + dayjs().format('MM/DD/YYYY') + ")");
        
        //append city and icon together to appear on the same line
        cityHeader.append(currentDate, currentIcon);

        //current temperature
        var temperature = $("<p>").text("Temperature: " + Math.round(response.main.temp) + "°F").addClass("p-2 m-2");
        var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%").addClass("p-2 m-2");
        var windSpeed = $("<p>").text("Wind Speed: " + Math.round(response.wind.speed) + " MPH").addClass("p-2 m-2");

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        
        $("#current-conditions").append(cityHeader, temperature, humidity, windSpeed);



       var queryUrlUVIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude={minutely}&units=imperial&appid=" + APIKey;

        $.ajax ({
            url: queryUrlUVIndex,
            method: "GET"
        })
         .then(function(response){
           
            // var uvBadge = $("<button>").addClass("badge badge-danger").text(response.value);
            // write conditionals for badge color corresponding to UV index
            
            var uvIndex = $("<p>").text("UV Index: " + response.current.uvi).addClass("p-2 m-2");
            $("#current-conditions").append(uvIndex);

            // 5 DAY FORECAST 
            $("#forecast").empty();

            for (let i = 1; i < (response.daily.length) ; i++){
                if (i === 6) {
                    break;
                }
            
            // creates new div for 5 day forecast
           var newDiv = $("<div>").addClass("col-md-2 bg-primary text-white m-auto my-2 rounded");
           var date = "Date Placeholder"
           var icons = "https://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png"
           var forecastIcon = $("<img>").attr("src", icons)
           var forecastTemp = $("<p>").text("Temp: " + Math.round(response.daily[i].temp.max) + "°F");
            var forecastHumidity = $("<p>").text("Humidity: " + response.daily[i].humidity + "%");
   
            newDiv.append(date, forecastIcon, forecastTemp, forecastHumidity);
   
               $("#forecast").append(newDiv);
            }
         })
      })
    }

//FUNCTION CALLS
  init();

//EVENT LISTENERS
$("#city-form").on("submit", function(e){
    //prevents default refresh
    e.preventDefault();
    //takes in user city selection
    newCityName = $("#user-input").val();
    //adds user input to global variable
    cityName = newCityName;
    //pushes the newest searched city into the array for storage
    cityArray.push(cityName);
    // sets and stringifies the array for local storage
    localStorage.setItem("cityArray", JSON.stringify(cityArray));
    // calls weather function
    weather();

})



});


