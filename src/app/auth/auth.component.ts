import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true;
  errorMsg = null;
  previousUrl: string;
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLoginSwitch(){
    this.isLoginMode = !this.isLoginMode;
    this.errorMsg = null;
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    localStorage.setItem('firstName', form.value.fName);

    let authObs: Observable<AuthResponseData>

    if(this.isLoginMode){
      authObs = this.authService.login(email, password)
    } else{
      authObs = this.authService.signUp(email, password)
    }

    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe((event: NavigationEnd) => {
    //   console.log('prev:', event.url);
    //   this.previousUrl = event.url;
    // });
    this.isLoading = true;
    authObs.subscribe(res => {
      console.log(res);
      this.isLoading = false;
      this.router.navigate(['/shop']);
    }, error => {
        this.isLoading = false;
        this.errorMsg = error;
      })
  }

}
