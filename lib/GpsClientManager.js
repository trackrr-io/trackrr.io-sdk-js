'use strict';
const https = require('https');
class GpsClientManager {
    constructor(key, secret) {
        this.key = key;
        this.secret = secret;
        let awsIot = require('aws-iot-device-sdk');
        this.devicePromise = new Promise((resolve) => {
            this.getCredentials().then((dto) => {
                this.device = awsIot.device({
                    'host': GpsClientManager.HOST,
                    'region': GpsClientManager.REGION,
                    'protocol': 'wss',
                    'accessKeyId': dto.accessKeyId,
                    'secretKey': dto.secretAccessKey,
                    'sessionToken': dto.sessionToken
                });
                this.identityId = dto.identity;
                resolve();
            });
        });
    }
    on(event, listener) {
        this.devicePromise.then(() => {
            this.device.on(event, listener);
        });
    }
    getCredentials() {
        var postData = JSON.stringify({
            'key': this.key,
            'secret': this.secret
        });
        var options = {
            hostname: GpsClientManager.AUTH_PROVIDER_HOST,
            port: 443,
            path: '/authenticate',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return new Promise((resolve) => {
            var req = https.request(options, (res) => {
                res.on('data', (body) => {
                    try {
                        var data = JSON.parse(body);
                        resolve(data);
                    }
                    catch (e) {
                        console.log(e);
                        console.log((body instanceof Uint8Array) ? String.fromCharCode.apply(null, body) : body);
                        throw new Error(e);
                    }
                });
            }).on('error', (e) => {
                throw new Error(e);
            });
            req.write(postData);
            req.end();
        });
    }
    publish(gps) {
        if (gps == null) {
            throw new Error('gps must not be null');
        }
        if (gps.coords == null) {
            throw new Error('gps.coords must not be null');
        }
        gps.identity = this.identityId;
        gps.gpsKey = this.key;
        if (!gps.createdDate || gps.createdDate === 0) {
            gps.createdDate = new Date().getTime();
        }
        this.device.publish(GpsClientManager.TOPIC, JSON.stringify(gps));
    }
    end() {
        this.device.end();
    }
}
GpsClientManager.TOPIC = 'GpsPlotter/gps';
GpsClientManager.HOST = 'a3ls0q52a6xf5x.iot.ap-northeast-1.amazonaws.com';
GpsClientManager.REGION = 'ap-northeast-1';
GpsClientManager.AUTH_PROVIDER_HOST = 'provider.trackrr.io';
module.exports = GpsClientManager;
