export interface Battle {
  id: number;
  first_specie_id: number;
  second_specie_id: number;
  winner_id: number;
  date: string;
  created_at: string;
}

export interface CreateBattleDTO {
  first_specie_id: number;
  second_specie_id: number;
  winner_id: number;
  date: string;
}

export interface UpdateBattleDTO {
  first_specie_id?: number;
  second_specie_id?: number;
  winner_id?: number;
  date?: string;
}

export interface BattleWithDetails extends Battle {
  first_specie_name: string;
  second_specie_name: string;
  winner_specie_name: string;
}

export interface IBattleRepository {
  create(data: CreateBattleDTO): Battle;
  findAll(): Battle[];
  findAllWithDetails(): BattleWithDetails[];
  findById(id: number): Battle | undefined;
  count(): number;
}

export interface IBattleService {
  createBattle(data: CreateBattleDTO): Promise<Battle>;
  getAllBattles(): Promise<Battle[]>;
  getAllBattlesWithDetails(): Promise<BattleWithDetails[]>;
  validateBattleParticipants(firstSpecieId: number, secondSpecieId: number): Promise<void>;
}