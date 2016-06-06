import { Injectable }    from '@angular/core';

@Injectable()
export class GeolocationService {
  
  getLocation(){
    return new Promise<any>((resolve , reject) => navigator.geolocation.getCurrentPosition(resolve,reject,{"enableHighAccuracy":true, "maximumAge": 0}));
  }
}