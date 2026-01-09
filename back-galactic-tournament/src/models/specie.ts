
export interface Specie {
  id: number;
  name: string;
  power: number;
  ability: string;
  victories: number;
  created_at: string;
}


export interface CreateSpecieDTO {
  name: string;
  power: number;
  ability: string;
}


export interface UpdateSpecieDTO {
  name?: string;
  power?: number;
  ability?: string;
  victories?: number;
}

export interface ISpecieRepository {
  create(data: CreateSpecieDTO): Specie;
  findAll(): Specie[];
  findById(id: number): Specie | undefined;
  incrementVictories(id: number): Specie | undefined;
  getTopByVictories(limit: number): Specie[];
}

export interface ISpecieService {
  createSpecie(data: CreateSpecieDTO): Promise<Specie>;
  getAllSpecies(): Promise<Specie[]>;
  getTopSpecies(limit: number): Promise<Specie[]>;
}