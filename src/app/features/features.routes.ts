import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { MainComponent } from './main/main.component';
import { PlansComponent } from './plans/plans.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentsComponent } from './payments/payments.component';
import { ContactsComponent } from './contacts/contacts.component';

const authRoute: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: PlansComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'plans', component: PlansComponent },
      { path: 'payments', component: PaymentsComponent },
    ]
  }
]

export default authRoute;
