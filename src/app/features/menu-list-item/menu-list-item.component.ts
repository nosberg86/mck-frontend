import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NavItem } from '@models/request';
import { NavService } from '@services/nav.service';

@Component({
  selector: 'app-menu-list-item',
  standalone: true,
  imports: [],
  templateUrl: './menu-list-item.component.html',
  styleUrl: './menu-list-item.component.scss'
})
export class MenuListItemComponent implements OnInit {
  expanded = false;

    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: NavItem | null = null;
    @Input() depth: number | undefined;

  constructor(public navService: NavService,
    public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      if (this.item!.route && url) {
          this.expanded = url.indexOf(`/${this.item!.route}`) === 0;
          this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
        this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
        this.expanded = !this.expanded;
    }
}

}

