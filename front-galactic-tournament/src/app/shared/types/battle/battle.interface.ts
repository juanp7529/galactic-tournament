export interface CreateBattle {
  first_specie_id: number;
  second_specie_id: number;
  winner_id?: number;
  date?: string;
}

export interface Battle {
  id: number;
  first_specie_id: number;
  second_specie_id: number;
  winner_id: number;
  date: string;
  created_at: string;
}