export interface Species {
  id?: string;
  name: string;
  power: number;
  ability: string;
  victories?: number;
}

export interface SpeciesForm {
  name: string;
  power: string;
  ability: string;
}