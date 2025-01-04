import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private route: ActivatedRoute) { }
  public register() {
    this.router.navigate(['auht/sign-up']);
  }
  public requestPlan(planId: number) {
    this.router.navigate(['requestPlan', planId]);
  }
  public login() {
    this.router.navigate(['auht/login']);
  }
  public payment(price: string) {
    this.router.navigate(['/app/payments', { price: price}]);
  }
  public getParam(name: string): string {
    return this.route.snapshot.params[name];
  }

  public search() {
    this.router.navigate(['search']);
  }

  public userPage() {
    this.router.navigate(['dashboard']);
  }

  public root() {
    this.router.navigate(['/']);
  }

  public navigate(returnUrl: any) {
    this.router.navigate([returnUrl]);
  }
}
