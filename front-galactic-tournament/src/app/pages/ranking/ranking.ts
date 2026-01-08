import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Table, Column } from '../../shared/components/ui/table/table';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [Table],
  templateUrl: './ranking.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Ranking {
  rankingData = [
    { position: 1, name: 'Xenomorph', wins: 42, winRate: '95%' },
    { position: 2, name: 'Predator', wins: 38, winRate: '88%' },
    { position: 3, name: 'Klingon', wins: 35, winRate: '82%' },
    { position: 4, name: 'Wookie', wins: 20, winRate: '65%' },
    { position: 5, name: 'Ewok', wins: 5, winRate: '15%' },
  ];

  columns: Column[] = [
    { key: 'position', header: '#' },
    { key: 'name', header: 'Especie' },
    { key: 'wins', header: 'Victorias' },
    { key: 'winRate', header: 'Ratio de Victoria' },
  ];
}
