import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="courses-container">
      <header class="page-header glass">
        <h1>AI Training Courses</h1>
        <p>Structured learning pathways to master AI concepts</p>
      </header>

      <div class="coming-soon-container">
        <span class="material-icons">school</span>
        <h2>Coming Soon</h2>
        <p>We're currently developing comprehensive AI training courses for all skill levels.</p>
        <p>Check back soon or subscribe to our newsletter to be notified when courses become available.</p>
        
        <div class="newsletter-signup">
          <h3>Get notified when courses launch</h3>
          <div class="form-group">
            <input type="email" placeholder="Enter your email address" class="form-control" aria-label="Email address">
            <button class="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`    .courses-container {
      padding: 2rem 0;
      position: relative;
      
      // Add subtle aurora background effect
      &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 200px;
        background: linear-gradient(180deg, rgba(59, 255, 203, 0.05) 0%, rgba(127, 56, 255, 0.05) 50%, rgba(0, 0, 0, 0) 100%);
        pointer-events: none;
        z-index: -1;
      }
    }
    
    .page-header {
      text-align: center;
      padding: 3rem 1rem;
      margin-bottom: 3rem;
      border-radius: var(--radius-lg);
      background: rgba(30, 30, 30, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(70, 70, 70, 0.5);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
      
      // Add aurora gradient at the top
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, #3BFFCB, #7F38FF);
        opacity: 0.8;
      }
      
      h1 {
        margin-bottom: 1rem;
        background: linear-gradient(135deg, #3BFFCB, #7F38FF);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        font-size: 2rem;
        font-weight: 700;
      }
      
      p {
        color: #B0B0B0;
        font-size: 1.1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }
    
    .coming-soon-container {
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 3rem 1rem;
      
      .material-icons {
        font-size: 4rem;
        background: linear-gradient(135deg, #3BFFCB, #7F38FF);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 1.5rem;
      }
      
      h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        color: #E0E0E0;
      }
      
      p {
        color: #B0B0B0;
        margin-bottom: 1rem;
        line-height: 1.6;
      }
    }
    
    .newsletter-signup {
      margin-top: 3rem;
      padding: 2rem;
      background: rgba(30, 30, 30, 0.6);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-radius: var(--radius-lg);
      border: 1px solid rgba(70, 70, 70, 0.5);
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      position: relative;
      overflow: hidden;
      
      // Add subtle aurora gradient at the edge
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 3px;
        height: 100%;
        background: linear-gradient(180deg, #3BFFCB, #7F38FF);
        opacity: 0.8;
      }
      
      h3 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
        color: #E0E0E0;
      }
      
      .form-group {
        display: flex;
        gap: 0.5rem;
        max-width: 400px;
        margin: 0 auto;
        
        @media (max-width: 576px) {
          flex-direction: column;
        }
          .form-control {
          flex: 1;
          min-width: 0;
          height: 44px;
          padding: 0 16px;
          background: rgba(40, 40, 40, 0.8);
          border: 1px solid rgba(70, 70, 70, 0.6);
          border-radius: var(--radius-md);
          color: #E0E0E0;
          font-size: 14px;
          
          &::placeholder {
            color: #808080;
          }
          
          &:focus {
            outline: none;
            border-color: #3BFFCB;
            box-shadow: 0 0 0 2px rgba(59, 255, 203, 0.2);
          }
        }
        
        .btn-primary {
          background: linear-gradient(90deg, #3BFFCB, #7F38FF);
          color: #FFFFFF;
          border: none;
          padding: 0 20px;
          height: 44px;
          font-weight: 500;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all 0.2s ease;
          
          &:hover {
            box-shadow: 0 4px 12px rgba(127, 56, 255, 0.3);
            transform: translateY(-2px);
          }
          
          &:active {
            transform: translateY(0);
            box-shadow: none;
          }
        }
      }
    }
  `]
})
export class CoursesComponent {}
