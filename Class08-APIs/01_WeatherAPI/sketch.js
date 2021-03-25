var weather_data;
var input;

var main_url = "http://api.openweathermap.org/data/2.5/weather?"
var qCity = "q=London"
var app_ID = "&appid=8fe05ac6547cefa20b40af1273a89ef3"
var metrics = "&units=metric"

var description;

// Called directly before setup(), the preload() function is used to handle 
// asynchronous loading of external files in a blocking way. If a preload function 
// is defined, setup() will wait until any load calls within have finished. Nothing 
// besides load calls (loadImage, loadJSON, loadFont, loadStrings, etc.) should be 
// inside the preload function.
function preload(){
  var url = main_url + qCity + app_ID + metrics;
  loadJSON(url, getWeather);
}

function getWeather(data){
  weather_data = data;
}

function setup() {
  createCanvas(400, 400);

  var button = select('button');
  input = select('#city');
  button.mousePressed(updateCity);
}

function updateCity(){
  qCity = "q=" + input.value();
  var url = main_url + qCity + app_ID + metrics;
  loadJSON(url, getWeather);
}

function draw() {
  background(220);
  
  // Grab the description, look how we can "chain" calls.
  description = weather_data.weather[0].main;
  
  if(description == "Clouds"){
    background('#C1BEBA');
  } else if (description == "Thunderstorm"){
    background('#003366');
  } else if (description == "Clear"){
    background('#87ceeb');
  }
  textSize(32);
  text(weather_data.name, 10,60);
  text("Temp: " + weather_data.main.temp, 10, 100);
  text("Description: " + description, 10, 140);
}
