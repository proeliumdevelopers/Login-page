import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthGuard } from './Auth/auth.guard';
import { DashboardComponent } from './chiller-report/dashboard/dashboard.component';
import { ChillerReportsComponent } from './chiller-reports/chiller-reports.component';

const routes: Routes = [
//   {
//     // path:'', component : AppComponent , children :[
//     //  {
//     //   path:'',
//     //   component: LoginComponent

//     //  }

//     // ]
//    // path:'',redirectTo:'app-landing-page', pathMatch:"full"
//   //  path:'', component:LandingPageComponent

//  }

{
  path: '', redirectTo: 'landingPage', pathMatch: 'full'
},
{
  path: 'login', component: LoginComponent
},

{
  path: 'landingPage', component: LandingPageComponent, canActivate: [AuthGuard]
},
{
  path: '**', redirectTo: 'landingPage'
},
{
  path:'Chiller-Report', component: DashboardComponent, loadChildren : () => import('./chiller-report/chiller-report.module').then(m => m.ChillerReportModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
