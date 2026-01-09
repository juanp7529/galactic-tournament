import { Router } from 'express';
import { SpecieController } from '../controllers/specie.controller.js';

const router = Router();
const specieController = new SpecieController();

// GET /api/species/top
router.get('/top', specieController.getTopSpecies);

// GET /api/species
router.get('/', specieController.getAllSpecies);

// POST /api/species
router.post('/', specieController.createSpecie);

export default router;
