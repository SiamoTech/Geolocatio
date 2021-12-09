// Default: Bari Coordinates
var lat = 41.137508;
var lon = 16.844006;
var map;
var zoom_level = 16;
var init_layer;
var view;
var geolocation;
var layer_type;
var layer_url;

$(document).ready(function() {
    layer_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    layer_type = "default";
    init_map();
    $("#current_position").click(function(){
        set_current_position();
    });
    
    $("#cycle").click(function(){ //cycle
        switch_to_layer("cycle"); //cycle
    });

    $("#transport").click(function(){ //transport
        switch_to_layer("transport"); //transport
    });

    $("#default").click(function(){ //default
        switch_to_layer("default"); //default
    });
    $("#outdoor").click(function(){  //outdoors
        switch_to_layer("outdoor"); //outdoor
    });
   $("#landscape").click(function(){ //landscape
       switch_to_layer("landscape");//landscape
   });   
   $("#spinal").click(function(){  //spinal
    switch_to_layer("spinal"); //spinal
}); 
$("#spinal").click(function(){  //spinal
    switch_to_layer("spinal"); //spinal
}); 
$("#neighbourhood").click(function(){  //spinal
    switch_to_layer("neighbourhood"); //spinal
});

   


});

function init_map() {
	map = L.map('map').setView([lat, lon], 18);
	init_layer = L.tileLayer(layer_url,).addTo(map);
    map.setZoom(zoom_level);
}

function set_current_position() {

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };
      
      function success(pos) {
        var crd = pos.coords;
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        map.flyTo([crd.latitude, crd.longitude])
        add_marker_point(crd.longitude, crd.latitude);
      }
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
      }
      navigator.geolocation.getCurrentPosition(success, error, options);
}

function add_marker_point(lon, lat) {
    L.circle([lat,lon], 100).addTo(map);
}

function  switch_to_layer(layer_name) {
    if(layer_name == "cycle")
        layer_url = "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=11f6fcd661ff4b408d8aa7befa615144";
    else if(layer_name == "transport")
        layer_url = "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=11f6fcd661ff4b408d8aa7befa615144";
    else if(layer_name == "default")
        layer_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    else if(layer_name == "outdoor")
        layer_url = "https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png";    
    else if(layer_name == "landscape")
        layer_url = "https://tile.thunderforest.com/landscape/{z}/{x}/{y}.png"; 
    else if(layer_name == "spinal")
        layer_url = "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png"; 
    else if(layer_name == "neighbourhood")
        layer_url = "https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png";     

    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    L.tileLayer(layer_url,).addTo(map);
}
