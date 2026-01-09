import { db } from "../config/database.js";
import { Specie, CreateSpecieDTO, UpdateSpecieDTO, ISpecieRepository } from "../models/specie.js";

export class SpecieRepository implements ISpecieRepository {
  create(data: CreateSpecieDTO): Specie {
    const stmt = db.prepare(`
      INSERT INTO specie (name, power, ability, victories)
      VALUES (?, ?, ?, 0)
    `);
    const result = stmt.run(data.name, data.power, data.ability);
    return this.findById(Number(result.lastInsertRowid)) as Specie;
  }

  findAll(): Specie[] {
    const stmt = db.prepare(
      "SELECT * FROM specie ORDER BY victories DESC, power DESC"
    );
    return stmt.all() as Specie[];
  }

  findById(id: number): Specie | undefined {
    const stmt = db.prepare("SELECT * FROM specie WHERE id = ?");
    return stmt.get(id) as Specie | undefined;
  }

  incrementVictories(id: number): Specie | undefined {
    const stmt = db.prepare(
      "UPDATE specie SET victories = victories + 1 WHERE id = ?"
    );
    stmt.run(id);
    return this.findById(id);
  }

  getTopByVictories(): Specie[] {
    const stmt = db.prepare(`
      SELECT * FROM specie 
      ORDER BY victories DESC
    `);
    return stmt.all() as Specie[];
  }

  findByName(name: string): Specie | undefined {
    const stmt = db.prepare("SELECT * FROM specie WHERE name = ?");
    return stmt.get(name) as Specie | undefined;
  }
}
