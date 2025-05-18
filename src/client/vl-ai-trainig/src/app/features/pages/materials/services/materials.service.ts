import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Material, MaterialType, DifficultyLevel } from '../models/material.model';

@Injectable({ providedIn: 'root' })
export class MaterialsService {
  private materials: Material[] = [
    {
      id: '1',
      title: 'Introduction to Machine Learning',
      description: 'A beginner-friendly article covering ML basics.',      type: MaterialType.Article,
      difficulty: DifficultyLevel.Beginner,
      tags: ['Machine Learning (ML)', 'AI Tools & Frameworks'],
      url: 'https://example.com/ml-intro',
      imageUrl: 'https://placehold.co/600x400?text=ML+Intro'
    },
    {
      id: '2',
      title: 'Deep Learning with Python',
      description: 'Hands-on book for deep learning using Python.',      type: MaterialType.Book,
      difficulty: DifficultyLevel.Intermediate,
      tags: ['Deep Learning', 'AI Tools & Frameworks'],
      url: 'https://example.com/deep-learning-python',
      imageUrl: 'https://placehold.co/600x400?text=Deep+Learning+Python'
    },
    {
      id: '3',
      title: 'NLP in Practice',
      description: 'Video course on Natural Language Processing.',      type: MaterialType.Course,
      difficulty: DifficultyLevel.Advanced,
      tags: ['Natural Language Processing (NLP)', 'Large Language Models (LLM)'],
      url: 'https://example.com/nlp-course',
      imageUrl: 'https://placehold.co/600x400?text=NLP+Course'
    },
    {
      id: '4',
      title: 'AI Ethics Explained',
      description: 'Podcast discussing ethical considerations in AI.',      type: MaterialType.Podcast,
      difficulty: DifficultyLevel.Beginner,
      tags: ['AI Ethics'],
      url: 'https://example.com/ai-ethics',
      imageUrl: 'https://placehold.co/600x400?text=AI+Ethics'
    },
    // ...add more mock materials as needed
  ];

  private tags = [
    'Machine Learning (ML)', 'Large Language Models (LLM)', 'Deep Learning', 'Natural Language Processing (NLP)',
    'Computer Vision', 'Reinforcement Learning', 'AI Ethics', 'Data Science', 'MLOps', 'Generative AI',
    'AI Tools & Frameworks', 'Quantum Computing & AI', 'AI in Healthcare', 'AI in Finance', 'Robotics'
  ];

  getMaterials(): Observable<Material[]> {
    return of(this.materials);
  }

  getUniqueTags(): Observable<string[]> {
    return of(this.tags);
  }
}
