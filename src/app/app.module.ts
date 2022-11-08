import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';

import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { ClientComponent } from './client/client/client.component';
import { DeviceComponent } from './device/device/device.component';
import { MeasurementComponent } from './measurement/measurement/measurement.component';
import { ErrprComponent } from './error/errpr/errpr.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'client', component: ClientComponent },
  { path: 'device', component: DeviceComponent },
  { path: 'measurement', component: MeasurementComponent },
  { path: 'error', component: ErrprComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ClientComponent,
    DeviceComponent,
    MeasurementComponent,
    ErrprComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenubarModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    TableModule,
    InputTextareaModule,
    MessagesModule,
    MessageModule,
    AvatarModule,
    BadgeModule,
    StyleClassModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
