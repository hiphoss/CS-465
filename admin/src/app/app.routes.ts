import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<h2>Admin Dashboard</h2><p>You are logged in.</p>`
})
class DashboardComponent {}

export const routes: Routes = [
  { path: 'signin', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: 'signin', pathMatch: 'full' }
];
