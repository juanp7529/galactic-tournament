import { Injectable, signal, computed } from '@angular/core';
import { Species } from '../../../shared/types/species/species';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private readonly INITIAL_SPECIES: Species[] = [
    { id: '1', name: 'Xenomorph', power: 95, ability: 'Venomous bite' },
    { id: '2', name: 'Predator', power: 90, ability: 'Predator language' },
    { id: '3', name: 'Wookie', power: 85, ability: 'Laser vision' },
    { id: '4', name: 'Ewok', power: 30, ability: 'Telekinesis' },
    { id: '5', name: 'Klingon', power: 88, ability: 'Klingon language' },
  ];

  // State signals
  private availableSpeciesSig = signal<Species[]>(this.INITIAL_SPECIES);
  private contender1Sig = signal<Species | null>(null);
  private contender2Sig = signal<Species | null>(null);

  // Read-only signals for components
  readonly availableSpecies = this.availableSpeciesSig.asReadonly();
  readonly contender1 = this.contender1Sig.asReadonly();
  readonly contender2 = this.contender2Sig.asReadonly();

  selectSpecies(species: Species) {
    const c1 = this.contender1Sig();
    const c2 = this.contender2Sig();

    if (!c1) {
      this.contender1Sig.set(species);
    } else if (!c2 && c1.id !== species.id) {
      this.contender2Sig.set(species);
    }
  }

  removeContender(slot: 1 | 2) {
    if (slot === 1) {
      this.contender1Sig.set(null);
    } else {
      this.contender2Sig.set(null);
    }
  }

  resetBattle() {
    this.contender1Sig.set(null);
    this.contender2Sig.set(null);
  }

  addSpecies(newSpecies: Species) {
    this.availableSpeciesSig.update(species => [...species, newSpecies]);
  }
}

