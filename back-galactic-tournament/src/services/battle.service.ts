import { BattleRepository } from "../repositories/battle.repository.js";
import { SpecieRepository } from "../repositories/specie.repository.js";
import {
  Battle,
  CreateBattleDTO,
  BattleWithDetails,
  IBattleService,
} from "../models/battle.js";

export class BattleService implements IBattleService {
  private battleRepo: BattleRepository;
  private specieRepo: SpecieRepository;
  constructor() {
    this.battleRepo = new BattleRepository();
    this.specieRepo = new SpecieRepository();
  }

  async createBattle(data: CreateBattleDTO): Promise<Battle> {
    let winnerId: number | undefined;
    try {
      await this.validateBattleParticipants(
        data.first_specie_id,
        data.second_specie_id
      );
      const firstSpecie = this.specieRepo.findById(data.first_specie_id);
      const secondSpecie = this.specieRepo.findById(data.second_specie_id);
      if (!firstSpecie || !secondSpecie) {
        throw new Error("Especie no encontrada");
      }
      if (firstSpecie.power === secondSpecie.power) {
        winnerId =
          firstSpecie.name.localeCompare(secondSpecie.name) < 0
            ? firstSpecie.id
            : secondSpecie.id;
      } else if (firstSpecie.power > secondSpecie.power) {
        winnerId = firstSpecie.id;
      } else {
        winnerId = secondSpecie.id;
      }

      const battleData = {
        first_specie_id: data.first_specie_id,
        second_specie_id: data.second_specie_id,
        winner_id: winnerId,
        date: new Date().toISOString(),
      };

      const battle = this.battleRepo.create(battleData);
      this.specieRepo.incrementVictories(winnerId);
      return battle;
    } catch (error) {
      console.error(error);
      throw new Error(
        error instanceof Error ? error.message : "Error desconocido"
      );
    }
  }

  async getAllBattles(): Promise<Battle[]> {
    try {
      return this.battleRepo.findAll();
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener todas las batallas");
    }
  }

  async getAllBattlesWithDetails(): Promise<BattleWithDetails[]> {
    try {
      return this.battleRepo.findAllWithDetails();
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener todas las batallas con detalles");
    }
  }

  public async validateBattleParticipants(
    firstSpecieId: number,
    secondSpecieId: number
  ): Promise<void> {
    const firstSpecie = this.specieRepo.findById(firstSpecieId);
    if (!firstSpecie) {
      throw new Error("Primera especie no encontrada");
    }
    const secondSpecie = this.specieRepo.findById(secondSpecieId);
    if (!secondSpecie) {
      throw new Error("Segunda especie no encontrada");
    }
    if (firstSpecieId === secondSpecieId) {
      throw new Error("Las especies deben ser diferentes");
    }
  }
}
