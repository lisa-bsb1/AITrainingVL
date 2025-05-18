import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="community-container">
      <header class="page-header glass">
        <h1>AI Community</h1>
        <p>Join the conversation and learn with other AI enthusiasts</p>
      </header>

      <div class="community-content">
        <div class="feature-card">
          <span class="material-icons">forum</span>
          <h3>Discussion Forums</h3>
          <p>Engage in conversations about AI topics with peers and experts</p>
        </div>
        
        <div class="feature-card">
          <span class="material-icons">groups</span>
          <h3>Study Groups</h3>
          <p>Join focused learning groups based on specific AI technologies</p>
        </div>
        
        <div class="feature-card">
          <span class="material-icons">event</span>
          <h3>Virtual Events</h3>
          <p>Participate in webinars, workshops, and conference streams</p>
        </div>
      </div>

      <div class="coming-soon-container">
        <span class="material-icons">rocket_launch</span>
        <h2>Coming Soon</h2>
        <p>Our community features are currently under development.</p>
        <p>Check back soon for the full launch!</p>
        
        <button class="btn btn-primary">Get Early Access</button>
      </div>
    </section>
  `,
  styles: [`    .community-container {
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
    
    .community-content {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 2rem;
      margin-bottom: 4rem;
      
      .feature-card {
        background: rgba(30, 30, 30, 0.6);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        padding: 2rem;
        border-radius: var(--radius-md);
        border: 1px solid rgba(70, 70, 70, 0.5);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        text-align: center;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        // Add subtle aurora gradient accent at the top
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3BFFCB, #7F38FF);
          opacity: 0.6;
        }
        
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }
        
        .material-icons {
          font-size: 3rem;
          background: linear-gradient(135deg, #3BFFCB, #7F38FF);
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          margin-bottom: 1.5rem;
        }
        
        h3 {
          margin-bottom: 1rem;
          font-size: 1.25rem;
          color: #E0E0E0;
          font-weight: 600;
        }
          p {
          color: #B0B0B0;
          line-height: 1.5;
        }
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
        animation: pulse 2s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% { opacity: 0.8; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.05); }
        100% { opacity: 0.8; transform: scale(1); }
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
      
      .btn-primary {
        margin-top: 1.5rem;
        background: linear-gradient(90deg, #3BFFCB, #7F38FF);
        color: #FFFFFF;
        border: none;
        padding: 0.75rem 1.5rem;
        font-weight: 500;
        border-radius: var(--radius-md);
        cursor: pointer;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
        
        &:hover {
          box-shadow: 0 4px 12px rgba(127, 56, 255, 0.3);
          transform: translateY(-2px);
        }
        
        &:active {
          transform: translateY(0);
          box-shadow: none;
        }
        
        &::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(90deg, rgba(59, 255, 203, 0.1), rgba(127, 56, 255, 0.1));
          transform: rotate(30deg);
          transition: transform 0.6s ease;
        }
        
        &:hover::after {
          transform: rotate(30deg) translate(10%, 10%);
        }
      }
    }
  `]
})
export class CommunityComponent {}
