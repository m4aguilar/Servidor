

function initMap() {
  //Se recogen los datos enviados por mongoDB
  var this_js_script = $('script[src*=maps]'); // or better regexp to get the file name..
  var locations = this_js_script.attr('data');
  if (typeof locations === "undefined" ) {
     var locations = 'some_default_value';
  }
  var data = JSON.parse(locations);
  //apis de google
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //Mostar mapa en html
  var malaga = {lat: 36.7234749, lng: -4.421505};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: malaga
  });
  //Length array
  var length = data.length;
  //Poner marcadores
  for(var i = 0; i < length; i++){
  var marker = new google.maps.Marker({
      position: {lat : parseFloat(data[i].latitud), lng: parseFloat(data[i].longitud)},
      map:map
    });
  }
  //Vector puntos intermedios
  var waypts = [];
  //Primer punto
  var start = {lat : parseFloat(data[0].latitud), lng: parseFloat(data[0].longitud)};
  //Puntos intermedios
  for(var i = 1; i < length-1; i++){
      waypts.push({
        location: {lat : parseFloat(data[i].latitud), lng: parseFloat(data[i].longitud)},
        stopover: true
      });
  }
  //Punto final
  var end = {lat : parseFloat(data[length-1].latitud), lng: parseFloat(data[length-1].longitud)};
  //Se calcula y se dibuja la ruta
  calculateAndDisplayRoute(start, end, directionsService, directionsDisplay, waypts);
  directionsDisplay.setMap(map);
}

function calculateAndDisplayRoute(start, end, directionsService, directionsDisplay, waypts) {
  var request = {
    origin: start,
    destination: end,
    optimizeWaypoints: false,
    waypoints: waypts,
    travelMode: 'WALKING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      //Opciones de los marcadores de ruta
      directionsDisplay.setOptions({
        markerOptions: ({
          label: ""
        }),
        suppressMarkers: true
      });
      directionsDisplay.setDirections(result);
    }
  });
}
