import { Request, Response, NextFunction } from "express";
import { SpecieService } from "../services/specie.service.js";
import { CreateSpecieDTO, UpdateSpecieDTO } from "../models/specie.js";

export class SpecieController {
  private specieService: SpecieService;
  constructor() {
    this.specieService = new SpecieService();
  }

  /**
   * GET /api/species
   */
  getAllSpecies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const species = await this.specieService.getAllSpecies();
      res.json({
        success: true,
        data: species,
        count: species.length,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * GET /api/species/top
   */
  getTopSpecies = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const species = await this.specieService.getTopSpecies();
      res.json({
        success: true,
        data: species,
        count: species.length,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * POST /api/species
   */
  createSpecie = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const specieData: CreateSpecieDTO = req.body;
      const specie = await this.specieService.createSpecie(specieData);
      res.status(201).json({
        success: true,
        data: specie,
        message: "Especie creada exitosamente",
      });
    } catch (error) {
      next(error);
    }
  };
}
