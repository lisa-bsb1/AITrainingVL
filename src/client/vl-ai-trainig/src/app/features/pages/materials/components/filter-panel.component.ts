import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialType, DifficultyLevel } from '../models/material.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatChipsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent {
  @Input() tags: string[] = [];
  @Input() selectedTags: string[] = [];
  @Input() types: MaterialType[] = [];
  @Input() selectedType: MaterialType | '' = '';
  @Input() difficulties: DifficultyLevel[] = [];
  @Input() selectedDifficulty: DifficultyLevel | '' = '';
  @Input() search: string = '';
  @Output() tagsChange = new EventEmitter<string[]>();
  @Output() typeChange = new EventEmitter<MaterialType | ''>();
  @Output() difficultyChange = new EventEmitter<DifficultyLevel | ''>();
  @Output() searchChange = new EventEmitter<string>();
  onTagToggle(tag: string): void {
    const isSelected = this.selectedTags.includes(tag);
    const updatedTags = isSelected 
      ? this.selectedTags.filter(t => t !== tag) 
      : [...this.selectedTags, tag];
    this.tagsChange.emit(updatedTags);
  }
  
  isTagSelected(tag: string): boolean {
    return this.selectedTags.includes(tag);
  }
}
