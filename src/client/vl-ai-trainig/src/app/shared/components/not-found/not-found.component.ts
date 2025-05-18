import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="not-found-container">
      <div class="not-found-content">
        <span class="error-code">404</span>
        <h1>Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        
        <div class="actions">
          <a routerLink="/" class="btn btn-primary">
            <span class="material-icons">home</span>
            Return Home
          </a>
          <button class="btn btn-outline" onclick="history.back()">
            <span class="material-icons">arrow_back</span>
            Go Back
          </button>
        </div>
        
        <div class="suggestions">
          <h2>You might be looking for:</h2>
          <ul>
            <li><a routerLink="/materials">Learning Materials</a></li>
            <li><a routerLink="/courses">AI Courses</a></li>
            <li><a routerLink="/community">Community</a></li>
          </ul>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 2rem 1rem;
    }
    
    .not-found-content {
      max-width: 600px;
      text-align: center;
      
      .error-code {
        font-size: 7rem;
        font-weight: 700;
        line-height: 1;
        display: block;
        background: linear-gradient(135deg, var(--primary), var(--accent));
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 1rem;
      }
      
      h1 {
        font-size: 2rem;
        margin-bottom: 1rem;
      }
      
      p {
        color: var(--text-secondary);
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }
    }
    
    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-bottom: 3rem;
      
      @media (max-width: 576px) {
        flex-direction: column;
        align-items: center;
      }
      
      .btn {
        display: flex;
        align-items: center;
        
        .material-icons {
          margin-right: 0.5rem;
          font-size: 1.25rem;
        }
      }
    }
    
    .suggestions {
      background-color: var(--background-alt);
      padding: 1.5rem;
      border-radius: var(--radius-md);
      
      h2 {
        font-size: 1.25rem;
        margin-bottom: 1rem;
        font-weight: 600;
      }
      
      ul {
        list-style: none;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
        
        li a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  `]
})
export class NotFoundComponent {}
