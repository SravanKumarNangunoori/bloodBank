
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestClientService {

  private headers;

  constructor(private _http: HttpClient) {
    const requestHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    this.headers = new HttpHeaders(requestHeaders);
  }

  

  post<T>(url: string, requestData?: any, responsetype?: any): Observable<T> {

    return this._http.post<T>(url, requestData, { headers: this.headers, responseType: responsetype });
  }

  get<T>(url: string, responsetype?: any): Observable<T> {
    return this._http.get<T>(url, { headers: this.headers, responseType: responsetype });
  }


}
