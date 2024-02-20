import {Component, inject, OnInit, signal} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {MenuComponent} from "./core/components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Angular 17 NgRx data';

  private router = inject(Router)

  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading.set(true);
      }
      else if (event instanceof NavigationError) {
        this.isLoading.set(false);
      }
      else if (event instanceof NavigationEnd) {
        this.isLoading.set(false);
      }
    });
  }


}
