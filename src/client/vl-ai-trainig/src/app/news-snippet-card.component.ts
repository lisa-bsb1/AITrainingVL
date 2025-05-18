import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsSnippet } from './news.service';

@Component({
  selector: 'app-news-snippet-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="news-snippet-card">
      <h3>{{ snippet.title }}</h3>
      <p>{{ snippet.summary }}</p>
      <a [routerLink]="['/news', snippet.slug]" class="read-more">Read More</a>
    </div>
  `,
  styleUrls: ['./news-snippet-card.component.scss']
})
export class NewsSnippetCardComponent {
  @Input() snippet!: NewsSnippet;
}
