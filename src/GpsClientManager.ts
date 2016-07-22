/**
 * Created by hasegawa on 2016/07/07.
 */
'use strict';
import {Gps, CredentialsDTO} from './model';
import * as https from 'https';
class GpsClientManager {
  static TOPIC = 'GpsPlotter/gps';
  static HOST = 'a3ls0q52a6xf5x.iot.ap-northeast-1.amazonaws.com';
  static REGION = 'ap-northeast-1';
  static AUTH_PROVIDER_HOST = 'provider.trackrr.io';

  device: any;
  devicePromise: Promise<any>;
  private identityId: string;

  constructor(public key: string, public secret: string) {
    let awsIot = require('aws-iot-device-sdk');
    this.devicePromise = new Promise(
      (resolve: Function) => {
        this.getCredentials().then((dto: CredentialsDTO) => {
          this.device = awsIot.device({
            'host': GpsClientManager.HOST
            , 'region': GpsClientManager.REGION
            , 'protocol': 'wss'
            , 'accessKeyId': dto.accessKeyId
            , 'secretKey': dto.secretAccessKey
            , 'sessionToken': dto.sessionToken
          });
          this.identityId = dto.identity;
          resolve();
        });
      });
  }

  on(event: string, listener: Function) {
    this.devicePromise.then(() => {
      this.device.on(event, listener);
    });
  }

  getCredentials(): Promise<CredentialsDTO> {
    var postData = JSON.stringify({
      'key': this.key
      , 'secret': this.secret
    });

    var options = {
      hostname: GpsClientManager.AUTH_PROVIDER_HOST,
      port: 443,
      path: '/authenticate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        //, 'Content-Length': Buffer.byteLength(postData)
      }
    };

    return new Promise((resolve: Function) => {
      var req = https.request(options, (res: any) => {
        res.on('data', (body: any) => {
          try {
            var data = JSON.parse(body);
            resolve(data);
          } catch (e) {
            //browserify通すとUint8Arrayになってたまにパースエラー。。?
            console.log(e);
            console.log((body instanceof Uint8Array) ? String.fromCharCode.apply(null, body) : body);
            throw new Error(e);
          }
        });
      }).on('error', (e: any) => {
        throw new Error(e);
      });
      req.write(postData);
      req.end();
    });

  }

  publish(gps: Gps) {
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
export = GpsClientManager;
