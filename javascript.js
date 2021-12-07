var mymap = L.map('map').setView([47.418009, -122.316554], 9);
var basemap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

$.getJSON("Cities_ACF.json",function(data){
  L.geoJson(data, {style : {color: "#FF2D00", fillOpacity: "0.5"},
  onEachFeature: function(feature, layer) {
  var marker = L.popup()
  layer.bindPopup("City Name: " + feature.properties.CITY_NM)
  return marker;
}
  }).addTo(mymap);
});

// const geojsonMarkerOptions = {
//   radius: 8,
//   fillColor: "#ff7800",
//   color: "#000",
//   weight: 1,
//   opacity: 1,
//   fillOpacity: 0.8,
// };

// const markers = L.markerClusterGroup();

$.getJSON("ACF_Location_Points.json", function(data){
  L.geoJson(data, {style : {color: "#FF8700", fillOpacity: "1.0"} //add comma
  // pointToLayer: function (feature, latlng){
  //   return markers.addLayer(L.circleMarker(latlng, geojsonMarkerOptions))
  // }
}).addTo(mymap);

// mymap.addLayer(markers);
});

var Legend =  new L.Control.Legend({
		position: 'bottomright',
	});

	mymap.addControl(Legend);
	$(".legend-container").append( $("#legend") );


var map = L.map('map2').setView([47.418009, -122.316554], 9);
var basemap = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

$.getJSON("2km_Buffer_ACF.json", function(data){
  L.geoJson(data, {style : {color: "#FF8700", fillOpacity: "0.5"}
}).addTo(map);
});

var Legend =  new L.Control.Legend({
		position: 'bottomright',
	});

	map.addControl(Legend);
	$(".legend-container").append( $("#legend2") );
