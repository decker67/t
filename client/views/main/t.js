Template.body.helpers({
  doPulseClass: function () {
    if (!refuelService.success.get()) {
      return 'pulse-animation';
    }
  },

  fuelType: function () {
    return refuelService.FUEL_TYPES;
  },

  selected: function () {
    return Session.get('selectedFuelType') === this.type ? 'selected' : '';
  },

  refuelStation: function () {
    return refuelService.stations.get();
  }
});

Template.body.events({
  'change #fuel': function (event) {
    var refuelType = event.currentTarget.options[event.currentTarget.selectedIndex].value;
    refuelService.requestRefuelStations(refuelType);
  }
});
