import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChillerReportRoutingModule } from './chiller-report-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ChillerReportRoutingModule
  ]
})
export class ChillerReportModule { }
