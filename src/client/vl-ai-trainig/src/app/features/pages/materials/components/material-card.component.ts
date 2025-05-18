import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Material } from '../models/material.model';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-material-card',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  template: `
    <div class="material-card">
      <img *ngIf="material.imageUrl" [src]="material.imageUrl" [alt]="material.title" class="material-image" />
      <div class="material-content">
        <h3>{{ material.title }}</h3>
        <p>{{ material.description }}</p>
        <div class="material-meta">
          <span class="type">{{ material.type }}</span>
          <span class="difficulty">{{ material.difficulty }}</span>
        </div>        <div class="tags">
          <mat-chip-set>
            <mat-chip *ngFor="let tag of material.tags">{{ tag }}</mat-chip>
          </mat-chip-set>
        </div>
        <a [href]="material.url" target="_blank" class="material-link">View Material</a>
      </div>
    </div>
  `,
  styleUrls: ['./material-card.component.scss']
})
export class MaterialCardComponent {
  @Input() material!: Material;
}
