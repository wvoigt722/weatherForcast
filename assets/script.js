var searchMainEl = document.querySelector('#search-main');
var searchMainBtnEl = document.querySelector('#search-main-btn');
var pastSearchEl = document.getElementById('pastSearches');
var weatherInfoEl = document.querySelector('#currentWeather');
var weatherApiKey = '424b38ba3001e9ed90818dd50436deee';

var latitude = '';
var longitude =  '';

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
weatherInfoEl.textContent = '';
dayOneWeatherEl.textContent = '';
dayTwoWeatherEl.textContent = '';
dayThreeWeatherEl.textContent = '';
dayFourWeatherEl.textContent = '';
dayFiveWeatherEl.textContent = '';
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

    getCurrentWeather();
    getFiveDayWeather();
    renderPastSearch();
  
  
  })
  
  .catch(error => console.log('error', error));
  


  });



var getCurrentWeather = function() {

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


var getFiveDayWeather = function () {

fetch('https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=' + weatherApiKey + '&units=imperial' , {
  method: 'GET',
})

  .then((res) => res.json())
  .then((data) => {
      console.log('Successful POST request:', data);

    //day one

    var dayOneDateData = data.list[1].dt_txt.slice(0,10);
    var dayOneDate = document.createElement('h3');
    dayOneDate.innerHTML = `${dayOneDateData}`;

    var dayOneTemp = data.list[1].main.temp;
    var dayOneHum = data.list[1].main.humidity;
    var dayOneWind =data.list[1].wind.speed;
    var dayOneWeather = document.createElement('p');
    dayOneWeather.innerHTML = `Temprature: ${dayOneTemp}
    Humidity: ${dayOneHum}
    Wind Speed: ${dayOneWind}`;

  
    dayOneDateEl.append(dayOneDate);
    dayOneWeatherEl.append(dayOneWeather);

    console.log(dayOneDateData);

    //day two

    var dayTwoDateData = data.list[9].dt_txt.slice(0,10);
    var dayTwoDate = document.createElement('h3');
    dayTwoDate.innerHTML = `${dayTwoDateData}`;

    var dayTwoTemp = data.list[9].main.temp;
    var dayTwoHum = data.list[9].main.humidity;
    var dayTwoWind =data.list[9].wind.speed;
    var dayTwoWeather = document.createElement('p');
    dayTwoWeather.innerHTML = `Temprature: ${dayTwoTemp}
    Humidity: ${dayTwoHum}
    Wind Speed: ${dayTwoWind}`;


    dayTwoDateEl.append(dayTwoDate);
    dayTwoWeatherEl.append(dayTwoWeather);

    //day three

    var dayThreeDateData = data.list[17].dt_txt.slice(0,10);
    var dayThreeDate = document.createElement('h3');
    dayThreeDate.innerHTML = `${dayThreeDateData}`;

    var dayThreeTemp = data.list[17].main.temp;
    var dayThreeHum = data.list[17].main.humidity;
    var dayThreeWind =data.list[17].wind.speed;
    var dayThreeWeather = document.createElement('p');
    dayThreeWeather.innerHTML = `Temprature: ${dayThreeTemp}
    Humidity: ${dayThreeHum}
    Wind Speed: ${dayThreeWind}`;


    dayThreeDateEl.append(dayThreeDate);
    dayThreeWeatherEl.append(dayThreeWeather);

    //day four

    var dayFourDateData = data.list[25].dt_txt.slice(0,10);
    var dayFourDate = document.createElement('h3');
    dayFourDate.innerHTML = `${dayFourDateData}`;

    var dayFourTemp = data.list[25].main.temp;
    var dayFourHum = data.list[25].main.humidity;
    var dayFourWind =data.list[25].wind.speed;
    var dayFourWeather = document.createElement('p');
    dayFourWeather.innerHTML = `Temprature: ${dayFourTemp}
    Humidity: ${dayFourHum}
    Wind Speed: ${dayFourWind}`;



    dayFourDateEl.append(dayFourDate);
    dayFourWeatherEl.append(dayFourWeather);

    //day five

    var dayFiveDateData = data.list[33].dt_txt.slice(0,10);
    var dayFiveDate = document.createElement('h3');
    dayFiveDate.innerHTML = `${dayFiveDateData}`;

    var dayFiveTemp = data.list[25].main.temp;
    var dayFiveHum = data.list[25].main.humidity;
    var dayFiveWind =data.list[25].wind.speed;
    var dayFiveWeather = document.createElement('p');
    dayFiveWeather.innerHTML = `Temprature: ${dayFiveTemp}
    Humidity: ${dayFiveHum}
    Wind Speed: ${dayFiveWind}`;



    dayFiveDateEl.append(dayFiveDate);
    dayFiveWeatherEl.append(dayFiveWeather);
  })

  .catch((error) => {
    console.error('Error in POST request:', error);
  });


};

var renderPastSearch = function () {
var newSearchBtn = document.createElement('button'); 
newSearchBtn.innerHTML = searchMainEl.value;
newSearchBtn.classList = ('d-block');
console.log(newSearchBtn);
pastSearchEl.appendChild(newSearchBtn);
}

