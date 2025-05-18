import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent],  template: `
    <div class="app-container">
      <a class="skip-link" href="#main-content">Skip to main content</a>
      <app-header></app-header>
      
      <main id="main-content" class="main-content" role="main" aria-label="Main content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
      
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
