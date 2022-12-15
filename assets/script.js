var searchMainEl = document.querySelector('#search-main');
var searchMainBtnEl = document.querySelector('#search-main-btn');

searchMainBtnEl.addEventListener('click', function() {
    console.log(searchMainEl.value);
    
    
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
    latitude = result.features[0].bbox[1];
    longitude = result.features[0].bbox[0];
  
  
  })
  
  .catch(error => console.log('error', error));
  
  
  });