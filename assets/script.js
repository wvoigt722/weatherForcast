var searchMainEl = document.querySelector('#search-main');
var searchMainBtnEl = document.querySelector('#search-main-btn');
var weatherInfoEl = document.querySelector('#currentWeather');
var weatherApiKey = '424b38ba3001e9ed90818dd50436deee';

var latitude = 41.8781;
var longitude =  -87.6298;

var dayOneDateEl = document.querySelector('#dayOneDate');
var dayTwoDateEl = document.querySelector('#dayTwoDate');
var dayThreeDateEl = document.querySelector('#dayThreeDate');
var dayFourDateEl = document.querySelector('#dayFourDate');
var dayFiveDateEl = document.querySelector('#dayFiveDate');

var dayOneWeatherEl = document.querySelector('#dayOneWeather');
var dayTwoWeatherEl = document.querySelector('#dayTwoWeather');
var dayThreeWeatherEl = document.querySelector('#dayThreeWeather');
var dayFourWeatherEl = document.querySelector('#dayFourWeather');
var dayFiveWeatherEl = document.querySelector('#dayFiveWeather');

// Event Listeners


searchMainBtnEl.addEventListener('click', function() {
weatherInfoEl.classList.remove('d-none');
});


searchMainBtnEl.addEventListener('click', function() {
    console.log(searchMainEl.value);
    


 // Geocode API

var city = searchMainEl.value;
       
var requestOptions = {
 method: 'GET',
};
  
    fetch(
    
    'https://api.geoapify.com/v1/geocode/search?text=' + city + '&apiKey=51181722fe3645919bd3cf77a3c846e9', 
    
  
  requestOptions)
  .then(response => response.json())
  .then(result => { 
    
    console.log(result);
    
    console.log(result.features[0].bbox[0]);
    console.log(result.features[0].bbox[1]);
    
    // eventually to be stored in main lat and long vars
    longitude = result.features[0].bbox[0];
    latitude  = result.features[0].bbox[1];

    getWeather();
  
  
  })
  
  .catch(error => console.log('error', error));
  


  });



var getWeather = function() {

  // Weather API

  fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey + '&units=imperial' , {
    method: 'GET',
})

    .then((res) => res.json())
    .then((data) => {
        console.log('Successful POST request:', data);



      // Name of City
  
      var cityName = data.city.name;

      var cityNameEl = document.createElement('p');

      cityNameEl.innerHTML = '<strong>City:</strong> ' + cityName;

      weatherInfoEl.append(cityNameEl);
      console.log(cityName);


      // Temp of City
      
      var cityTemp = data.list[0].main.temp;

      var cityTempEl = document.createElement('p');

      cityTempEl.innerHTML = '<strong>Current Tempt:</strong> ' + cityTemp + '° fahrenheit';


      weatherInfoEl.append(cityTempEl);    


      // Weather of City

      var cityWeather = data.list[0].weather[0].main;
      var cityWeatherDes = data.list[0].weather[0].description;
      var cityWind = data.list[0].wind.speed;

      var cityWeatherEl = document.createElement('p');
      cityWeatherEl.innerHTML = '<strong>Current Weather:</strong> ' + cityWeather + '<strong> Description: </strong>' + cityWeatherDes;

      var cityWindEl = document.createElement('p');
      cityWindEl.innerHTML = '<strong>Wind Speed:</strong> ' + cityWind;

      weatherInfoEl.append(cityWeatherEl);
      weatherInfoEl.append(cityWindEl);


        return data;
    })
    .catch((error) => {
        console.error('Error in POST request:', error);
      });

 
};
