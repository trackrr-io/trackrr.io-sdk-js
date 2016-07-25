#Trackrr.io SDK for JavaScript
## install
```
npm install https://github.com/trackrr-io/trackrr.io-sdk-js.git --save
```

## Example

```
var trackrr = require('trackrr.io-sdk-js');
var gpsKey = 'Trackrr.ioで取得したGPSのキー';
var secret = 'Trackrr.ioで取得したアクセスキー';
var client = new trackrr.GpsClientManager(gpsKey, secret);

client.on('connect', () => {
  setInterval(() => {
    var gps = {};
    var coords = {};
    gps.coords = {};
    gps.coords.latitude = 33.79519271850586;
    gps.coords.longitude = -118.01104736328125;
    client.publish(gps);
    console.log(gps);

  }, 3 * 1000);
});
```
# For Browser Applications
## install browserify
```
npm install -g browserify
```
## Creating SDK
```
gulp build
```

```
gulp browser
```
## Sample Code
[sample.html](https://github.com/trackrr-io/trackrr.io-sdk-js/blob/master/browser/sample.html)
