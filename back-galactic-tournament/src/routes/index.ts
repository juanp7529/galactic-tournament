import { Router } from 'express';
import specieRoutes from './specie.routes.js';
import battleRoutes from './battle.routes.js';

const router = Router();


router.use('/species', specieRoutes);
router.use('/battles', battleRoutes);


router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

export default router;
