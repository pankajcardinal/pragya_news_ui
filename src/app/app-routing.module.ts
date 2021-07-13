import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './dashboard/dashboard.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
	{
		path: 'login',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('./authentication/login/login.module').then(l => l.LoginModule)				
			}
		]
	},
	{
		path: 'signup',
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('./authentication/signup/signup.module').then(s => s.SignupModule)					
			}
		]
	},
	{
		path: 'dashboard',
		canActivate: [DashboardGuard],
		children: [
			{
				path: '',
				pathMatch: 'full',
				loadChildren: () => import('./dashboard/dashboard.module').then(d => d.DashboardModule)					
			}
		]
	},
	{ path: '', pathMatch: 'full', component: AppComponent},
    { path: '**', redirectTo: '/' }//default route
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
