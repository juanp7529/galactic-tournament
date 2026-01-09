import { Request, Response, NextFunction } from 'express';
import { BattleService } from '../services/battle.service.js';
import { CreateBattleDTO, UpdateBattleDTO } from '../models/battle.js';


export class BattleController {
  private battleService: BattleService;
  constructor() {
    this.battleService = new BattleService();
  }

  /**
   * GET /api/battles
   */
  getAllBattles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const withDetails = req.query.details === 'true';
      
      const battles = withDetails 
        ? await this.battleService.getAllBattlesWithDetails()
        : await this.battleService.getAllBattles();
        
      res.json({
        success: true,
        data: battles,
        count: battles.length
      });
    } catch (error) {
      next(error);
    }
  };


  /**
   * POST /api/battles
   */
  createBattle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const battleData: CreateBattleDTO = req.body;
      const battle = await this.battleService.createBattle(battleData);
      res.status(201).json({
        success: true,
        data: battle,
        message: 'Batalla registrada exitosamente'
      });
    } catch (error) {
      next(error);
    }
  };
}
