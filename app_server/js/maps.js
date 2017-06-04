function initMap() {
  //Se recogen los datos enviados por mongoDB
  var this_js_script = $('script[src*=maps]');
  var locations = this_js_script.attr('data');
  if (typeof locations === "undefined" ) {
     var locations = 'some_default_value';
  }
  var data = JSON.parse(locations);
  //apis de google
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  //Estilo mapa
  var styledMapType = new google.maps.StyledMapType(
    [
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ]
  );

  //Mostar mapa en html
  var malaga = {lat: 36.7234749, lng: -4.421505};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: malaga
  });
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  //El tamaño depende del número de ubicaciones que se entregan
  //Length array
  var length = data.length;
  //Poner marcadores
  for(var i = 0; i < length; i++){
  var marker = new google.maps.Marker({
      position: {lat : parseFloat(data[i].latitud), lng: parseFloat(data[i].longitud)},
      map:map,
      title: data[i].pista
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

  //Distancia
  // var service = new google.maps.DistanceMatrixService();
  // service.getDistanceMatrix(
  //   {
  //     origins: [start],
  //     destinations: [end],
  //     travelMode: 'WALKING',
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //     avoidHighways: true,
  //     avoidTolls: true,
  //   }, callback);
  //
  // function callback(response, status) {
  //   if (status == 'OK') {
  //     var results = response.rows[0].elements;
  //     var element = results[0];
  //     var distance = element.distance.text;
  //
  //     var div = document.getElementById("distance");
  //     div.textContent ="Distancia total: " + distance;
  //     var text = div.textContent;
  //   }
  // }

  //Distancia total sumada por tramos
  var arrayDistance = [];
  var totalDistance = 0;
  var service = new google.maps.DistanceMatrixService();
  for(j = 0; j < length-1; j++){
    var latitudOrigin = parseFloat(data[j].latitud);
    var longitudOrigin = parseFloat(data[j].longitud);
    var latitudDestination = parseFloat(data[j+1].latitud);
    var longitudDestination = parseFloat(data[j+1].longitud);
    var origin = new google.maps.LatLng(latitudOrigin, longitudOrigin);
    var destination = new google.maps.LatLng(latitudDestination, longitudDestination);

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'WALKING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: true,
        avoidTolls: true,
      }, callback);
    function callback(response, status) {
      if (status == 'OK') {
        var results = response.rows[0].elements;
        var element = results[0];
        var distance = element.distance.value;
        arrayDistance.push(distance);
        totalDistance = 0;
        for(j = 0; j < arrayDistance.length; j++){
          totalDistance = arrayDistance[j] + totalDistance;
        }
        var div = document.getElementById("distance");
        div.textContent ="Distancia total: " + totalDistance + " metros";
        var text = div.textContent;
      }
    }
  }
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
