import {
  BreakpointObserver,
  Breakpoints,
  MediaMatcher,
} from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavItem } from '@models/request';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { NgIf, CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';
import { map, Observable, Subscription } from 'rxjs';
import { MenuListItemComponent } from '../menu-list-item/menu-list-item.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatSidenavModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MenuListItemComponent,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    NgIf,
    CommonModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  _authService = inject(AuthService);
  _router = inject(Router);
  _breakpointObserver = inject(BreakpointObserver);
  mobileQuery: MediaQueryList;
  userName: string | null = null;
  isAdmin = false;
  expanded = false;
  myAdminRoutes: NavItem[] = [
    {
      icon: 'search',
      route: '/app/searches',
      title: 'Searches',
    },
    {
      icon: 'mark_email_read',
      route: '/app/validate-emails',
      title: 'Validate',
    },
    {
      icon: 'people',
      route: '/app/contacts',
      title: 'Contacts',
    },
    {
      icon: 'send',
      route: '/app/campaigns',
      title: 'Campaigns',
    },
    {
      icon: 'settings',
      title: 'Settings',
      children: [
        {
          icon: 'credit_card',
          route: '/app/setting',
          title: 'Plan Table',
        },
        {
          icon: 'account_circle',
          route: '/app/setting/clients',
          title: 'Clients',
        },
      ],
    },
    {
      icon: 'info',
      title: 'Information',
      children: [
        {
          icon: 'description',
          route: '/terms-conditions',
          title: 'Terms & Conditions',
        },
        {
          icon: 'description',
          route: '/privacy-policy',
          title: 'Privacy Policy',
        },
      ],
    },
  ];

  myUserRoutes = [
    {
      icon: 'search',
      route: '/app/searches',
      title: 'Searches',
    },
    {
      icon: 'mark_email_read',
      route: '/app/validate-emails',
      title: 'Validate',
    },
    {
      icon: 'info',
      title: 'Information',
      children: [
        {
          icon: 'description',
          route: '/terms-conditions',
          title: 'Terms & Conditions',
        },
        {
          icon: 'description',
          route: '/privacy-policy',
          title: 'Privacy Policy',
        },
      ],
    },
  ];

  private _mobileQueryListener: () => void;

  isHandset$: Observable<boolean> = this._breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private router: Router,
    public translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    translate.setDefaultLang('en');
  }
  ngOnInit() {
    this._authService.$user.subscribe((user) => {
      if (user.displayName) this.userName = user.displayName;
      else this.userName = user.email?.split('@')[0]!;
      console.log(this.userName);
    });
    /* if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
    console.log(this.authService.group);
    this.userService.getByUserId(this.authService.authData.attributes.email).then( result => {
      this.planService.getUserPlan(result.planId);
      const uUser: User = this.userService.userData;
      this.isAdmin ?  uUser.isAdmin = 1 : uUser.isAdmin = 0;
      this.userService.update(uUser.userId, uUser).then().catch(error => {console.log(error); });
    })
    .catch((err: any) => {
      console.log({ err });
    }); */
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  async signOut() {
    try {
      await this._authService.signOut();
      this._router.navigateByUrl('/auth');
    } catch (error) {
      console.log(error);
    }
  }
  getMyProfile() {
    this.router.navigate(['/app/profile']);
  }
}
