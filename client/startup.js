refuelService = RefuelService();

Meteor.startup(function () {
  Meteor.disconnect();
  var refuelType = refuelService.FUEL_TYPES[0].type;
  refuelService.requestRefuelStations(refuelType);
});