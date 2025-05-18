import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="app-header" [class.scrolled]="isScrolled">
      <div class="container">
        <div class="logo" routerLink="/">
          <img class="logo-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Bo3DAixFWCOiyV0xrh9TJXFaswwMVridFA&s" alt="AI Training Logo">
          <span class="logo-text">AI Training</span>
        </div>
        
        <button class="menu-toggle" (click)="toggleMenu()" aria-label="Toggle menu">
          <span class="material-icons">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>
        
        <nav class="main-nav" [class.open]="isMenuOpen">
          <ul>
            <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">
              <span class="material-icons">home</span>
              <span>Home</span>
            </a></li>
            <li><a routerLink="/materials" routerLinkActive="active" (click)="closeMenu()">
              <span class="material-icons">library_books</span>
              <span>Materials</span>
            </a></li>
            <li><a routerLink="/courses" routerLinkActive="active" (click)="closeMenu()">
              <span class="material-icons">school</span>
              <span>Courses</span>
            </a></li>
            <li><a routerLink="/community" routerLinkActive="active" (click)="closeMenu()">
              <span class="material-icons">people</span>
              <span>Community</span>
            </a></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuOpen = false;
  isScrolled = false;
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 10;
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth > 768 && this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  }

  closeMenu() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      document.body.classList.remove('menu-open');
    }
  }
}
