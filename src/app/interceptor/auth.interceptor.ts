import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const t = sessionStorage.getItem('token');
		if (t != '') {
			const cloned = request.clone({
				headers: request.headers.set('Authorization', 'Bearer ' + t)
			});	
			return next.handle(cloned);
		}
		
		return next.handle(request);
	}
}
