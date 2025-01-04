import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from '@services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard = (): CanActivateFn => {
  return() => {
    const auth = inject(AuthService);
    const router = inject(Router)

    return auth.authState$.pipe(
      map(state => {
        console.log(state);
        if(!state){
          router.navigateByUrl('/auth');
          return false;
        }
        return true;
      })
    );
  }
};

export const publicGuard = (): CanActivateFn => {
  return() => {
    const auth = inject(AuthService);
    const router = inject(Router)

    return auth.authState$.pipe(
      map(state => {
        console.log(state);
        if(state){
          router.navigateByUrl('/main');
          return false;
        }
        return true;
      })
    );
  }
};
