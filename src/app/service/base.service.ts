import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserDetail } from '../model/userdetail';

export class BaseService {
	
	private userDetail: UserDetail = new UserDetail();
	
    constructor(private proHttp: HttpClient) {
		
    }
    
    get getUserDetail(){
		return this.userDetail;
	}
	
	set setUserDetail(userDetail: UserDetail){
		this.userDetail = userDetail;
	}
	
    get getHeaders(){
		let options: any = {
			withCredentials: true,
			params: new HttpParams(),
			headers: new HttpHeaders({
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept': 'application/json',
				'Access-Control-Allow-Origin': '*'
			})
		};
		if(this.getUserDetail.token != ''){
			options['Authorization'] = 'Bearer ' + this.getUserDetail.token;
		}		
		return options;
	}
    
    protected sendHttpGetRequest(url: string, data?: any) {
		let options = this.getHeaders;
		if (typeof data != 'undefined' && data.length != 0) {
			let httpParams = options.params;
	        Object.keys(data).forEach(key => {
	            const paramVal: any = data[key];
	            if (typeof paramVal === 'object' && paramVal.length) {
	                paramVal.forEach((s: any) => {
	                    httpParams = httpParams.append(key, s);
	                });
	            } else {
	                httpParams = httpParams.append(key, paramVal);
	            }
	        });			
		}
		return this.proHttp.get(url, options).pipe(
                catchError((error: any) => {
                    return Observable.create(error.error);
                }));
    }

    protected sendHttpPostAjaxRequest(url: string, params: any) {
        return this.proHttp.post(url, params, { headers: new HttpHeaders().set('Content-Type', 'application/json') }).pipe(
            catchError((error: any) => {
                return throwError(error.error);
                // return Observable.create(error.error);
            }));

    }

    protected sendHttpPostFormRequest(url: string, params: any) {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            const paramVal: any = params[key];
            if (typeof paramVal === 'object' && paramVal.length) {
                paramVal.forEach((s: any) => {
                    httpParams = httpParams.append(key, s);
                });
            } else {
                httpParams = httpParams.append(key, paramVal);
            }
        });

        return this.proHttp.post(url, httpParams.toString(), {
            headers: new HttpHeaders(
                {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Accept: 'application/json;charset=utf-8'
                }
            )
        }).pipe(
            catchError((error: any) => {
                return Observable.create(error.error);
            }));
    }
}

