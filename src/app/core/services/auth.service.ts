import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        @Inject('LOCALSTORAGE') private localStorage: Storage,) {
    }

    

    login(token: string, username: string) {

        interface MyToken {
            aud:string;
            exp:Number;
            firstname:string;
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid': string;
            iat: Number;
            iss:string;
            lastname:string;
            nbf:Number;
            unique_name:string;
        }

        // set token property
        // var decoded = jwt_decode(token);
        // const body = JSON.stringify(decoded);
        // console.log((body);
        const decodedToken = jwt_decode<MyToken>(token);
        // store email and jwt token in local storage to keep user logged in between page refreshes
        this.localStorage.setItem('currentUser', JSON.stringify({
            token: token,
            isAdmin: true,
            organisationID: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
            email: username,
            id: '12312323232',
            FirstName: decodedToken.firstname,
            alias: 'john.doe@gmail.com'.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: decodedToken.firstname + ' ' + decodedToken.lastname,
        }));
        return true;
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        return JSON.parse(this.localStorage.getItem('currentUser')!);
    }

    passwordResetRequest(email: string) {
        return this.http.post('https://localhost:5001/api/User/UserExist?email=' + email, '', {headers: new HttpHeaders({
            'Accept': 'text/plain, */*',
            'Content-Type': 'application/json' // We send JSON
          }),
          responseType: 'text' as 'json', observe: 'response'})
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).pipe(delay(1000));
    }

    passwordReset(token: string, confirmPassword: string) {
        return this.http.post('https://localhost:5001/api/User/ResetPassword?token=' + token + '&newPassword=' + confirmPassword, '', {headers: new HttpHeaders({
            'Accept': 'text/plain, */*',
            'Content-Type': 'application/json'
          }),
          responseType: 'text' as 'json', observe: 'response'})
    }

    validateToken(token: string) {
        return this.http.post('https://localhost:5001/api/User/ValidateToken?token=' + token, '', {headers: new HttpHeaders({
            'Accept': 'text/plain, */*',
            'Content-Type': 'application/json' // We send JSON
          }),
          responseType: 'text' as 'json', observe: 'response'})
    }

    getAllVisitors(token: string) {

        return this.http.get('https://localhost:5001/api/Visitor', {headers: new HttpHeaders({
            'Accept': 'text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }), observe: 'response'})
    }

    getTypes(token:string) {
        return this.http.get('https://localhost:5001/api/Visitor/GetTypes', {headers: new HttpHeaders({
            'Accept': 'text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }), observe: 'response'})
    }
}

