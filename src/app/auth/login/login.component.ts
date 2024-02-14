import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthResponseDto } from './../../_interfaces/response/authResponseDto.model';
import { UserForAuthenticationDto } from './../../_interfaces/user/userForAuthenticationDto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private returnUrl: any;
  loginForm : any;
  errorMessage: string = '';
  showError: boolean = false;
  isLoading : boolean = false;
  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  validateControl = (controlName: string) => {
    return this.loginForm.get(controlName).invalid && this.loginForm.get(controlName).touched
  }

  hasError = (controlName: string, errorName: string) => {
    return this.loginForm.get(controlName).hasError(errorName)
  }
  
  onSubmit() {
    this.showError = false;
    const login = {... this.loginForm };
    this.isLoading = true;
    const userForAuth: UserForAuthenticationDto = {
      userName: login.userName,
      password: login.password
    }

    this.authService.loginUser('api/Authenticate', userForAuth)
    .subscribe({
      next: (res:AuthResponseDto) => {
        debugger;
        console.log(res);
        this.isLoading = false;
       localStorage.setItem("token", res.token);
       this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful);
       this.router.navigate([this.returnUrl]);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      this.errorMessage = err.message;
      this.showError = true;
      this.isLoading = false;
    }})
  }
}

