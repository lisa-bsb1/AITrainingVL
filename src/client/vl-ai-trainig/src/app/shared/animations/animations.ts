// Animations for the app

// Common animations to be used across components
import { 
  trigger, 
  transition, 
  style, 
  animate, 
  query, 
  stagger, 
  animateChild,
  group
} from '@angular/animations';

// Fade in animation
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease', style({ opacity: 1 }))
  ]),
  transition(':leave', [
    animate('300ms ease', style({ opacity: 0 }))
  ])
]);

// Slide up animation
export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(20px)', opacity: 0 }),
    animate('400ms ease', style({ transform: 'translateY(0)', opacity: 1 }))
  ])
]);

// Slide in from left
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ transform: 'translateX(-40px)', opacity: 0 }),
    animate('400ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

// Slide in from right
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ transform: 'translateX(40px)', opacity: 0 }),
    animate('400ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
  ])
]);

// List stagger animation
export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(15px)' }),
      stagger('60ms', [
        animate('400ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Page transition animation
export const pageAnimation = trigger('pageAnimation', [
  transition(':enter', [
    query('@*', animateChild(), { optional: true })
  ])
]);

// Pulse animation (for notifications, highlights)
export const pulse = trigger('pulse', [
  transition('* => *', [
    style({ transform: 'scale(1)' }),
    animate('300ms ease-in-out', style({ transform: 'scale(1.05)' })),
    animate('300ms ease-in-out', style({ transform: 'scale(1)' }))
  ])
]);

// Aurora glow animation
export const auroraGlow = trigger('auroraGlow', [
  transition('* => *', [
    style({ boxShadow: '0 0 0 rgba(59, 255, 203, 0)' }),
    animate('1500ms ease-in-out', style({ boxShadow: '0 0 15px rgba(59, 255, 203, 0.7)' })),
    animate('1500ms ease-in-out', style({ boxShadow: '0 0 0 rgba(59, 255, 203, 0)' }))
  ])
]);

// Route animation for page transitions
export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 })
    ], { optional: true }),
    query(':leave', [
      style({ opacity: 1 }),
      animate('200ms ease-out', style({ opacity: 0 }))
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      animate('400ms ease-out', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);
