import {AfterViewInit, ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';

import {NgClass, NgOptimizedImage} from "@angular/common";
import {NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter, take} from "rxjs";
import {MenuOption} from "../../models/utils";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    NgClass,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
  `
})
export class MenuComponent implements AfterViewInit {

  options = signal<MenuOption[]>([
    {label: 'Home', path: '/home', icon: 'bi-house', selected: true},
    {label: 'Dipendenti', path: '/users', icon: 'bi-people', selected: false},
    {label: 'Aziende', path: '/places', icon: 'bi-building', selected: false},
    {label: 'Assense', path: '/absences', icon: 'bi-person-slash', selected: false},
    {label: 'Resoconto', path: '/reports', icon: 'bi-clipboard-data', selected: false},
  ]);


  constructor() {
    const router = inject(Router);
    router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      take(1),
    ).subscribe((event) => {
      const prevOptions = this.options();
      prevOptions.forEach((option) => {
        option.selected = option.path === (event as NavigationEnd).url;
      });
      this.options.set([]);
      this.options.set(prevOptions);
    });

  }

  ngAfterViewInit() {

  }

  setActiveRoute(i: number) {
    this.options.update((options) => {
      options.forEach((option, index) => {
        option.selected = index === i;
      });
      return options;
    });

  }
}

