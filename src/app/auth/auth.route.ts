import { Routes } from '@angular/router';

const authRoute: Routes = [
  {path: '', loadComponent: () => import('@auth/login/login.component').then(m => m.LoginComponent)},
  {path: 'sign-up', loadComponent: () => import('@auth/register/register.component').then(m => m.RegisterComponent)}
]

export default authRoute;
