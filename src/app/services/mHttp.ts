import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Headers, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import { AppConstant } from '../app.constant';
import { AppConfig } from '../app.config';

@Injectable()
export class MHttp {
  constructor(private http: Http, private router: Router) { }

  private getRequestOptions(method: string | RequestMethod, needAuthorization: boolean = true): RequestOptions {
    let headerParams = {};
    if (needAuthorization) {
      let accessToken = localStorage.getItem(AppConstant.ACCESS_TOKEN);
      let client = localStorage.getItem(AppConstant.CLIENT);
      let uid = localStorage.getItem(AppConstant.UID);
      headerParams[AppConstant.ACCESS_TOKEN] = accessToken;
      headerParams[AppConstant.CLIENT] = client;
      headerParams[AppConstant.UID] = uid;
    }
    if (method != RequestMethod.Get) {
      headerParams['Content-Type'] = 'application/json';
    }

    let headers = new Headers(headerParams);
    let options = new RequestOptions({ headers: headers });
    options.method = method;
    return options;
  }

  get(url: string, params?: Object, needAuthorization: boolean = true): Observable<any> {
    return this.request(RequestMethod.Get, url, null, params, needAuthorization);
  }

  post(url: string, data: Object, params?: Object, needAuthorization: boolean = true): Observable<any> {
    return this.request(RequestMethod.Post, url, data, params, needAuthorization);
  }

  put(url: string, data: Object, params?: Object, needAuthorization: boolean = true): Observable<any> {
    return this.request(RequestMethod.Put, url, data, params, needAuthorization);
  }

  delete(url: string, data: Object, params?: Object, needAuthorization: boolean = true): Observable<any> {
    return this.request(RequestMethod.Delete, url, data, params, needAuthorization);
  }

  request(method: RequestMethod, url: string, data?: Object, params?: Object, needAuthorization: boolean = true): Observable<any> {
    let options = this.getRequestOptions(method, needAuthorization);
    if (method != RequestMethod.Get) {
      options.body = JSON.stringify(data);
    }
    if (params) {
      let search: URLSearchParams = new URLSearchParams();
      for (let key in params) {
        search.set(key.toString(), params[key]);
      }
      options.search = search;
    }
    // this.spinner.show();
    let self = this;
    return this.http.request(url, options)
      .map(this.extractData.bind(this))
      .catch((err: any) => {
        return self.handleError(err, url, options);
      });
  }

  extractData(res: Response) {
        // this.spinner.hide();
    console.log(res);
    let headers = res.headers;
    let response = res.json().data || {};
    if (localStorage.getItem(AppConstant.ACCESS_TOKEN)) {
      return response;
    }
    let userAuth = {};
    let accessToken = headers.get(AppConstant.ACCESS_TOKEN);
    let client = headers.get(AppConstant.CLIENT);
    let uid = headers.get(AppConstant.UID);
    if (accessToken && client && uid) {
      userAuth[AppConstant.ACCESS_TOKEN] = accessToken;
      userAuth[AppConstant.CLIENT] = client;
      userAuth[AppConstant.UID] = uid;
      response.userAuth = userAuth;
    }    

    return response;
  }

  handleError(error: Response | any, url: string, options: RequestOptions): any {
    let errMsg = this.jsonError(error);
    // this.spinner.hide();
    return Observable.throw(errMsg);
  }

  jsonError(error: Response | any): any {
    let errMsg: any;
    console.log(error);
    if (error instanceof Response) {
      if (error.status == 0) {
        let message = 'Connection Error';
        errMsg = {
          status: error.status,
          message: message
        }
      } else {
        let errorJson = error.json();
        errMsg = errorJson.errors;
        errMsg.message = errMsg.full_messages || errMsg[0];
      }
    } else {
      errMsg = {
        message: error.message ? error.message : error.toString()
      }
    }
    return errMsg;
  }
}
