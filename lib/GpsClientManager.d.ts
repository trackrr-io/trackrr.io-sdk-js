import { Gps, CredentialsDTO } from './model';
declare class GpsClientManager {
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
