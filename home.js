var Maki = require('maki');
var home = new Maki({
  service: {
    name: 'home'
  },
  services: {
    http: {
      port: 12701
    }
  }
});

home.start();
