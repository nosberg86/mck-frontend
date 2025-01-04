import { Routes } from '@angular/router';
import { publicGuard, authGuard } from '@core/guards/auth.guard';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    canActivateChild: [publicGuard()],
    path: 'auth',
    loadChildren: () => import('@auth/auth.route')
  },
  {
    canActivateChild: [authGuard()],
    path: 'main',
    loadChildren: () => import('@features/features.routes')
  },
  { path: '**', redirectTo: 'auth' }
];
