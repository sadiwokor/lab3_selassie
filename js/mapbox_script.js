
//---------------map of foothill trails --------------------------
function loadMap_ft(){

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapft = new mapboxgl.Map({
  container: 'map_ft', // container id
  style: 'mapbox://styles/mapbox/light-v10', // style URL
  center: [-122.15103,47.14020], // starting position [lng, lat]
  zoom: 12 // starting zoom
  });

//geocoding function
  mapft.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    })
  );

  // Add geolocate control to the map.
  mapft.addControl(
  new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
  );


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


 //foothill Trails added to map
 mapft.on('load', function(){
   mapft.loadImage(
     //custom image url
     'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
     function (error, image){
       if(error) throw error;
       //adding custom image
       mapft.addImage('custom-marker',image);
       //adding geojson
       mapft.addSource('foothill_trails', {
     		"type": "geojson",
     		"data": "data/foothills_trails.geojson"
     	});
       mapft.addLayer({
        	"id":"Foothill_trails",
        	"type":"symbol",
        	"source":"foothill_trails",
          'layout': {
              'icon-image': 'custom-marker',
              // get the title name from the source's "title" property
               'text-field': ['get', 'SURFACE'],
              'text-font': [
              'Open Sans Semibold',
              'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 1.25],
              'text-anchor': 'top',
              'icon-size':0.5
          }

        });
     }
   );

});

//display content of foothill marker
mapft.on('click', 'Foothill_trails', function (e) {
	new mapboxgl.Popup()
	.setLngLat(e.lngLat)
	.setHTML("Label: " + "<b>" + e.features[0].properties.LABEL + "</b>" + "<br>" + "Surface: " + "<b>" + e.features[0].properties.SURFACE + "</b><br>"+ "Crossing: "  + e.features[0].properties.CROSSING + "</b>")
	.addTo(mapft);
});

// cursor  change to pointer hand
mapft.on('mouseenter', 'Foothill_trails', function () {
		mapft.getCanvas().style.cursor = 'pointer';
});

// cursor change to pan hand
mapft.on('mouseleave', 'Foothill_trails', function () {
	mapft.getCanvas().style.cursor = '';
});



}

//----------------------map of sensitive area markers -------------------------

//function load map of sensitive area points
function loadMap_sm(){
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2VsYWFkaSIsImEiOiJja2hjcDNrYjMwYXJvMnhtejk5cmlnaDhlIn0.AKvx3wVR6n155pX8BfVSWg';
  var mapsm = new mapboxgl.Map({
  container: 'map_sm', // container id
  style: 'mapbox://styles/selaadi/ckis419ja0l6j19nnftlyozo1', // style URL
  center: [-122.225131,47.037320], // starting position [lng, lat]
  zoom: 9 // starting zoom
  });

//geocoding control to the map
  mapsm.addControl(
    new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
    }),

  );

  // Add geolocate control to the map.
  mapsm.addControl(
  new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      trackUserLocation: true
      })
  );


  //load geojson of sensitive area points
  mapsm.on('load', function(){
    mapsm.loadImage(
      //url to customer marker
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      function (error, image){
        if(error) throw error;
        //adding a custom marker
        mapsm.addImage('custom-markers',image);

        mapsm.addSource('sensitive_area', {
       		"type": "geojson",
       		"data": "data/sensitive_area_markers.geojson"
       	});

        mapsm.addLayer({
          "id":"Sensitive_area",
       		"type":"symbol",
       		"source":"sensitive_area",
           'layout': {
               'icon-image': 'custom-markers',
               // get the title name from the source's "title" property
                'text-field': ['get', 'SOURCETHM'],
               'text-font': [
               'Open Sans Semibold',
               'Arial Unicode MS Bold'
               ],
               'text-offset': [0, 0.5],
               'text-anchor': 'top',
               'icon-size':0.3,
               'text-size':12
           },
           "paint":{
             "text-color":"#000000"
           }

         });
      }
    );
 });

//Display popup information
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

// switching/toggle event between two maps on one page
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
