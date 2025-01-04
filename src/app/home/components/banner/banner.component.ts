import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MinioService } from '@services/minio.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent implements OnInit{
  private _translate = inject(TranslateService);
  private _minioService = inject(MinioService);
  bckUrl: string = '';

  ngOnInit(): void {
    this.bckUrl = this._minioService.getObjectUrl('marckeen-frontend/assets/front/images', 'city.png');
    console.log(this._translate.getDefaultLang())
  }
}
