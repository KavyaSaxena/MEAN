import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AppserviceService {
    
  private header;
  private options;
  //private header = new Headers({ 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin':'*'});


  //private options = new RequestOptions({ headers: this.header });
  noAuthHeader = { headers: new Headers({ 'NoAuth': 'True' }) };
  constructor(private http:Http) {
    let id = localStorage.getItem('token')
    console.log(id)

    this.header = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*', 'Authorization': "Bearer "+ id });
    this.options = new RequestOptions({ headers: this.header });
   }
   
   getUserProfile() {
    let id = localStorage.getItem('token')
    console.log(id)

    this.header = new Headers({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*', 'Authorization':"Bearer "+ id });
    this.options = new RequestOptions({ headers: this.header });
    return this.http.get('http://localhost:3000/api/userProfile',this.options).pipe(map((res: any) => {
      return res.json();
    }));
  }
   signup(user:any) {
     
   return   this.http.post('http://localhost:3000/api/register',user,this.noAuthHeader).pipe(map((res: any) => {
       return res.json();
     }));
   }
   login(user:any) {
    return   this.http.post('http://localhost:3000/api/authenticate',user,this.noAuthHeader).pipe(map((res: any) => {
        return res.json();
      }));
    }
    setToken(token: string) {
      localStorage.setItem('token', token);
    }
    getToken() {
      return localStorage.getItem('token');
    }
  
    deleteToken() {
      localStorage.removeItem('token');
    }
  
    getUserPayload() {
      var token = this.getToken();
      if (token) {
        var userPayload = atob(token.split('.')[1]);
        return JSON.parse(userPayload);
      }
      else
        return null;
    }
  
    isLoggedIn() {
      var userPayload = this.getUserPayload();
      if (userPayload)
        return userPayload.exp > Date.now() / 1000;
      else
        return false;
    }
}
