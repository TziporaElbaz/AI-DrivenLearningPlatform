import { Request } from 'express';


export interface AuthenticatedUser {
  id: string;
  name?: string;
  phone?: string;
  isAdmin?: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthenticatedUser;
}

export type { AuthRequest as AuthenticatedRequest };
