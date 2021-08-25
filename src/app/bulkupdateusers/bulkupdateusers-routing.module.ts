import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkupdateusersComponent } from './bulkupdateusers.component';

const routes: Routes = [
    { path: '', component: BulkupdateusersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BulkupdateusersRoutingModule { }
