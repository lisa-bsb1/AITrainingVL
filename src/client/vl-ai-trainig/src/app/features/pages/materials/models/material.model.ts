export enum MaterialType {
  Article = 'Article',
  Video = 'Video',
  Course = 'Course',
  Book = 'Book',
  Tool = 'Tool',
  Tutorial = 'Tutorial',
  Podcast = 'Podcast',
  Other = 'Other'
}

export enum DifficultyLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  difficulty: DifficultyLevel;
  tags: string[];
  url: string;
  imageUrl?: string;
}
