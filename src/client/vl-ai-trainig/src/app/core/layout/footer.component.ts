import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="app-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section brand">
            <div class="footer-logo">
              <span class="material-icons">psychology</span>
              <h3>AI Training Platform</h3>
            </div>
            <p>Empowering employees with AI knowledge and tools to drive innovation</p>
            <div class="social-links">
              <a href="#" aria-label="Twitter"><span class="material-icons">language</span></a>
              <a href="#" aria-label="LinkedIn"><span class="material-icons">groups</span></a>
              <a href="#" aria-label="GitHub"><span class="material-icons">code</span></a>
            </div>
          </div>

          <div class="footer-section links">
            <h4><span class="material-icons">link</span> Quick Links</h4>
            <ul>
              <li><a routerLink="/materials"><span class="material-icons">library_books</span> Materials</a></li>
              <li><a routerLink="/courses"><span class="material-icons">school</span> Courses</a></li>
              <li><a routerLink="/community"><span class="material-icons">people</span> Community</a></li>
            </ul>
          </div>

          <div class="footer-section resources">
            <h4><span class="material-icons">help_outline</span> Resources</h4>
            <ul>
              <li><a href="#"><span class="material-icons">support</span> Help Center</a></li>
              <li><a href="#"><span class="material-icons">policy</span> Privacy Policy</a></li>
              <li><a href="#"><span class="material-icons">gavel</span> Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div class="copyright">
          <p>&copy; {{ currentYear }} AI Training Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
