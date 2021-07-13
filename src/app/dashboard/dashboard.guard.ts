import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment  from 'moment';

@Injectable({
	providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

	constructor(private _router: Router){
		
	}
	
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {				
		
		if(sessionStorage.getItem('token') == null || sessionStorage.getItem('token') == ''){
			this._router.navigate(["/"]);
			return false;
		}
			
		if(sessionStorage.getItem('token') != '' && !this.isTokenExpire()){
			return true;
		}
		
		return false;			
	}
	
	isTokenExpire(): boolean {
		const expireAt =  sessionStorage.getItem('expireAt');
		return moment().isBefore(this.getExpiration());;
	}
	
	getExpiration() {
        const expiration = sessionStorage.getItem('expireAt');        
        return moment(expiration);
    }   

}
