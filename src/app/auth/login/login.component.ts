import { hasEmailError, isRequired } from '@utils/validators';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { toast } from 'ngx-sonner';
import { AuthService } from '@services/auth/auth.service';

export interface RegisterForm {
  email:FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [ ReactiveFormsModule, RouterLink ],
})
export class LoginComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar)

  isRequired(field: 'email' | 'password'){
    return isRequired(field,this.loginForm);
  }

  hasEmailError (){
    return hasEmailError(this.loginForm);
  }

  readonly  loginForm  = this._formBuilder.group<RegisterForm>({
    email: this._formBuilder.control('', [Validators.email, Validators.required]),
    password: this._formBuilder.control('', Validators.required),
  });


  login() {
    if(this.loginForm.invalid) return;

      const {email, password} = this.loginForm.value;
      if(!email || !password) return;

      this._authService.signIn({email, password}).then((userCredential) => {
        const user = userCredential.user;
        this._authService.$user.next(user);
        this._router.navigateByUrl('/main');
        this._snackBar.open('Bienvenido nuevamente.','', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'bottom'
        });
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        toast.error('uadgfyucbqy');
        this.openSnackBar(this.handleError(errorCode,errorMessage), 5000, 'soft', 'error');
        /* this._snackBar.open(this.handleError(errorCode,errorMessage),'', {
          duration: 1000,
          horizontalPosition: 'start',
          panelClass: 'error-snackbar',
          verticalPosition: 'bottom'
        }); */
      });
  }

  handleError(code:string, message: string): string{
    switch (code) {
      case 'auth/wrong-password':
        return 'Contraseña Incorrecta.'
      case 'auth/user-not-found':
        return 'Usuario no encontrado.'
      case 'auth/invalid-credential':
        return 'Correo o Contraseña Incorrectos.'
      case 'auth/invalid-email':
        return 'Correo incorrecto, verifique.'
      case 'auth/meak-password':
        return 'La contraseña no cumple los requisitos'
      case 'auth/email-already-in-use':
        return 'La direccion de correo está en uso'
      default:
        return message;
    }
  }

  openSnackBar(message: string,
    duration: number = 5000,
    appearance: 'fill' | 'outline' | 'soft' = 'fill',
    type: 'info' | 'success' | 'error' = 'info'): void {

    const config: MatSnackBarConfig = {
    verticalPosition: 'top',
    horizontalPosition: 'center',
    panelClass: ['success-snackbar']
    };
    this._snackBar.open(message, '', config);
  }

}
