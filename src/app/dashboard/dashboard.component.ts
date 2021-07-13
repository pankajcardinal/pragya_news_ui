import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from '../service/news.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	news: any;
	closeResult: string = '';
	newsLink: any;

	constructor(private _newService: NewsService, private modalService: NgbModal, private sanitizer: DomSanitizer) {
		this._newService.loadNews('bhasker', 'international', () => {
			this.news = this._newService.getNews;
		});
	}

	ngOnInit(): void {

	}

	openLink(link: string, content: any): void {
		this.newsLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
