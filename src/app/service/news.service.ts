import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable({
	providedIn: 'root'
})
export class NewsService extends BaseService {

	private rawData:any;
	
	constructor(private http: HttpClient) {
		super(http);
	}
	
	loadNews(source:string, category:string, callback:()=> void)  {
		let url = '/api/news' + '/' + source + '/' + category;
		return this.sendHttpGetRequest(url).subscribe(
			(result:any)=>{
				this.rawData = result;
				callback();
			}, 
			(error:any)=>{
				
			}, 
			()=>{});
	}
	
	get getNews(){
		return this.rawData['rss']['channel'];
	}
	
}
