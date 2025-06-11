import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout/layout.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LayoutComponent, NgxUiLoaderModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agrisetu';
  constructor(private router: Router, private translate: TranslateService) {
   
  }

  isAuthenticated(): boolean {
    // List of routes that should NOT use the layout
    const noLayoutRoutes = ['/login', '/register', '/not-found'];

    // Get the current route
    const currentRoute = this.router.url;

    // If current route is in noLayoutRoutes, return false (don't show layout)
    return !noLayoutRoutes.includes(currentRoute);
  }
}
