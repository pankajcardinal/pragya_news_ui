import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from './base.service';
import { SecurityService } from './security.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService extends BaseService {
	
	constructor(private http: HttpClient, private _securityService: SecurityService) {
		super(http);
		console.log('AuthenticationService constructor called');		
	}

	login(params: any, callback: (r: object) => void): void {
		//params['username'] = this._securityService.encrptData(params['userName']);
		//params['password'] = this._securityService.encrptData(params['password']);

		this.sendHttpPostAjaxRequest('/token', params).subscribe(
			(result: any) => {
				if (typeof callback === 'function') {
					sessionStorage.setItem('token', result['token']);
					sessionStorage.setItem('userName', params['userName']);
					sessionStorage.setItem('userId', result['userId']);	
					sessionStorage.setItem('expireAt', result['expireAt']);							
					callback({ status: true, data: result });
				}
			},
			(error: any) => {
				if (typeof callback === 'function') {
					callback({ status: false, data: error });
				}
			},
			() => {
			});
	}

	signup(params: any, callback: (r: object) => void): void {
		this.sendHttpPostAjaxRequest('/anonymous/signup', params).subscribe(
			result => {
				if (typeof callback === 'function') {
					callback({ status: true, data: result });
				}
			},
			error => {
				if (typeof callback === 'function') {
					callback({ status: false, data: error });
				}
			},
			() => {
			});
	}
	
	validateToken(){
		return this.sendHttpGetRequest('/validate');
	}
	
	logOut(){
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('userName');
		sessionStorage.removeItem('userId');	
		sessionStorage.removeItem('expireAt');					
	}
	
}
