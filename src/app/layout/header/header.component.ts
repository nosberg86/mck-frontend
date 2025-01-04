import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateDirective, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';
import { NavigationService } from '@services/navigation.service';
import {  NgxNotifierService } from 'ngx-notifier';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { MinioService } from '@services/minio.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgxSpinnerComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    TranslatePipe,
    TranslateDirective,
    MatSelectModule,
    MatMenuModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  private spinner = inject(NgxSpinnerService);
  private _translate = inject(TranslateService);
  public _authService = inject(AuthService);
  private _navigationServ = inject(NavigationService);
  private _notifierService = inject(NgxNotifierService);
  private _minioService = inject(MinioService);


  logoUrl: string = '';
  loading = false;
  isScrolled = false;
  selectedLanguage: string = 'en';
  menuItems:Array<string> = [ 'Home', 'Prices']

  ngOnInit(): void {
    initFlowbite();
    document.body.classList.toggle('dark', true);
    this._translate.addLangs(['es', 'en']);
    this._translate.setDefaultLang(this.selectedLanguage);
    this._translate.use(this.selectedLanguage);
    this.logoUrl = this._minioService.getObjectUrl('marckeen-frontend/assets', 'Logo75X56.png');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Verifica si el usuario ha hecho scroll hacia abajo
    this.isScrolled = window.scrollY > 230;
    console.log(this.isScrolled)
  }

  toogleLanguage(lang: string) {
    console.log(this._translate.getDefaultLang())
    this.selectedLanguage = lang;
    localStorage.setItem('selectedLenguage', lang);
    this._translate.use(lang);
    console.log(this._translate.getDefaultLang())
  }
  login() {
    this._navigationServ.login();
  }
  register() {
    this._navigationServ.register();
  }
  logout() {
    this._authService.signOut;
    this._notifierService.createToast( 'Logout Success', 'success', 5000);
    this._navigationServ.root();
  }
  admin() {
    this.loading = true;
  }
}
