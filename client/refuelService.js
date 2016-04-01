
RefuelService = ((log, navigator, meteor) => {

  return () => {

    const FUEL_TYPES = [
      {type: 'diesel', name: 'Diesel'},
      {type: 'e5', name: 'Super'},
      {type: 'e10', name: 'Super E10'}
    ];

    let lastLocation = {};
    let stations = new ReactiveVar([]);
    let success = new ReactiveVar(false);

    return {
      FUEL_TYPES,
      lastLocation,
      stations,
      success,
      requestRefuelStations
    };

    function requestRefuelStations(refuelType = FUEL_TYPES[0].type) {
      success.set(false);
      requestAndProcessGeolocation(refuelType, doRequestRefuelStations);
    }

    function doRequestRefuelStations(refuelType, position) {
      $.ajax({
        url: "https://creativecommons.tankerkoenig.de/json/list.php",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
          lat: position.latitude,
          lng: position.longitude,
          rad: 5, //radius in kilometres
          sort: "price",
          type: refuelType,
          apikey: "b4d41299-ff10-cf71-7aa4-cdaae8356004"
        },
        success: data => {
          //console.log('success', data);
          success.set(true);
          //console.log(data.stations);
          data.stations.sort( (firstStation, secondStation) => {
            var priceDifference = firstStation.price - secondStation.price;
            return priceDifference === 0 ? firstStation.dist - secondStation.dist : priceDifference;
          });
          stations.set(data.stations);
        }
      });
    }

    function requestAndProcessGeolocation(refuelType, callback) {
      navigator.geolocation.getCurrentPosition(position => {
        lastLocation = position.coords;
        meteor.setTimeout(() => {
          requestAndProcessGeolocation(refuelType, callback);
        }, 1000 * 60);
        //console.log(lastLocation);
        //get refuel stations
        callback(refuelType, lastLocation);
      }, error => {
        log('error', error.code, error.message);
      });
    }

  };

})(log, navigator, Meteor);




