declare module 'trackrr.io-sdk-js/src/model' {
	/**
	 * Created by hasegawa on 2016/07/11.
	 */
	export interface Gps {
	  identity?: string;
	  gpsKey?: string;
	  coords?: Coords;
	  createdDate?: number;
	  userData?: Data;
	}
	export interface Coords {
	  latitude?: number;
	  longitude?: number;
	}
	export interface Data {
	  [key: string]: string;
	}
	export interface CredentialsDTO {
	  accessKeyId?: string;
	  secretAccessKey?: string;
	  sessionToken?: string;
	  expiration?: string;
	  identity?: string;
	}

}
declare module 'trackrr.io-sdk-js' {
	import { Gps, CredentialsDTO } from 'model'; class GpsClientManager {
	    key: string;
	    secret: string;
	    static TOPIC: string;
	    static HOST: string;
	    static REGION: string;
	    static AUTH_PROVIDER_HOST: string;
	    device: any;
	    devicePromise: Promise<any>;
	    private identityId;
	    constructor(key: string, secret: string);
	    on(event: string, listener: Function): void;
	    getCredentials(): Promise<CredentialsDTO>;
	    publish(gps: Gps): void;
	    end(): void;
	}
	export = GpsClientManager;

}
declare module 'trackrr.io-sdk-js' {
	/**
	 * Created by hasegawa on 2016/07/11.
	 */
	import GpsClientManager = require('GpsClientManager');
	export = GpsClientManager;

}
