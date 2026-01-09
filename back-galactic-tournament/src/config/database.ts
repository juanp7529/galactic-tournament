import Database from 'better-sqlite3';
import { Database as DatabaseType } from 'better-sqlite3';

/**
 * Configuración de la base de datos SQLite en memoria
 * Singleton pattern para asegurar una única instancia de la BD
 */
class DatabaseConfig {
  private static instance: DatabaseConfig;
  private db: DatabaseType;

  private constructor() {
    // Base de datos en memoria - perfecto para desarrollo y testing
    // Si quieres usar archivo, cambia ':memory:' por './database.sqlite'
    this.db = new Database(':memory:', { 
      verbose: process.env.NODE_ENV === 'development' ? console.log : undefined 
    });
    
    // Habilitar foreign keys
    this.db.pragma('foreign_keys = ON');
    
    // Inicializar esquema
    this.initializeSchema();
  }

  /**
   * Obtener instancia única de la base de datos
   */
  public static getInstance(): DatabaseConfig {
    if (!DatabaseConfig.instance) {
      DatabaseConfig.instance = new DatabaseConfig();
    }
    return DatabaseConfig.instance;
  }

  /**
   * Obtener conexión a la base de datos
   */
  public getConnection(): DatabaseType {
    return this.db;
  }

  /**
   * Inicializar esquema de base de datos
   */
  private initializeSchema(): void {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS specie (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        power REAL NOT NULL,
        ability TEXT NOT NULL,
        victories INTEGER DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      )
    `);
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS battle (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_specie_id INTEGER NOT NULL,
        second_specie_id INTEGER NOT NULL,
        winner_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (first_specie_id) REFERENCES specie(id) ON DELETE CASCADE,
        FOREIGN KEY (second_specie_id) REFERENCES specie(id) ON DELETE CASCADE,
        FOREIGN KEY (winner_id) REFERENCES specie(id) ON DELETE CASCADE
      )
    `);
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_battle_first_specie 
      ON battle(first_specie_id);
    `);
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_battle_second_specie 
      ON battle(second_specie_id);
    `);
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_battle_winner 
      ON battle(winner_id);
    `);
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_battle_date 
      ON battle(date);
    `);
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_specie_victories 
      ON specie(victories DESC);
    `);
    console.log('Esquema de base de datos inicializado correctamente');
  }

  /**
   * Cerrar conexión de base de datos
   */
  public close(): void {
    this.db.close();
    console.log('🔌 Conexión a base de datos cerrada');
  }

  /**
   * Limpiar todas las tablas (útil para testing)
   */
  public clearAllTables(): void {
    this.db.exec('DELETE FROM battle');
    this.db.exec('DELETE FROM specie');
    console.log('🧹 Todas las tablas limpiadas');
  }
}

export const dbConfig = DatabaseConfig.getInstance();
export const db = dbConfig.getConnection();
