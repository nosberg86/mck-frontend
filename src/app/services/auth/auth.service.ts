import { inject, Injectable } from '@angular/core';
import { Auth, authState,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, UserCredential, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Observable, ReplaySubject } from 'rxjs';
export interface UserLogin{
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  displayName: string | null = null;
  private _authData = inject(Auth);
  public $user: ReplaySubject<User> = new ReplaySubject(1);
  //private afAuth= inject(AngularFireAuth);

  get authState$(): Observable<any> {
    return authState(this._authData);
  }

  signUp(user: UserLogin) {
    return createUserWithEmailAndPassword(this._authData, user.email , user.password);
  }

  signIn(user: UserLogin) {
    return  signInWithEmailAndPassword (this._authData, user.email, user.password);
  }

  signOut() {
    return signOut(this._authData);
  }

  async isAuthenticated(){
    return async () =>{
      await this.authState$.pipe(
        map((state) => {
          console.log(state);
          if(!state){return false;}
          return true;
        })
      );
    }
  }

  getUserName():any {
    /* this.afAuth.authState.subscribe(user => {
      if (user) {
        // Si el usuario está autenticado
        console.log('Nombre del usuario:', user.displayName);
        return user.displayName; // El nombre del usuario

      } else {
        // Usuario no autenticado
        return null;
        console.log('No hay usuario autenticado.');
      }
    }); */
  }
}
