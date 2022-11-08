import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from './entity/user';
import { Erole } from './entity/erole';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Online Energy Utility Platform';

  items!: MenuItem[];

  constructor(private titleService: Title, private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);

    this.items = [
      {
        label: 'Client',
        icon: 'pi pi-book',
        command: () => this.toClientComponent(),
      },
      {
        label: 'Device',
        icon: 'pi pi-book',
        command: () => this.toDeviceComponent(),
      },
      {
        label: 'Measurements',
        icon: 'pi pi-book',
        command: () => this.toMeasurementComponent(),
      },
    ];
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedUserId') !== null;
  }

  userIsClient(): boolean {
    console.log(localStorage.getItem('role'));
    console.log(Erole.CLIENT.toString());

    return localStorage.getItem('role') === Erole[Erole.CLIENT];
  }

  logoutUser() {
    localStorage.removeItem('loggedUserId');
    localStorage.removeItem('role');
    this.toRouterComponent();
  }

  toRouterComponent() {
    this.router.navigateByUrl('/login');
  }

  toClientComponent() {
    if (this.userIsClient()) {
      alert('You cannot do anything as a client!');
    } else {
      this.router.navigateByUrl('/client');
    }
  }

  toDeviceComponent() {
    if (this.userIsClient()) {
      alert('You cannot do anything as a client!');
    } else {
      this.router.navigateByUrl('/device');
    }
  }

  toMeasurementComponent() {
    if (this.userIsClient()) {
      alert('You cannot do anything as a client!');
    } else {
      this.router.navigateByUrl('/measurement');
    }
  }
}
