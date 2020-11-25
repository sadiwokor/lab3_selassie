
//---------------map of foothill trails --------------------------
function loadMap_ft(){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapft = new mapboxgl.Map({
  container: 'map_ft', // container id
  style: 'mapbox://styles/mapbox/navigation-guidance-night-v4', // style URL
  center: [-122.225131,47.037320], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });
}




//----------------------map of sensitive area markers -------------------------
function loadMap_sm(){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapsm = new mapboxgl.Map({
  container: 'map_sm', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: [-122.225131,47.037320], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });
}

//loading sensitive markers
loadMap_sm();

$( document ).ready(function() {
  var s= 0;
  $("#switch_map_icon").on("click" ,function() {
    if (s==0){
      $(".map_foothills_trails").show();
      $(".map_sensitive_markers").hide();
      loadMap_ft();
      s=1;
    }else{
      s=0;
      $(".map_foothills_trails").hide();
      $(".map_sensitive_markers").show();
      loadMap_sm();
    }
  });

});
