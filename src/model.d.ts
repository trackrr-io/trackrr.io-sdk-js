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
