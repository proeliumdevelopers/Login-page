import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginDetails } from '../Auth/authentication-services.service';
import { AuthenticationServicesService } from '../Auth/authentication-services.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;

  // deta = [
  //   {id:1,pass:"Tejas@29"},
  // ]
  constructor(private auth:AuthenticationServicesService, private fb: FormBuilder,private router:Router,private _snackBar:MatSnackBar) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {});
  }

  ngOnInit() {

  }
  passwordVisibility:boolean=false;

  loginForm: FormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(100)]]
  })


  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    console.log(this.loginForm.value);
  }

  togglePasswordVisibility(){
    this.passwordVisibility=!this.passwordVisibility;
  }


  async login(formData:LoginDetails){
    this.auth.login(formData).subscribe({

      next : (data) => {
        console.log(data)
        this.router.navigateByUrl("").then(() => {
          window.location.reload();
          //console.log("password is correct")
        });
        console.log(data);
      },
      error : (err)=>{
        console.error(err);
        if(err && err.statusText && (err.statusText=== "Unprocessable Entity" || err.statusText=== "Unauthorized" || err.statusText=== "Bad Request") ){
          this.openSnackBar("Incorrect Username or Password", "OK");
         // console.log("Invalid Username")
        }
        else if(err && err.status){
          this.openSnackBar("Oops! Login Failed. ERR_CODE: LOGIN_FAILED", "OK");
          console.log("login failed")
        }
      }
    });
    console.log(formData)

  }
  isChecked(){
    return true;
  }

}
