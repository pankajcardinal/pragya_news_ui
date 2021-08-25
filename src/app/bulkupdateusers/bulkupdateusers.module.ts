import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BulkupdateusersComponent } from './bulkupdateusers.component';
import { BulkupdateusersRoutingModule } from './bulkupdateusers-routing.module';


@NgModule({
	declarations: [
		BulkupdateusersComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
  		BulkupdateusersRoutingModule,
	]
})
export class BulkupdateusersModule { }
