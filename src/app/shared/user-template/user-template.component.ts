import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationServicesService, UserResponse } from 'src/app/Auth/authentication-services.service';
//import { ResetPassswordComponent } from 'src/app/reset-passsword/reset-passsword.component';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-user-template',
  templateUrl: './user-template.component.html',
  styleUrls: ['./user-template.component.scss']
})
export class UserTemplateComponent {
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthenticationServicesService, private _snackBar: MatSnackBar) {}

  public email  : string = "";
  public name   : string = "";
  public role   !: number;

  ngOnInit() {
    this.authService.userDetails().subscribe((data : UserResponse)=> {
      this.email  = data.email;
      this.name   = data.name;
      this.role   = data.role;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {});
  }

  public signOutEmit(): void {
    this.signOut.emit();
  }






}
