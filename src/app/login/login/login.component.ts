import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Erole } from 'src/app/entity/erole';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  loginUser() {
    this.authService
      .loginUser(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn === true) {
          alert('Welcome, ' + this.username + '!');
          if (localStorage.getItem('role') === Erole[Erole.CLIENT]) {
            this.toErrorComponent();
          } else {
            this.toRouterComponent();
          }
        }
      });
  }

  toRouterComponent() {
    this.router.navigateByUrl('/home');
  }

  toRegistrationForm() {
    this.router.navigateByUrl('/register');
  }

  toErrorComponent() {
    this.router.navigateByUrl('/error');
  }
}
