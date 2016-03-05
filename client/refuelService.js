
RefuelService = function RefuelService() {

  var _FUEL_TYPES = [
    { type: 'diesel', name: 'Diesel' },
    { type: 'e5', name: 'Super' },
    { type: 'e10', name: 'Super E10' } ];

  var _lastLocation = {};
  var _stations = new ReactiveVar([]);
  var _success = new ReactiveVar(false);

  return {
    FUEL_TYPES: _FUEL_TYPES,

    lastLocation: _lastLocation,
    stations: _stations,
    success: _success,

    requestRefuelStations: _requestRefuelStations
  };

  function _requestRefuelStations(refuelType) {
    _success.set(false);
    _requestAndProcessGeolocation(refuelType, _doRequestRefuelStations);
  }

  function _doRequestRefuelStations(refuelType, position) {
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
      success: function (data) {
        //console.log('success', data);
        _success.set(true);
        //console.log(data.stations);
        //todo: Ersparnis berechnen
        data.stations.sort(function (firstStation, secondStation) {
          var priceDifference = firstStation.price - secondStation.price;
          return priceDifference === 0 ? firstStation.dist - secondStation.dist : priceDifference;
        });
        _stations.set(data.stations);
      }
    });
  }

  function _requestAndProcessGeolocation(refuelType, callback) {
    navigator.geolocation.getCurrentPosition(function successCallback(position) {
      _lastLocation = position.coords;
      Meteor.setTimeout(function restartRequest() {
        _requestAndProcessGeolocation(refuelType, callback);
      }, 1000 * 60);
      //console.log(lastLocation);
      //get refuel stations
      callback(refuelType, _lastLocation);
    }, function errorCallback(error) {
      console.log('error', error.code, error.message);
    });
  }

}


