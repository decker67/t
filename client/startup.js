refuelService = RefuelService();

Meteor.startup(function () {
  Meteor.disconnect();
  refuelService.requestRefuelStations();
});