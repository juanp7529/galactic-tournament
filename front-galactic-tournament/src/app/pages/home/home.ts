import { Component, inject, OnInit, signal } from '@angular/core';
import { SpeciesService } from '../../core/services/species/species.service';
import { BattleArena } from '../../layout/battle-arena/battle-arena';
import { SpeciesList } from '../../layout/species-list/species-list';
import { Species } from '../../shared/types/species/species.interface';
import { ApiResponse } from '../../shared/types/http/response.interface';
import { BattleService } from '../../core/services/battle/battle.service';

@Component({
  selector: 'app-home',
  imports: [SpeciesList, BattleArena],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  speciesService = inject(SpeciesService);
  battleService = inject(BattleService);
  species = signal<Species[]>([]);
  contender1 = this.battleService.contender1;
  contender2 = this.battleService.contender2;
  winnerName = signal<string | null>(null);

  async handleBattleStart() {
    const c1 = this.contender1();
    const c2 = this.contender2();
    if (c1 && c2) {
      try {
        const response = await this.battleService.createBattle({
          first_specie_id: Number(c1.id),
          second_specie_id: Number(c2.id),
        });
        if (response.success && response.data.winner_id) {
          const winner = Number(c1.id) === response.data.winner_id ? c1.name : c2.name;
          this.winnerName.set(winner);
        } else {
          console.error('Error al crear la batalla:', response.data);
        }
      } catch (error) {
        console.error('Error al crear la batalla:', error);
      }
    }
  }

  handleCloseWinner(): void {
    this.winnerName.set(null);
    this.battleService.resetBattle();
  }

  async ngOnInit() {
    await this.getSpecies();
  }

  async getSpecies(): Promise<void> {
    try {
      const response: ApiResponse<Species[]> = await this.speciesService.getAllSpecies();
      this.species.set(response.data);
      console.log(this.species);
    } catch (error) {
      console.error('Error al obtener las especies:', error);
    }
  }

  async handleSubmit(newSpecies: Species): Promise<void> {
    try {
      const response: ApiResponse<Species> = await this.speciesService.createSpecies(newSpecies);
      if (response.success) {
        this.species.update((species) => [...species, response.data]);
      } else {
        console.error('Error al crear la especie:', response.data);
      }
    } catch (error) {
      console.error('Error al crear la especie:', error);
    }
  }
}
