import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsService, NewsSnippet } from '../../../news.service';
import { NewsSnippetCardComponent } from '../../../news-snippet-card.component';
import { Observable } from 'rxjs';
import { NgxParticlesModule } from '@tsparticles/angular';
import { loadFirePreset } from '@tsparticles/preset-fire';
import { Engine } from '@tsparticles/engine';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NewsSnippetCardComponent, NgxParticlesModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  particlesOptions: any = {};
  newsSnippets$: Observable<NewsSnippet[]>;
  isBrowser: boolean;

  quickLinks = [
    {
      icon: 'school',
      label: 'Browse Learning Materials',
      link: '/materials',
      description: 'Explore curated AI learning resources.'
    },
    {
      icon: 'auto_stories',
      label: 'Discover AI Courses',
      link: '/courses',
      description: 'Find company-approved AI courses.'
    },
    {
      icon: 'groups',
      label: 'Join AI Community',
      link: '/community',
      description: 'Connect with colleagues and share knowledge.'
    }
  ];

  constructor(
    private newsService: NewsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.newsSnippets$ = this.newsService.getLatestNews(4);
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ngOnInit() {
    if (this.isBrowser) {
      // Enhanced configuration for better fire particles
      this.particlesOptions = {
        preset: "fire",
        fullScreen: { enable: false },
        fpsLimit: 120,
        background: {
          color: {
            value: "transparent"
          },
          opacity: 0
        },
        particles: {
          number: {
            value: 200,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#fdcf58", "#ff9a42", "#ff6242", "#ff0000"]
          },
          shape: {
            type: "circle"
          },
          opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
              enable: true,
              speed: 3,
              minimumValue: 0.1,
              sync: false
            }
          },
          size: {
            value: { min: 1, max: 5 },
            animation: {
              enable: true,
              speed: 5,
              minimumValue: 0.1,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 5,
            direction: "top",
            random: true,
            straight: false,
            outModes: {
              default: "out"
            }
          }
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            resize: true
          }
        },
        detectRetina: true,
        emitters: [
          {
            direction: "top",
            rate: {
              delay: 0.1,
              quantity: 5
            },
            position: {
              x: 0.3,
              y: 1
            },
            size: {
              width: 50,
              height: 10
            }
          },
          {
            direction: "top",
            rate: {
              delay: 0.1,
              quantity: 5
            },
            position: {
              x: 0.7,
              y: 1
            },
            size: {
              width: 50,
              height: 10
            }
          }
        ]
      };
      
      console.log('Particles initialized with enhanced fire preset config');
    }
  }  async particlesInit(main: any): Promise<void> {
    if (this.isBrowser) {
      try {
        console.log('Initializing particles engine', main);
        // Load the fire preset - the main parameter contains the engine
        await loadFirePreset(main);
        console.log('Particles engine initialized with fire preset');
      } catch (error) {
        console.error('Error initializing particles:', error);
      }
    }
  }
}
