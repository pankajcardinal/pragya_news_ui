import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;
	serverError: string = "";
	countries:string[] = ['India'];
	states: string[] = [
		'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
		'Haryana','Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
		'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
		'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
		'Andaman and Nicobar', 'Chandigarh', 'Dadra Nagar Haveli and Daman Diu', 'Delhi', 'Jammu and Kashmir',
		'Ladakh', 'Lakshadweep', 'Puducherry'
	];

	constructor(private fb: FormBuilder, private authenticationService: AuthenticationService) {
		this.signupForm = this.fb.group({
			userName: ['', Validators.required],
			password: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required, Validators.pattern(/^(?:\(\d{3}\)|\d{3}-)\d{3}-\d{4}$/)]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			dateOfBirth: ['', Validators.required],
			gender: ['', Validators.required],
			country: ['', Validators.required],
			state: ['', Validators.required],
		});		
	}

	ngOnInit(): void {
	}

	get getControl(){
    	return this.signupForm.controls;
  	}
  	
  	signup(): void {
		const parameter = this.signupForm.value
		
		this.authenticationService.signup(parameter, (result: any) => {
			if (result['status']) {				
				window.location.href = '/dashboard';
			} else {
				let s = result['data']['status']; 
				if(s == 403 || s == 302){
					this.serverError = result['data']['message'];
				}				
			}
		});
	}
}
