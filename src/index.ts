/**
 * Created by hasegawa on 2016/07/11.
 */

import GpsClientManager = require('./GpsClientManager');
export = GpsClientManager;
/***
import {Gps, CredentialsDTO, Coords} from './model';
var Client = require('./GpsClientManager');
var gpsKey = '844ebb8f1c9deb4bcbaf1acf765c90d34c19fde2bd6b590556015e56f7ba323647c520f2e409d4f9f93f';
var secret = '2b3e5cae92341b0537d4ec561508ab8a5081cd289179e2abd499f58277dc';
var client = new Client(gpsKey, secret);

client.on('connect', () => {
  var gps: Gps = {};
  var coords: Coords = {};
  gps.coords = {};
  gps.coords.latitude = 33.79519271850586;
  gps.coords.longitude = -118.01104736328125;
  client.publish(gps);
  console.log(gps);
});

declare function require(x: string): any;

setTimeout(() => {
  client.on('connect', () => {
    var gps: Gps = {};
    var coords: Coords = {};
    gps.coords = {};
    gps.coords.latitude = 33.79519271850586;
    gps.coords.longitude = -118.01104736328125;
    client.publish(gps);
    console.log(gps);
  });
}, 30 * 1000);
**/
