import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface NewsSnippet {
  title: string;
  summary: string;
  slug: string;
}

@Injectable({ providedIn: 'root' })
export class NewsService {
  private mockNews: NewsSnippet[] = [
    {
      title: 'AI Training Platform Launch',
      summary: 'Discover our new internal AI training platform for employees.',
      slug: 'ai-training-platform-launch'
    },
    {
      title: 'Upcoming AI Workshops',
      summary: 'Join our hands-on AI workshops to boost your skills.',
      slug: 'upcoming-ai-workshops'
    },
    {
      title: 'Employee Success Stories',
      summary: 'Read how colleagues are leveraging AI in their daily work.',
      slug: 'employee-success-stories'
    },
    {
      title: 'AI Ethics Guidelines',
      summary: 'Stay informed about our company’s AI ethics and best practices.',
      slug: 'ai-ethics-guidelines'
    }
  ];

  getLatestNews(count: number = 4): Observable<NewsSnippet[]> {
    return of(this.mockNews.slice(0, count));
  }
}
