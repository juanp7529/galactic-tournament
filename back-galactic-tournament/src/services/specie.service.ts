import { SpecieRepository } from "../repositories/specie.repository.js";
import { Specie, CreateSpecieDTO, UpdateSpecieDTO, ISpecieService } from "../models/specie.js";

export class SpecieService implements ISpecieService {
  private specieRepo: SpecieRepository;
  constructor() {
    this.specieRepo = new SpecieRepository();
  }

  async createSpecie(data: CreateSpecieDTO): Promise<Specie> {
    try {
      this.validateName(data.name);
      this.validatePower(data.power);
      this.validateAbility(data.ability);
      const existing = this.specieRepo.findByName(data.name);
      if (existing) {
        throw new Error(`Ya existe una especie con el nombre "${data.name}"`);
      }
      return this.specieRepo.create(data);
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la especie");
    }
  }

  async getAllSpecies(): Promise<Specie[]> {
    return this.specieRepo.findAll();
  }

  async getTopSpecies(): Promise<Specie[]> {
    return this.specieRepo.getTopByVictories();
  }

  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error("El nombre es requerido");
    }
    if (name.length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }
    if (name.length > 50) {
      throw new Error("El nombre no puede exceder 50 caracteres");
    }
  }

  private validatePower(power: number): void {
    if (typeof power !== "number" || isNaN(power)) {
      throw new Error("El poder debe ser un número válido");
    }
    if (power < 0) {
      throw new Error("El poder no puede ser negativo");
    }
    if (power > 100) {
      throw new Error("El poder no puede exceder 100");
    }
  }

  private validateAbility(ability: string): void {
    if (!ability || ability.trim().length === 0) {
      throw new Error("La habilidad es requerida");
    }
    if (ability.length < 3) {
      throw new Error("La habilidad debe tener al menos 3 caracteres");
    }
    if (ability.length > 100) {
      throw new Error("La habilidad no puede exceder 100 caracteres");
    }
  }
}
