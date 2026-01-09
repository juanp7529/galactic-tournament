export interface Species {
  id: string;
  name: string;
  power: number;
  ability: string;
  victories?: number;
}

export interface BattleState {
  availableSpecies: Species[];
  contender1: Species | null;
  contender2: Species | null;
}

export interface SpeciesForm {
  name: string;
  power: string;
  ability: string;
}