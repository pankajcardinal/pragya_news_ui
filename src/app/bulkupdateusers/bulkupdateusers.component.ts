import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

@Component({
	selector: 'app-bulkupdateusers',
	templateUrl: './bulkupdateusers.component.html',
	styleUrls: ['./bulkupdateusers.component.css']
})
export class BulkupdateusersComponent implements OnInit {

	displayedColumns: string[] = ['id', 'FirstName', 'LastName', 'Date Of Birth', 'UserName', 'Password', 'Email', 'Phone', 'Gender', 'Country', 'State'];
	usersForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.usersForm = this.fb.group({
			users: this.fb.array([]),
		});
	}

	ngOnInit(): void {
		for(let i= 0; i<5; i++){
			this.addUser();
		}
	}

	get users(): FormArray {
		return this.usersForm.get("users") as FormArray;
	}

	private newUser(): FormGroup {
		let user = this.fb.group({
			id: [this.users.length],
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
		return user;
	}
	
	addUser(): void {
		this.users.push(this.newUser());
	}
}
