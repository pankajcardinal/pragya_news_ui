import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl  } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	
	loginModel: FormGroup;
	serverError: string = "";
	
	constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
		this.loginModel = this.fb.group({
			userName: ['', Validators.required],
			password: ['', Validators.required],
		});		
	}

	login() {		
		if(!this.loginModel.contains('userName') || !this.loginModel.contains('password'))
			return;
		
		if(this.getControl.userName.status == 'INVALID' && this.getControl.password.status == 'INVALID')
			 return;
		
		const parameter = {
			userName: this.getControl.userName.value,
			password: this.getControl.password.value
		};
		
		this.authenticationService.login(parameter, (result: any) => {
			if (result['status']) {				
				window.location.href = '/dashboard';
			} else {
				if(result['data']['status'] == 403){
					this.serverError = result['data']['message'];
				}				
			}
		});
	}

	get getControl(){
    	return this.loginModel.controls;
  	}

	ngOnInit(): void { 
	}

}
