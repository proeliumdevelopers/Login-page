import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button'
import {MatInputModule} from '@angular/material/input'
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
//import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
//import { MatSnackBar, MatSnackBarAction } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserTemplateComponent } from './shared/user-template/user-template.component';
import { MatMenuModule } from '@angular/material/menu';
import { ChillerReportsComponent } from './chiller-reports/chiller-reports.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    UserTemplateComponent,
    ChillerReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
