import { Component, inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { hasEmailError, isRequired } from '@utils/validators';
import { toast } from 'ngx-sonner';

export interface RegisterForm {
  name: FormControl<string | null>
  email:FormControl<string | null>,
  password: FormControl<string | null>,
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService)
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);


  readonly  registerForm  = this._formBuilder.group<RegisterForm>({
    name: this._formBuilder.control(''),
    email: this._formBuilder.control('', [Validators.email, Validators.required]),
    password: this._formBuilder.control('', Validators.required),
  });

  isRequired(field: 'email' | 'password'){
    return isRequired(field,this.registerForm);
  }

  hasEmailError (){
    return hasEmailError(this.registerForm);
  }

  async register() {
    if(this.registerForm.invalid) return;

    try {
      const {email, password} = this.registerForm.value;
      if(!email || !password) return;

      await this._authService.signUp({email, password});
      toast.success('Usuario creado correctamente.');
      this._snackBar.open('Usuario creado correctamente.','', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom'
      });
      this._router.navigateByUrl('/auth/login');
    } catch (error) {
      toast.error('Ocurrio un error.');
      this._snackBar.open('Ocurrio un error.','', {
        duration: 1000,
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
      });
    }
  }
}
