import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Material, MaterialType, DifficultyLevel } from '../models/material.model';
import { MaterialsService } from '../services/materials.service';
import { MaterialCardComponent } from '../components/material-card.component';
import { FilterPanelComponent } from '../components/filter-panel.component';
import { Observable, combineLatest, map, startWith } from 'rxjs';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialCardComponent, FilterPanelComponent],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent {
  materials$: Observable<Material[]>;
  tags$: Observable<string[]>;
  types = Object.values(MaterialType);
  difficulties = Object.values(DifficultyLevel);

  selectedTags: string[] = [];
  selectedType: MaterialType | '' = '';
  selectedDifficulty: DifficultyLevel | '' = '';
  search: string = '';
  sort: string = 'title';
  page = 1;
  pageSize = 6;

  filteredMaterials$: Observable<Material[]>;
  totalPages = 1;

  constructor(private materialsService: MaterialsService) {
    this.materials$ = this.materialsService.getMaterials();
    this.tags$ = this.materialsService.getUniqueTags();
    this.filteredMaterials$ = combineLatest([
      this.materials$,
      this.tags$,
    ]).pipe(
      map(([materials]) => this.filterAndSort(materials))
    );
  }

  filterAndSort(materials: Material[]): Material[] {
    let filtered = materials.filter(m =>
      (this.selectedTags.length === 0 || this.selectedTags.every(tag => m.tags.includes(tag))) &&
      (!this.selectedType || m.type === this.selectedType) &&
      (!this.selectedDifficulty || m.difficulty === this.selectedDifficulty) &&
      (this.search === '' || m.title.toLowerCase().includes(this.search.toLowerCase()) || m.description.toLowerCase().includes(this.search.toLowerCase()))
    );
    if (this.sort === 'title') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    // Add more sort options as needed
    this.totalPages = Math.max(1, Math.ceil(filtered.length / this.pageSize));
    const start = (this.page - 1) * this.pageSize;
    return filtered.slice(start, start + this.pageSize);
  }

  onTagsChange(tags: string[]) {
    this.selectedTags = tags;
    this.page = 1;
    this.refresh();
  }
  onTypeChange(type: MaterialType | '') {
    this.selectedType = type;
    this.page = 1;
    this.refresh();
  }
  onDifficultyChange(diff: DifficultyLevel | '') {
    this.selectedDifficulty = diff;
    this.page = 1;
    this.refresh();
  }
  onSearchChange(search: string) {
    this.search = search;
    this.page = 1;
    this.refresh();
  }
  onSortChange(sort: string) {
    this.sort = sort;
    this.page = 1;
    this.refresh();
  }
  onPageChange(page: number) {
    this.page = page;
    this.refresh();
  }
  refresh() {
    this.materials$ = this.materialsService.getMaterials();
    this.filteredMaterials$ = combineLatest([
      this.materials$,
      this.tags$,
    ]).pipe(
      map(([materials]) => this.filterAndSort(materials))
    );
  }
}
