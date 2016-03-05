Template.refuel.helpers({
  routeUrl: function () {
    var latitude = this.lat;
    var longitude = this.lng;
    var googleMapsUrl = 'https://maps.google.com/' +
      '?saddr=' + refuelService.lastLocation.latitude + ',' + refuelService.lastLocation.longitude +
      '&daddr=' + latitude + ',' + longitude;
    return googleMapsUrl;
  }
});
