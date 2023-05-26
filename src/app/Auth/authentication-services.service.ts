import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


export interface TokenDetails {
  _id: string;
  iat: number;
  exp : number;
}

export interface UserResponse {
  _id : string,
  email : string,
  name : string,
  role : number,
  building : number
}

export interface TokenResponse {
  token: string;
  user: UserResponse
}

export interface LoginDetails {
  email: string;
  password: string;
  name?: string;
}

export interface ResetPasswordInput {
  oldPassword : string,
  newPassword: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {
  private token !: string | null ;
  private role !:number;
  private building !:number;
  private logoutDevicesBefore: Date = new Date("4/24/2021, 9:55:21 pm"); //Format: M/d/yyyy, h:m:s a
  readonly BASE_URL = environment.USER_BASE_URL;

  constructor(private http: HttpClient, private router: Router) {}

  private saveTokenToStorage(token: string): void {
    window.localStorage.setItem("Token", token);
    this.token = token;
  }

  private saveRoleToStorage(role: number): void {
    window.localStorage.setItem("Role", role + "" );
    this.role = role;
  }

  private saveBuildingToStorage(building : number):void {
    window.localStorage.setItem("Building", building + '');
    this.building = building;
  }

  private saveCurrentTimeAsLoginTime(): void {
    window.localStorage.setItem("Login_Time", new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'}) );
  }

  private getTokenFromStorage(): string | null {
    if (!this.token) {
      this.token = window.localStorage.getItem("Token");
    }
    return this.token ;
  }

  public getRoleFromStorage():number {
    if (!this.role) {
      this.role = Number(window.localStorage.getItem("Role"));
    }
    return this.role;
  }

  public getBuildingFromStorage():number{
    if(!this.building){
      this.building = Number(window.localStorage.getItem("Building"));
    }
    return this.building;
  }

  public getLoginTimeFromStorage():Date {
    return new Date(window.localStorage.getItem("Login_Time") as string | number );
  }

  public logout(): void {
    this.logoutRoute().subscribe({
      next : data => {
        this.clearLocalStorage();
        console.log(data);
      },
      error : err =>{
        this.clearLocalStorage();
        console.log('Error Occured')
      },
    });
  }

  public logoutRoute(){
    return this.http.get<any>(this.BASE_URL + "signout");
  }

  public clearLocalStorage() : void {
    this.token = "";
    window.localStorage.removeItem("Token");
    window.localStorage.removeItem("Role");
    window.localStorage.removeItem("Login_Time");
    window.localStorage.removeItem("Logout_Before");
    window.localStorage.removeItem("Building");
    console.log('logout : ' + window.localStorage.getItem("Token"))
    this.router.navigateByUrl("/login").then(() => {
      window.location.reload();
    });
  }

  public getTokenDetails(): TokenDetails | null {
    const token = this.getTokenFromStorage();
    let payload, payload_2;
    if (token) {
      payload = token.split(".")[1];
      payload_2 = window.atob(payload);
      return JSON.parse(payload_2);
    } else {
      return null;
    }
  }

  public getUserID() : string {
    if(this.getTokenDetails()){
      return (this.getTokenDetails())? this.getTokenDetails()?._id as string : "";
    }
    return "";
  }

  public isLoggedIn(): boolean {
    const user = this.getTokenDetails();
    if(!user){
      console.log("Invalid User");
      return false;
    }
    else if(this.getRoleFromStorage() < 1){
      console.log("Role is below 1");
      return false;
    }
    else if( (this.getLoginTimeFromStorage().toString() === "Invalid Date") ){
      console.log("Login Time Invalid");
      return false
    }
    else if( this.getLoginTimeFromStorage() < this.logoutDevicesBefore){
      console.log("Login Time is exceeded with current time");
      return false;
    }
    else if ( ((user.exp) > (Date.now()/1000)) ) {
      return true;
    }
    else {
      return false;
    }
  }

  public register(user: LoginDetails) {
    return this.http.post<any>(this.BASE_URL + "signup", user).pipe(
      map((data: TokenResponse) => {
        if (data && data.token && data.user && data.user.role) {
          this.saveTokenToStorage(data.token);
          this.saveRoleToStorage(data.user.role)
        }
        this.saveCurrentTimeAsLoginTime();
        return data;
      })
    )
  }

  public login(user: LoginDetails) {
    return this.http.post<any>(this.BASE_URL + "signin", user).pipe(
      map((data: TokenResponse) => {
        if (data && data.token && data.user && data.user.role) {
          console.log(data.user);
          this.saveTokenToStorage(data.token);
          this.saveRoleToStorage(data.user.role);
          this.saveBuildingToStorage(data.user.building);
        }
        this.saveCurrentTimeAsLoginTime();
        return data;
      })
    )
  }

  public userDetails() {
    return this.http.get<any>(this.BASE_URL + "user/" + this.getUserID() );
  }

  public resetPassword(updatedUser: ResetPasswordInput): Observable<any> {
    return this.http.post<any>( this.BASE_URL + "reset-password/" + this.getUserID(), updatedUser);
  }

  public isAdmin(){
    const role = this.getRoleFromStorage();
    if(role === 2 || role === 3){
      return true;
    }
    return false;
  }

  public isSuperAdmin(){
    const role = this.getRoleFromStorage();
    if(role === 3){
      return true;
    }
    return false;
  }
}
