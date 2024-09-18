// app.js
const map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 16.813841,
      lng: 81.521240
    },
    zoom: 13
  });
  
  const startLocation = {
    lat: 16.813841,
    lng: 81.521240
  }
  
  const endLocation = {
    lat: 16.7104257,
    lng: 81.1153816
  }
  
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  
  directionsService.route({
    origin: startLocation,
    destination: endLocation,
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(response);
      directionsRenderer.setMap(map);
  
      const steps = response.routes[0].overview_path;
      console.log(steps);
  
      const marker = new google.maps.Marker({
        map: map,
        position: steps[0],
        label: '🚘',
        zIndex: 1,
      });
  
      let i = 0;
      const interval = setInterval(function() {
        i++;
        if (i >= steps.length) {
          clearInterval(interval);
          return
        }
  
        marker.setPosition(steps[i]);
      }, 1000);
    } else {
      console.error('Directions service failed:', status);
    }
  });