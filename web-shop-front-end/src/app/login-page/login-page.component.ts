import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.loginData.username && this.loginData.password) {
      const body = {
        username: this.loginData.username,
        password: this.loginData.password
      };

      this.authService.login(body).subscribe(
        (response: any) => {
             console.log(response);
          localStorage.setItem('authToken', response.accessToken);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      )
    }
  }
}
