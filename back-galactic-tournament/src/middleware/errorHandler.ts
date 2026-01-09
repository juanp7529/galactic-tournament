import { Request, Response, NextFunction } from "express";

/**
 * Middleware global para manejo de errores
 */
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error.message);
  let statusCode = 500;

  if (
    error.message.includes("no encontrada") ||
    error.message.includes("no encontrado")
  ) {
    statusCode = 404;
  } else if (
    error.message.includes("Ya existe") ||
    error.message.includes("debe ser") ||
    error.message.includes("requerido") ||
    error.message.includes("inválid") ||
    error.message.includes("no puede")
  ) {
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message: error.message,
    error: {
      type: error.name,
      statusCode,
    },
  });
};

/**
 * Middleware para manejar rutas no encontradas
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: `Ruta no encontrada: ${req.method} ${req.path}`,
    error: {
      type: "NotFound",
      statusCode: 404,
    },
  });
};
