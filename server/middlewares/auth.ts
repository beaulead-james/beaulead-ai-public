import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
}

export function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const role = req.session?.role;
    if (!role) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(role) && role !== "ADMIN") {
      return res.status(403).json({ message: "Content management access required" });
    }
    next();
  };
}