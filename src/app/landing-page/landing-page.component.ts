import { Component } from '@angular/core';
import { AuthenticationServicesService } from '../Auth/authentication-services.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  constructor(private auth:AuthenticationServicesService, private router:Router){}
  logout(){
    this.auth.logout();
  }

  nav(){
    this.router.navigateByUrl("Chiller-Report").then(() => {
      //window.location.reload();
    }
    )
  }

}
