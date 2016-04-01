let currentDeg  = new ReactiveVar(0), degreeStep = 0;

Template.body.helpers({
  doPulseClass: () => {
    if (!refuelService.success.get()) {
      return 'pulse-animation';
    }
  },

  fuelType: () => {
    return refuelService.FUEL_TYPES;
  },

  selected: () => {
    return Session.get('selectedFuelType') === this.type ? 'selected' : '';
  },

  refuelStation: () => {
    degreeStep = 360 / refuelService.stations.get().length;
    return refuelService.stations.get();
  },

  rotation: () => {
    return currentDeg.get();
  },

  gestures: {
    'swipeleft .carousel': () => {
      currentDeg.set(currentDeg.get() - degreeStep);
    },
    'swiperight .carousel': () => {
      currentDeg.set(currentDeg.get() + degreeStep);
    },
    'tap .carousel': () => {

    }
  }
});

Template.body.events({
  'change #fuel': (event) => {
    const refuelType = event.currentTarget.options[event.currentTarget.selectedIndex].value;
    refuelService.requestRefuelStations(refuelType);
  }
});