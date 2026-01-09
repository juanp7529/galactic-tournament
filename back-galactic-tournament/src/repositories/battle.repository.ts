import { db } from "../config/database.js";
import {
  Battle,
  CreateBattleDTO,
  UpdateBattleDTO,
  BattleWithDetails,
  IBattleRepository,
} from "../models/battle.js";

export class BattleRepository implements IBattleRepository {
  create(data: CreateBattleDTO): Battle {
    const stmt = db.prepare(`
      INSERT INTO battle (first_specie_id, second_specie_id, winner_id, date)
      VALUES (?, ?, ?, ?)
    `);

    const result = stmt.run(
      data.first_specie_id,
      data.second_specie_id,
      data.winner_id,
      data.date
    );
    return this.findById(Number(result.lastInsertRowid)) as Battle;
  }

  findAll(): Battle[] {
    const stmt = db.prepare("SELECT * FROM battle ORDER BY date DESC");
    return stmt.all() as Battle[];
  }

  findAllWithDetails(): BattleWithDetails[] {
    const stmt = db.prepare(`
      SELECT 
        b.*,
        s1.name as first_specie_name,
        s2.name as second_specie_name,
        sw.name as winner_name
      FROM battle b
      JOIN specie s1 ON b.first_specie_id = s1.id
      JOIN specie s2 ON b.second_specie_id = s2.id
      JOIN specie sw ON b.winner_id = sw.id
      ORDER BY b.date DESC
    `);
    return stmt.all() as BattleWithDetails[];
  }

  findById(id: number): Battle | undefined {
    const stmt = db.prepare("SELECT * FROM battle WHERE id = ?");
    return stmt.get(id) as Battle | undefined;
  }

  count(): number {
    const stmt = db.prepare("SELECT COUNT(*) as count FROM battle");
    const result = stmt.get() as { count: number };
    return result.count;
  }
}
