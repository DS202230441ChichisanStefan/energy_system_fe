import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Erole } from 'src/app/entity/erole';
import { User } from 'src/app/entity/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  id!: number
  name!: string;
  username!: string;
  email!: string;
  password!: string;
  role!: Erole;
  

  msgs1!: Message[];

  constructor(
    private router: Router,
    private authService: AuthService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
    this.msgs1 = [
      { severity: 'warn', summary: 'Warning', detail: 'This form is no longer accepting responses. Please talk to admin.' },
    ];

    this.primengConfig.ripple = true;
  }

  signupUser() {
    const user = new User(undefined, this.name, this.username, this.password, this.role, []);
    this.authService.signupUser(user).subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn === true) {
        this.toRouterComponent();
      }
    });
  }

  toRouterComponent() {
    this.router.navigateByUrl('/home');
  }

  toLoginComponent() {
    this.router.navigateByUrl('/login');
  }
}
