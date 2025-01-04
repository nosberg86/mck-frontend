import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '@auth/login/login.component';
import { HeaderComponent } from '@layout/header/header.component';
import { AuthService } from '@services/auth/auth.service';
import { MinioService } from '@services/minio.service';
import { BannerComponent } from "./components/banner/banner.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, LoginComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  private _authService = inject(AuthService);
  private _router = inject(Router);


  goToLogin() {
    this._router.navigateByUrl('/auth');
  }
}
