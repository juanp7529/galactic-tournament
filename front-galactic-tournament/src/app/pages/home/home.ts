import { Component, inject } from '@angular/core';
import { SpeciesService } from '../../core/services/species/species.service';
import { BattleArena } from '../../layout/battle-arena/battle-arena';
import { SpeciesList } from '../../layout/species-list/species-list';

@Component({
  selector: 'app-home',
  imports: [SpeciesList, BattleArena,],
  templateUrl: './home.html',
})
export class Home {
  speciesService = inject(SpeciesService);

  availableSpecies = this.speciesService.availableSpecies;
  contender1 = this.speciesService.contender1;
  contender2 = this.speciesService.contender2;

  handleBattleStart() {
    const c1 = this.contender1();
    const c2 = this.contender2();
    alert(`Iniciando batalla: ${c1?.name} VS ${c2?.name}`);
  }
}
