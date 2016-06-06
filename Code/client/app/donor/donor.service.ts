import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Donor } from './donor';
import {AppSettings} from './../util/appSettings';

@Injectable()
export class DonorService {
  
  private url =  `${AppSettings.API_ENDPOINT}/donor`;
  
  constructor(private http: Http) { }
  
  getDonors(query: any = {}): Promise<Hero[]> {
    let params: URLSearchParams = new URLSearchParams();
    for(let key in query){
      params.set(key, query[key]);
    }

    return this.http.get(this.url,{search: params})
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  
  getDonor(id: number) {
     let url = `${this.url}/${id}`;
    return this.http.get(url)
               .toPromise()
               .then(response => response.json())
               .catch(this.handleError);
  }
  
  save(donor: Donor): Promise<Hero>  {
    if (donor._id) {
      return this.put(donor);
    }
    return this.post(donor);
  }
  
  delete(donor: Donor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.url}/${donor._id}`;
    return this.http
               .delete(url, headers)
               .toPromise()
               .catch(this.handleError);
  }
  
  private post(donor: Donor): Promise<Hero> {
    let headers = new Headers({
      'Content-Type': 'application/json'});
    return this.http
               .post(this.url, JSON.stringify(donor), {headers: headers})
               .toPromise()
               .then(res => res.json())
               .catch(this.handleError);
  }
  
  private put(donor: Donor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let url = `${this.url}/${donor._id}`;
    return this.http
               .put(url, JSON.stringify(donor), {headers: headers})
               .toPromise()
               .then(() => donor)
               .catch(this.handleError);
  }
  
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
