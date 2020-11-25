
//---------------map of foothill trails --------------------------
function loadMap_ft(){

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapft = new mapboxgl.Map({
  container: 'map_ft', // container id
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-122.225131,47.037320], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });


  //loading boundary
 mapft.on('load', function () {
     mapft.addSource('boundary', {
       'type': 'geojson',
       'data':"data/Pierce_County_Boundary_Lines.geojson"
     });
     mapft.addLayer({
       'id': 'boundarys',
       'type': 'line',
       'source': 'boundary',
       'layout': {
       'line-join': 'round',
       'line-cap': 'round'
      },
     'paint': {
     'line-color': '#888',
     'line-width': 8
     }
   });
 });


 //foothill Trails
 mapft.on('load', function(){
	mapft.addSource('foothill_trails', {
		"type": "geojson",
		"data": "data/foothills_trails.geojson"
	});
	mapft.addLayer({
		"id":"Foothill_trails",
		"type":"circle",
		"source":"foothill_trails",
		"paint": {
				"circle-color": "blue",
				"circle-opacity": 1
		}
	});
});

mapft.on('click', 'Foothill_trails', function (e) {
	new mapboxgl.Popup()
	.setLngLat(e.lngLat)
	.setHTML("Label: " + "<b>" + e.features[0].properties.LABEL + "</b>" + "<br>" + "Surface: " + "<b>" + e.features[0].properties.SURFACE + "</b><br>"+ "Crossing: "  + e.features[0].properties.CROSSING + "</b>")
	.addTo(mapft);
});

// cursor handling
mapft.on('mouseenter', 'Foothill_trails', function () {
		mapft.getCanvas().style.cursor = 'pointer';
});

// cursor handling
mapft.on('mouseleave', 'Foothill_trails', function () {
	mapft.getCanvas().style.cursor = '';
});



}

//----------------------map of sensitive area markers -------------------------
function loadMap_sm(){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapsm = new mapboxgl.Map({
  container: 'map_sm', // container id
  style: 'mapbox://styles/selaadi/ckhx2fv0003tq19ph9tzdy88g', // style URL
  center: [-122.225131,47.037320], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });


  //foothill Trails
  mapsm.on('load', function(){
   	mapsm.addSource('sensitive_area', {
   		"type": "geojson",
   		"data": "data/sensitive_area_markers.geojson"
   	});
 	mapsm.addLayer({
 		"id":"Sensitive_area",
 		"type":"circle",
 		"source":"sensitive_area",
 		"paint": {
 				"circle-color": "red",
 				"circle-opacity": 1
 		}
 	});
 });


 mapsm.on('click', 'Sensitive_area', function (e) {
 	new mapboxgl.Popup()
 	.setLngLat(e.lngLat)
 	.setHTML("Feature ID: " + "<b>" + e.features[0].properties.FID + "</b>" + "<br>" + "Date: " + "<b>" + e.features[0].properties.GPS_DATE + "</b><br>"+ "Comments: "  + e.features[0].properties.COMMENTS + "</b>")
 	.addTo(mapsm);
 });

 // cursor handling
 mapsm.on('mouseenter', 'Sensitive_area', function () {
 		mapsm.getCanvas().style.cursor = 'pointer';
 });

 // cursor handling
 mapsm.on('mouseleave', 'Sensitive_area', function () {
 	mapsm.getCanvas().style.cursor = '';
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
