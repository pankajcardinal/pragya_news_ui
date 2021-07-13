import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		NgbModule,
		DashboardModule
	],
	providers: [{
    	provide: HTTP_INTERCEPTORS, 
    	useClass: AuthInterceptor, 
    	multi: true
  	}],
	bootstrap: [AppComponent]
})
export class AppModule { }
