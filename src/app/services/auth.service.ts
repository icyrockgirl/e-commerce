import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { User } from "../auth/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData{
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable()

export class AuthService{

  user = new BehaviorSubject<User>(null);
  private timeoutClear: any;

  constructor(private http: HttpClient, private router: Router){}

  signUp(email:string, password:string){
      return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      }))
  }

  logout(){
     this.user.next(null);
     this.router.navigate(['/auth']);
     if(this.timeoutClear){
       clearTimeout(this.timeoutClear)
     }
     this.timeoutClear = null;
  }

  autoLogout(expirationDuration){
    this.timeoutClear = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  login(email: string, password: string){
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
    {
     email: email,
     password: password,
     returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(resData => {
     this.handleAuthentication(resData.email, resData.localId, resData.idToken,
      +resData.expiresIn)
     }))
  }

  autologin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return null
    }

    const localUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(localUser.token){
      const expiresTime = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expiresTime);
      this.user.next(localUser);
    }
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){
     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
     const user = new User(email, userId, token, expirationDate);
     this.user.next(user);
     this.autoLogout(expiresIn * 1000);
     localStorage.setItem('userData', JSON.stringify(user))
  }

  private handleError(errorResp: HttpErrorResponse){
      let errorMsg = "An unknown error occured!";
      if(!errorResp.error.error || !errorResp.error){
         return throwError(errorMsg)
      }
      switch(errorResp.error.error.message){
          case "EMAIL_EXISTS":
            errorMsg = 'This email already exists!';
            break;
          case "EMAIL_NOT_FOUND":
            errorMsg = 'This email does not exist';
            break;
          case "INVALID_PASSWORD":
            errorMsg = 'Password is invalid'
      }
      return throwError(errorMsg)
  }
}
