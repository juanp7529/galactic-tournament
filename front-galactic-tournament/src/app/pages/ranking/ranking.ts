import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Table, Column } from '../../shared/components/ui/table/table';
import { Species } from '../../shared/types/species/species.interface';
import { SpeciesService } from '../../core/services/species/species.service';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [Table],
  templateUrl: './ranking.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ranking implements OnInit {
  private speciesService = inject(SpeciesService);
  rankingData = signal<Species[]>([]);
  totalBattles = signal<number>(0);

  columns: Column[] = [
    { key: 'name', header: 'Especie' },
    { key: 'victories', header: 'Victorias' },
    { key: 'power', header: 'Poder' }
  ];

  async ngOnInit() {
    this.getRankingData();
  }

  async getRankingData() {
    try {
      const response = await this.speciesService.getTopSpecies();
      if (response.success) {
        this.rankingData.set(response.data);
        this.totalBattles.set(response.data.reduce((acc, species) => acc + (species.victories || 0), 0));
      }
    } catch (error) {
      console.error('Error al obtener el ranking:', error);
    }
  }
}
