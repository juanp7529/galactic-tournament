import { Router } from 'express';
import { BattleController } from '../controllers/battle.controller.js';

const router = Router();
const battleController = new BattleController();

// GET /api/battles
router.get('/', battleController.getAllBattles);

// POST /api/battles
router.post('/', battleController.createBattle);

export default router;
