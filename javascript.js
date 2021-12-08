var mymap = L.map('map').setView([47.418009, -122.316554], 9);
var basemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/outdoors-v11",
    accessToken: 'pk.eyJ1IjoidGJyYWRlIiwiYSI6ImNrd3d5czUzdTA4Z20ycHIwcXE3dXZvN28ifQ.WhDQrNKpC7xIqKNghlkMdg'
}).addTo(mymap);

$.getJSON("Cities_ACF.json",function(data){
  L.geoJson(data, {style : {color: "#FF2D00", fillOpacity: "0", weight: "3"},
  onEachFeature: function(feature, layer) {
  var marker = L.popup()
  layer.bindPopup("City Name: " + feature.properties.CITY_NM)
  return marker;
}
  }).addTo(mymap);
});

var Legend1 = L.control.Legend({
    position: "bottomright",
    title: "Distribution of African clawed frog",
    legends: [{
                label: "Cities with ACF",
                type: "rectangle",
                color: "#FF2D00",
                fillColor: "#FF2D00",
                weight: 3,
                fillOpacity: "0"
            },
              { label: "Locations of Known Sightings",
                type: "circle",
                color:"#000000",
                fillColor: "#FF8700",
                weight: 1,
                fillOpacity: "1"
         }]
  }).addTo(mymap);

const geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

const markers = L.markerClusterGroup();

$.getJSON("ACF_Location_Points.json", function(data){
  L.geoJson(data, {style : {color: "#FF8700", fillOpacity: "1.0"}, //add comma
  pointToLayer: function (feature, latlng){
    var points = L.circleMarker(latlng, geojsonMarkerOptions);
    points.bindPopup("Site Name: " + feature.properties.Name + "<br>" + "Latitude: " + feature.properties.lat + "<br>" + "Longitude: " + feature.properties.lon);
    return markers.addLayer(points);
  }
}).addTo(mymap);

mymap.addLayer(markers);
});


var map = L.map('map2').setView([47.418009, -122.316554], 9);
var basemap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/outdoors-v11",
    accessToken: 'pk.eyJ1IjoidGJyYWRlIiwiYSI6ImNrd3d5czUzdTA4Z20ycHIwcXE3dXZvN28ifQ.WhDQrNKpC7xIqKNghlkMdg'
    }).addTo(map);

$.getJSON("2km_Buffer_ACF.json", function(data){
  L.geoJson(data, {style : {color: "#FF2D00", fillOpacity: "0.5"}
}).addTo(map);
});

var Legend2 = L.control.Legend({
    position: "bottomright",
    title: "Potential Distribution of African clawed frog",
    legends: [{
                label: "Possible spread (2km buffer from origin)",
                type: "circle",
                color: "#FF2D00",
                fillColor: "#FF2D00",
                weight: 2,
                fillOpacity: "0.5"
            }]
  }).addTo(map);


  var images = {                 //Quiz      code between the 'Quiz' comments was acquired from https://www.sanwebcorner.com/2021/04/picture-quiz-using-javascript.html
  "?"  : "Africanclawedfrog.jpg",
  "????" : "SwimmingAfricanClawedfrogs.jpg",
  "??????" : "tadpoleAfricanClawedfrog.jpg",
  "?????"   : "tadpolePacificChorusfrog.jpg",
  "??"   : "bullfrog.jpg",
  "???"   : "pacificchorusfrog.jpg"

  }
  function populate() {
  if (quiz.isEnded()) {
  showScores();
  } else {
  // show question                                   show question comment came with the downloaded code
  var element = document.getElementById("question");
  element.innerHTML = quiz.getQuestionIndex().text;

  // show options                                    show options comment came with the downloaded code
  var choices = quiz.getQuestionIndex().choices;
  for (var i = 0; i < choices.length; i++) {
  var element = document.getElementById("choice" + i);
  element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
  guess("btn" + i, choices[i]);
  }

  showProgress();
  }
  };

  function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
  quiz.guess(guess);
  populate();
  }
  };

  function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
  };

  function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
  };

  // create questions                                          create questions comment came with the downloaded code.  Image names were changed and questions were reduced.
  var questions = [
  new Question("Which one is the African clawed frog?", ["?", "??"], "?"),
  new Question("Which one is the African clawed frog", ["???", "????"], "????"),
  new Question("Which one is the African clawed frog", ["?????", "??????"], "??????")
  ];

  function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
  }

  Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
  }


  function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
  }

  Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
  }

  Quiz.prototype.guess = function(answer) {
  if (this.getQuestionIndex().isCorrectAnswer(answer)) {
  this.score++;
  }

  this.questionIndex++;
  }

  Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
  }

  // create quiz                                        create quiz comment came with the downloaded code
  var quiz = new Quiz(questions);

  // display quiz                                       display quiz comment came with the downloaded code
  populate();           //End of Quiz code
